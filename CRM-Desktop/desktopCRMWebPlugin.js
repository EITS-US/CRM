var http = require('http');
var socketio = require('socket.io');
var iniparser = require('iniparser');
var winston = require('winston');

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

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'telebuy.log' })
    ]
});


var desktopHttpServer = http.createServer(function(req, res) {
    res.end();
}) ;

desktopHttpServer.listen(desktopHttpServerPORT);

var browserConnector = socketio.listen(desktopHttpServer);

var dialerTCPClient = new net.Socket();
dialerTCPClient.setEncoding('utf8');

// ++++++++++++++++++++++++++++++ Start Sending Message to Dialer +++++++++++++++++++++++++++

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
    logger.log('info', err.stack);
});

browserConnector.on('connection', function (socket) {



    socket.on('error', function(err) {
        console.log("error");
        logger.log('info', err.stack);
    });

    socket.on('LOGIN', function (loginMsg) {

        console.log('Message Received: ' +  loginMsg);
        dialerTCPClient.connect(PORT, HOST, function(socket) {
            console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            logger.log('info', 'CONNECTED TO: ' + HOST + ':' + PORT);
            var loginLen = "000" + loginMsg.userId;
            var tcpMsg = getMsgPrefix('LOGIN|' + loginLen);
            dialerTCPClient.end(tcpMsg);
            logger.log('info', tcpMsg);
            browserConnector.sockets.emit("LOGININFO", { extdata: extention, sourcedata : source}); //This is where data is being sent to html file
            logger.log('info', { extdata: extention, sourcedata : source});
            connectMessageReceirverFromDialer();

        });



    });

    socket.on('LOGOUT', function (outMsg) {
        try {
            console.log('Log Out Message Received: ' + outMsg);
            logger.log('info', 'Log Out Message Received: ' + outMsg);
            dialerTCPClient.connect(PORT, HOST, function(socket) {

                console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
                var tcpMsg = getMsgPrefix("LOGOUT|" + outMsg);
                popupStatusFlag = "closed";
                dialerTCPClient.end(tcpMsg);

                logger.log('info',  tcpMsg);
                if(receiverFromDialer != null) receiverFromDialer.destroy();

            });


        }catch (ex) {
            logger.log('info', ex);
            console.log(ex);
        }

    });


    socket.on('AWAY', function (breakMsg) {
        try {
            console.log('Message Received: ', breakMsg);
            logger.log('Message Received: ', breakMsg);
            dialerTCPClient.connect(PORT, HOST, function(socket) {

                console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
                var tcpMsg = getMsgPrefix('AWAY|' + breakMsg);

                dialerTCPClient.write(tcpMsg);
                logger.log('info',  tcpMsg);
                //if(receiverFromDialer != null) receiverFromDialer.destroy();
            });

        }catch(ex){

            logger.log('info', ex);
            console.log(ex);

        }
    });


    socket.on('RELOGIN', function (reLoginMsg) {
        console.log('Message Received: ', reLoginMsg);
        logger.log('info','Message Received: ' + reLoginMsg);
        dialerTCPClient.connect(PORT, HOST, function(socket) {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            dialerTCPClient.end('007RELOGIN');
            logger.log('info', '007RELOGIN');
        });



    });

    socket.on('STOPCALL', function (msg) {
        dialerTCPClient.connect(PORT, HOST, function(socket) {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            console.log('Message Received: ', msg);
            dialerTCPClient.end('003POP');
            logger.log('info','Message Received: ' + msg + "003POP");
        });

    });

    socket.on('MANUALCALL', function (outCall) {
        try {
            console.log('Message Received: ', outCall);
            logger.log('info','Message Received:' + outCall);
            dialerTCPClient.connect(PORT, HOST, function(socket) {

                console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
                dialerTCPClient.end('010MANUALCALL');
                logger.log('info','010MANUALCALL');
            });



        }catch(ex){
            logger.log('info', ex);
            console.log(ex);
        }


    });


    socket.on('OUTBOUNDCALL', function (outCall) {
        try {
            console.log('Message Received: ', outCall);
            logger.log('info', 'Message Received: ' + outCall);
            popupStatusFlag = "open";
            dialerTCPClient.connect(PORT, HOST, function(socket) {


                var outBoundMsg = getMsgPrefix("MAKECALL|" + outCall);
                logger.log('info', outBoundMsg);
                dialerTCPClient.write(outBoundMsg);


            });



        }catch(ex){
            logger.log('info', ex);
            console.log(ex);
        }


    });

    socket.on('ENDCALL', function (outCall) {
        console.log('Message Received: ', outCall);
        logger.log('info', 'Message Received: ' + outCall);
        dialerTCPClient.connect(PORT, HOST, function(socket) {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            logger.log('info', '007ENDCALL');
            dialerTCPClient.write('007ENDCALL');


        });

    });


    socket.on('CLOSEPOPUP', function (outCall) {

        popupStatusFlag = "closed";
    });

    socket.on('DISCON', function (msg) {
        dialerTCPClient.connect(PORT, HOST, function(socket) {
            popupStatusFlag = "closed";
            console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            console.log('Message Received: ', msg);
            logger.log('info', '020DISC|'+msg);
            dialerTCPClient.write('020DISC|'+msg);



        });

    });

    socket.on('CALLDISP', function (code) {
        dialerTCPClient.connect(PORT, HOST, function(socket) {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT); // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            console.log('Message Received: ', code);

            var outBoundMsg = getMsgPrefix("CALLDISP|" + code);
            logger.log('info', outBoundMsg);
            dialerTCPClient.write(outBoundMsg);



        });


    });

    socket.on('error', function(err) {
        console.log(err.stack);
        logger.log('error', err.stack);
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
                    logger.log('info', tcpMsg);
                    popupStatusFlag = "open";
                }


            });


        }catch(ex){

        }

        receiverFromDialer.on('error', function(err) {

            console.log(err.stack);
            logger.log('info', err.stack);
        });

    });

}





// ++++++++++++++++++++++++++++++ End Receiving Message From Dialer +++++++++++++++++++++++++++


