var net = require('net');
var iniparser = require('iniparser');

var HOST ;
var PORT ;


var dialerclients = [];
var clients = [];

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});


var msgReceiverFromDialer = net.createServer(function (socket){

   // clients[0]=socket;
      clients.push(socket);
	
	// Handle incoming messages from clients.
  socket.on('data', function (data) {

      dialerclients.forEach(function (client) {
          client.destroy();
      });

      dialerclients.push(socket);

      broadcast(data, socket);
  });

  socket.on('error', function() { console.log("error"); });
	
	
	// Send a message to all clients
  function broadcast(message, sender) {



      clients.forEach(function (client) {
          // Don't want to send it to sender
          console.log(client.remotePort);
          if (client === sender) return;
          if(typeof client.remotePort === 'undefined') return;
          console.log(clients.length + "---->Total Sockets");
          console.log(client.connected);
          client.write(message);

      });
    // Log it to the server output too
    
  }
 
});

iniparser.parse('desktopConfig.ini', function(err,data){
    HOST = data.desktopTCPServerCofiguration.host;
    PORT = data.desktopTCPServerCofiguration.port;
    msgReceiverFromDialer.listen(PORT, HOST);

});



msgReceiverFromDialer.on('connection', function(sock) {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    console.log('Server listening on ' + msgReceiverFromDialer.address().address +':'+  msgReceiverFromDialer.address().port);
	
});





	


