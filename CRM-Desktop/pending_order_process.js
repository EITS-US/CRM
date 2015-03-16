/**
 * Created by AM015SI on 12/7/2014.
 */
/**
 * Created by AM015SI on 12/6/2014.
 */

var amqp = require('amqplib');
var all = require('when').all;
var basename = require('path').basename;

var sql = require('mssql');

var config = {
    user: 'confirmation_import_crm',
    password: 'importer123',
    server: '10.0.12.237', // You can use 'localhost\\instance' to connect to named instance
    database: 'ConfDialer'
}



//var severities = process.argv.slice(2);
var severities = ['INSERTPENDINGORDER', 'REMOVEPENDINGORDER'];
if (severities.length < 1) {
    console.warn('Usage: %s [info] [warning] [error]',
        basename(process.argv[1]));
    process.exit(1);
}

amqp.connect('amqp://localhost').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ex = 'CODAFDIALER';

        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        ok = ok.then(function() {
            return ch.assertQueue('PENDINGORDERS', {durable: true});
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
                msgContent = JSON.parse(msgContent);
                if(msg.fields.routingKey === 'INSERTPENDINGORDER'){

                    insertPendingOrder(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log("Pending Order Inserted");
                            ch.ack(msg);
                        }

                    });

                }if(msg.fields.routingKey === 'REMOVEPENDINGORDER'){
                    removePendingOrder(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log("Pending Order Removed");
                            ch.ack(msg);
                        }

                    });

                }

                console.log(msg.fields.routingKey + "----------- Ends ---------------------------------->");


            }, {ack: true}).then(function() { console.log("delivered"); });
        });
        return ok.then(function() {
            console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });


    });
}).then(null, console.warn);

function insertPendingOrder(key, value, callback){



     var connection = new sql.Connection(config);
     connection.connect();
     var ps = new sql.PreparedStatement(connection);

     ps.input('OrderID', sql.BigInt);
     ps.input('OrderDate', sql.DateTime);
     ps.input('TeamName', sql.VarChar);
     ps.input('Language', sql.VarChar);
     ps.input('PhoneNos', sql.VarChar);


     var command = "INSERT INTO PendingOrders (OrderDate, OrderID, TeamName, Language, PhoneNos) " +
     "VALUES (@OrderDate, @OrderID, @TeamName, @Language, @PhoneNos)";
     ps.prepare(command, function(err) {
     // ... error checks
     if(err){callback(err);}

     ps.execute({'OrderDate':new Date(),'OrderID': value.ORDERID,'TeamName' : value.TEAMDESC,  'Language' : value.LANGDESC,'PhoneNos': value.CALLBACKCCONTACTNO}, function(err, recordset) {
     // ... error checks
     callback(err, recordset);
     //callback(false);
     ps.unprepare(function(err) {
     // ... error checks
     console.log("PendingOrders Connection closed");
     connection.close();
     });
     });

     });
}

function removePendingOrder(key, value, callback){



    var connection = new sql.Connection(config);
     connection.connect();
     var ps = new sql.PreparedStatement(connection);

     //ps.input('ORDERID', sql.Int);


     ps.input('OrderID', sql.BigInt);


     var command = "DELETE FROM PendingOrders WHERE OrderID = @OrderID"
     ps.prepare(command, function(err) {
     // ... error checks
     if(err){callback(err);}

     ps.execute({'OrderID': value.ORDERID}, function(err, recordset) {
     // ... error checks

     callback(err, recordset);
     //callback(false);
     ps.unprepare(function(err) {
     // ... error checks
     connection.close();
     console.log("PendingOrders Connection closed");
     });
     });

     });
}

