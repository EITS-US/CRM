/**
 * Created by AM015SI on 12/13/2014.
 */
var amqp = require('amqplib');
var all = require('when').all;
var basename = require('path').basename;

var sql = require('mssql');

var config = {
    user: 'codaf',
    password: 'TbuySup70rT',
    server: '10.0.0.159', // You can use 'localhost\\instance' to connect to named instance
    database: 'TB_CLOUD_LIVE_UAT'
}



var severities = ['CREATECONTACT', 'UPDATECONTACT'];
if (severities.length < 1) {
    console.warn('Usage: %s [info] [warning] [error]',
        basename(process.argv[1]));
    process.exit(1);
}


amqp.connect('amqp://localhost').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ex = 'CONTACT';

        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        ok = ok.then(function() {
            return ch.assertQueue('TB_CONTACT', {durable: true});
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
                if(msg.fields.routingKey === 'CREATECONTACT'){



                    createContact(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log("User Created in database");
                            //ch.ack(msg);
                        }

                    });

                }

                if(msg.fields.routingKey === 'UPDATECONTACT'){
                    console.log(msgContent);
                    updateContact(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log("User Updated in database" + msg);
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


function createContact(key, value, callback){

    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);

    ps.input('CONTID', sql.Int);
    ps.input('CONTREF', sql.VarChar);
    ps.input('CONTNAME', sql.VarChar);
    ps.input('GENDER', sql.VarChar);
    ps.input('TITLE', sql.VarChar);
    ps.input('ADD1', sql.VarChar);
    ps.input('ADD2', sql.VarChar);
    ps.input('ADD3', sql.VarChar);
    ps.input('CONTPHONE1', sql.VarChar);
    ps.input('CONTEMAIL', sql.VarChar);
    ps.input('CONTLANGID', sql.Int);
    ps.input('CONTLANGDESC', sql.VarChar);
    ps.input('PINCODE', sql.Int);



    var command = "INSERT INTO TB_CONTACT (CONTID, CONTREF, CONTNAME, GENDER, TITLE, ADD1, ADD2, ADD3, CONTPHONE1, CONTEMAIL, CONTLANGID, CONTLANGDESC, PINCODE) " +
        "VALUES (@CONTID, @CONTREF, @CONTNAME, @GENDER, @TITLE, @ADD1, @ADD2, @ADD3, @CONTPHONE1, @CONTEMAIL, @CONTLANGID, @CONTLANGDESC, @PINCODE)";
    ps.prepare(command, function(err) {
        // ... error checks
        console.log(err);
        if(err){callback(err);}



        ps.execute({'CONTID': value.CONTID, 'CONTREF' : value.CONTREF,  'CONTNAME' : value.CONTNAME,'GENDER': value.GENDER, 'TITLE': value.TITLE,
                'ADD1' : value.ContactDetails.Address[0].ADD1, 'ADD2' : value.ContactDetails.Address[0].ADD2, 'ADD3' : value.ContactDetails.Address[0], 'CONTPHONE1' : value.PRIMARYCONTACT,
                'CONTEMAIL' : 'AMIT@TELEBUY.COM', 'CONTLANGID' : value.CONTLANGID, 'CONTLANGDESC':value.CONTLANGDESC,
                'PINCODE': value.PINCODE},
            function(err, recordset) {
                // ... error checks
                callback(err, recordset);
                //callback(false);
                ps.unprepare(function(err) {
                    // ... error checks
                    console.log("Create Customer Connection closed");
                    connection.close();
                });
            });

    });
}



function updateContact(key, value, callback){

    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);

    ps.input('CONTID', sql.Int);
    ps.input('CONTREF', sql.VarChar);
    ps.input('CONTNAME', sql.VarChar);
    ps.input('GENDER', sql.VarChar);
    ps.input('TITLE', sql.VarChar);
    ps.input('ADD1', sql.VarChar);
    ps.input('ADD2', sql.VarChar);
    ps.input('ADD3', sql.VarChar);
    ps.input('CONTPHONE1', sql.VarChar);
    ps.input('CONTLANGID', sql.Int);
    ps.input('CONTLANGDESC', sql.VarChar);
    ps.input('PINCODE', sql.Int);

    var add1 = "";
    var add2 = "";
    var add3 = "";
if(value.ContactDetails !== undefined){

    add1 = value.ContactDetails.Address[0].ADD1 === undefined ? '' : value.ContactDetails.Address[0].ADD1;
    add2 = value.ContactDetails.Address[0].ADD2 === undefined ? '' : value.ContactDetails.Address[0].ADD2;
    add3 = value.ContactDetails.Address[0].ADD3 === undefined ? '' : value.ContactDetails.Address[0].ADD3;


}

   var  name = value.CONTNAME === undefined ? '' : value.CONTNAME;
   var  gender = value.GENDER === undefined ? '' : value.GENDER;
   var  title = value.TITLE === undefined ? '' : value.TITLE;
   var  primaryContact = value.PRIMARYCONTACT === undefined ? '' : value.PRIMARYCONTACT;
   var  contactlangid = value.CONTLANGID === undefined ? '' : value.CONTLANGID;
   var  contactlangdesc = value.CONTLANGDESC === undefined ? '' : value.CONTLANGDESC;
   var  pincode = value.PINCODE === undefined ? '' : value.PINCODE;

    var command = "UPDATE TB_CONTACT SET   CONTNAME = @CONTNAME, GENDER = @GENDER, " +
        "TITLE = @TITLE, ADD1 = @ADD1, ADD2= @ADD2, ADD3 = @ADD3, CONTPHONE1 = @CONTPHONE1," +
        "CONTLANGID = @CONTLANGID, CONTLANGDESC = @CONTLANGDESC, PINCODE = @PINCODE WHERE CONTREF = @CONTREF";


    ps.prepare(command, function(err) {
        // ... error checks
        console.log(err);
        if(err){callback(err);}

        ps.execute({'CONTREF' : value.CONTREF,  'CONTNAME' : name,'GENDER': gender, 'TITLE': title,
                'ADD1' :add1, 'ADD2' : add2, 'ADD3' :add3, 'CONTPHONE1' : primaryContact,
                'CONTLANGID' : contactlangid, 'CONTLANGDESC':contactlangdesc, 'PINCODE': pincode},
            function(err, recordset) {
                // ... error checks
                callback(err, recordset);
                //callback(false);
                ps.unprepare(function(err) {
                    // ... error checks
                    console.log("Update Customer Connection closed");
                    connection.close();
                });
            });

    });
}