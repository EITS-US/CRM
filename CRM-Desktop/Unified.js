 var http = require('http');
 var socketio = require('socket.io');
 var iniparser = require('iniparser');

 var net = require('net');


 var HOST ;
 //var HOST = '10.0.1.37';
 var PORT ;
 var desktopHttpServerPORT ;
 var receiverFromDialer;
 var msgReceiverHOST ;
 var msgReceiverPORT;



 var config  = iniparser.parseSync('desktopConfig.ini');

 HOST = config.dialerConfigration.host;
 PORT = config.dialerConfigration.port;
 


 desktopHttpServerPORT = config.desktopHttpServerConfigration.port;

 msgReceiverHOST = config.desktopTCPServerCofiguration.host;
 msgReceiverPORT = config.desktopTCPServerCofiguration.port;


var desktopHttpServer = http.createServer(function(req, res) {
   res.end();
}) ;

desktopHttpServer.listen(desktopHttpServerPORT);
var browserConnector = socketio.listen(desktopHttpServer);

var dialerTCPClient = new net.Socket();
dialerTCPClient.setEncoding('utf8');

// ++++++++++++++++++++++++++++++ Start Sending Message to Dialer +++++++++++++++++++++++++++

browserConnector.on('connection', function (socket) {

	

	socket.on('error', function() { console.log("error"); });

	socket.on('LOGIN', function (loginMsg) {

			console.log('Message Received: ' +  loginMsg);

			dialerTCPClient.destroy();

			dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       dialerTCPClient.end('014LOGIN|' + loginMsg.userId);
	       connectMessageReceirverFromDialer();

		});

	socket.on('LOGOUT', function (outMsg) {
	    try {
	       console.log('Log Out Message Received: ' + outMsg);
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       dialerTCPClient.end('006LOGOUT');
	       receiverFromDialer.destroy();

	       //loginTCPClient.destroy();
	   }catch (ex) {
    			console.log(ex);
  		}
	      
	    });


	socket.on('AWAY', function (breakMsg) {
		try {
	       console.log('Message Received: ', breakMsg);
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       dialerTCPClient.end('004AWAY|Break');
	       receiverFromDialer.destroy();
	   }catch(ex){

	   }
	    });


	 socket.on('RELOGIN', function (reLoginMsg) {
	       console.log('Message Received: ', reLoginMsg);

	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});

	       dialerTCPClient.end('007RELOGIN');
	       //connectMessageReceirverFromDialer();
	    });

	  socket.on('MANUALCALL', function (outCall) {
	  	try {
	       console.log('Message Received: ', outCall);
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    			 dialerTCPClient.end('003OUT');
		});
	      
	       //dialerTCPClient.end('019MAKECALL|9884412186')
	       
	   }catch(ex){

	   }


	    });


	  socket.on('OUTBOUNDCALL', function (outCall) {
	  	try {
	       console.log('Message Received: ', outCall);
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			 var prefix = "019MAKECALL|";
    			 var outBoundMsg = prefix + outCall;
    			 dialerTCPClient.end(outBoundMsg);
		});
	      
	       //dialerTCPClient.end('019MAKECALL|9884412186')
	       
	   }catch(ex){

	   }


	    });

	   socket.on('ENDCALL', function (outCall) {
	       console.log('Message Received: ', outCall);
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       dialerTCPClient.end('007ENDCALL');
	    });

	   socket.on('STOPCALL', function (msg) {
	   	dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       console.log('Message Received: ', msg);
	       dialerTCPClient.end('020DISC|561614066952536');
	    });
		
		socket.on('011CALLDISP', function (code) {
	   	dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       console.log('Message Received: ', code);
		   var prefix = "011CALLDISP|";
    			 var outBoundMsg = prefix + code;
    			 dialerTCPClient.end(outBoundMsg);
	       
	    });


});


 // ++++++++++++++++++++++++++++++ End Sending Message to Dialer +++++++++++++++++++++++++++


  // ++++++++++++++++++++++++++++++ Start Receiving Message From Dialer +++++++++++++++++++++++++++


 // var receiverFromDialer = net.createConnection(10535, '127.0.0.1');

function connectMessageReceirverFromDialer(){

receiverFromDialer = net.createConnection(msgReceiverPORT, msgReceiverHOST);

  receiverFromDialer.on('connect', function(connect) {
try{
	

  console.log('connection established  with message receiver from dialer');
  receiverFromDialer.setEncoding('utf8');

   receiverFromDialer.on('data', function(data) {

       var dataInfoArr = data.split("|");

       var tcpMsg = dataInfoArr[0].toString();

       tcpMsg = tcpMsg.substring(3);

       console.log(tcpMsg);


  console.log('DATA ' + receiverFromDialer.remoteAddress + ': ' + data);
  browserConnector.sockets.emit(tcpMsg, { livedata: data });        //This is where data is being sent to html file

});


}catch(ex){

}



});

  }

 



  // ++++++++++++++++++++++++++++++ End Receiving Message From Dialer +++++++++++++++++++++++++++
  
  
 var tcpServerHOST = config.desktopTCPServerCofiguration.host;
 var tcpServerPORT = config.desktopTCPServerCofiguration.port;
  
var clients = [];

var msgReceiverFromDialer = net.createServer(function (socket){

    ///clients[0]=socket;
	clients.push(socket);
	
	// Handle incoming messages from clients.
  socket.on('data', function (data) {

    broadcast(data, socket);
  });

  socket.on('error', function() { console.log("error"); });
	
	
	// Send a message to all clients
  function broadcast(message, sender) {

    console.log(clients.length);

    clients.forEach(function (client) {
      // Don't want to send it to sender
      //console.log(client.remotePort);
      if (client === sender) return;
      if(typeof client.remotePort === 'undefined') return;
      client.write(message);
    });
    // Log it to the server output too
    
  }
 
});

msgReceiverFromDialer.listen(tcpServerPORT, tcpServerHOST);

msgReceiverFromDialer.on('connection', function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    console.log('Server listening on ' + msgReceiverFromDialer.address().address +':'+  msgReceiverFromDialer.address().port);
	
});



