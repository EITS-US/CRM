 var http = require('http');
 var socketio = require('socket.io');
 var iniparser = require('iniparser');

 var net = require('net');


 var HOST ;
 //var HOST = '10.0.1.37';
 var PORT ;
 var desktopHttpServerPORT ;
 var receiverFromDialer = null;
 var msgReceiverHOST ;
 var msgReceiverPORT;
 var popupStatusFlag = "closed";


 var config  = iniparser.parseSync('desktopConfig.ini');

 HOST = config.dialerConfigration.host;
 PORT = config.dialerConfigration.port;

 desktopHttpServerPORT = config.desktopHttpServerConfigration.port;

 msgReceiverHOST = config.desktopTCPServerCofiguration.host;
 msgReceiverPORT = config.desktopTCPServerCofiguration.port;

 var extention = config.GLOBAL.EXT;
 var source = config.GLOBAL.SOURCE;


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
			dialerTCPClient.connect(PORT, HOST, function(socket) {
    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});

           var tcpMsg = getMsgPrefix('LOGIN|' + loginMsg.userId);
	       dialerTCPClient.end(tcpMsg);
           browserConnector.sockets.emit("LOGININFO", { extdata: extention, sourcedata : source}); //This is where data is being sent to html file
	       connectMessageReceirverFromDialer();

		});

	socket.on('LOGOUT', function (outMsg) {
	    try {
	       console.log('Log Out Message Received: ' + outMsg);
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
            var tcpMsg = getMsgPrefix("LOGOUT|" + outMsg);
	       dialerTCPClient.end(tcpMsg);
           popupStatusFlag = "closed";

            if(receiverFromDialer != null) receiverFromDialer.destroy();

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
            var tcpMsg = getMsgPrefix('AWAY|' + breakMsg);

	       dialerTCPClient.end(tcpMsg);
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
            popupStatusFlag = "open";
	       dialerTCPClient.connect(PORT, HOST, function(socket) {

               /*  var len = outCall.length + 8;
    			 var prefix = len + "MAKECALL|";
    			 var outBoundMsg = prefix + outCall;*/
                var outBoundMsg = getMsgPrefix("MAKECALL|" + outCall);
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
           popupStatusFlag = "closed";
	    });


    socket.on('CLOSEPOPUP', function (outCall) {

        popupStatusFlag = "closed";
    });

	   socket.on('DISCON', function (msg) {
	   	dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       console.log('Message Received: ', msg);
	       dialerTCPClient.end('020DISC|561614066952536');
	    });
		
		socket.on('CALLDISP', function (code) {
	   	dialerTCPClient.connect(PORT, HOST, function(socket) {

    			console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
		});
	       console.log('Message Received: ', code);
		  /* var prefix = "011CALLDISP|";
    			 var outBoundMsg = prefix + code;*/
            var outBoundMsg = getMsgPrefix("CALLDISP|" + code);
    			 dialerTCPClient.end(outBoundMsg);
	       
	    });


});

 function getMsgPrefix(msg){
     return "0" + msg.length + msg;
 }


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
	   console.log(popupStatusFlag);
       var dataInfoArr = data.split("|");

        if(dataInfoArr[0].toUpperCase() ==  "LOGIN" || dataInfoArr[0].toUpperCase() == "ALERT"){
            popupStatusFlag = "closed";
            return;
        }

       var tcpMsg = dataInfoArr[0].substring(3);

  console.log('DATA ' + receiverFromDialer.remoteAddress + ': ' + data);


       if(popupStatusFlag == "closed"){            // check if no previous pop up is opened
           browserConnector.sockets.emit(tcpMsg, { livedata: data }); //This is where data is being sent to html file
           popupStatusFlag = "open";
       }


});


}catch(ex){

}



});

  }

 



  // ++++++++++++++++++++++++++++++ End Receiving Message From Dialer +++++++++++++++++++++++++++


