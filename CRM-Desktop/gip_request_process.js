var amqp = require('amqplib');
var all = require('when').all;
var basename = require('path').basename;


var sql = require('mssql');

var config = {
    user: 'ccapp',
    password: 'ccapp',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'PBIP01'
}


var severities = ['GIPREQS'];
if (severities.length < 1) {
    console.warn('Usage: %s [info] [warning] [error]',
        basename(process.argv[1]));
    process.exit(1);
}

amqp.connect('amqp://localhost').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ex = 'gip';

        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        ok = ok.then(function() {
            return ch.assertQueue('gipReqLogQueue', {durable: true});
        });

        ok = ok.then(function(qok) {
            var queue = qok.queue;
            return all(severities.map(function(sev) {
                ch.bindQueue(queue, ex, sev);
            })).then(function() { return queue; });
        });

        ok = ok.then(function(queue) {
            return ch.consume(queue, function(msg) {

                console.log(msg.fields.routingKey + "----------- Starts ---------------------------------->");
                var msgContent = msg.content;

                //msgContent = JSON.parse(msgContent);
                console.log(msg.fields.routingKey);
                if(msg.fields.routingKey === 'GIPREQS'){
                    processOrderhdr(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){

                            ch.ack(msg);
                        }else{
                            ch.reject(msg,false);
                        }

                    });


                }
            }, {ack: true}).then(function() { console.log("delivered"); });
        });
        return ok.then(function() {
            console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });


    });
}).then(null, console.warn);


function processOrderhdr(key, value, callback) {
	value = value.toString();
	var content = value.split("~");
	var soapContent = content[0].toString();
	var guid = content[1].toString();
	var trackingNumber = content[2].toString();
	var opType = content[3].toString();
    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);

    ps.input('RequestXML', sql.VarChar);
	ps.input('LOGID', sql.VarChar);
	ps.input('TrackingID', sql.VarChar);
	ps.input('OperationType', sql.VarChar);

    var command = "INSERT INTO ipUtilReqLogging1 (RequestXML,  TrackingID, OperationType) VALUES (@RequestXML, @LOGID, @TrackingID, @OperationType)";

    ps.prepare(command, function(err) {

        if(err != null){
            ps.execute({'RequestXML':soapContent, 'LOGID': guid, 'TrackingID' : trackingNumber, 'OperationType' : opType}, function(err, recordset) {
                callback(err, recordset);


            });
        }else{


            callback(err);


        }



    })

}