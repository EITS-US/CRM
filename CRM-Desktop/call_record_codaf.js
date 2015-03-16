/**
 * Created by AM015SI on 12/13/2014.
 */

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



var severities = ['CREATECALLRECORD'];
if (severities.length < 1) {
    console.warn('Usage: %s [info] [warning] [error]',
        basename(process.argv[1]));
    process.exit(1);
}


amqp.connect('amqp://localhost').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ex = 'CALLS';

        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        ok = ok.then(function() {
            return ch.assertQueue('TB_CALLRECORD_LINES', {durable: true});
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
                if(msg.fields.routingKey === 'CREATECALLRECORD'){



                    createCallRecord(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log("Call Created in database");
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


function createCallRecord(key, value, callback){

    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);


    ps.input('CALLKEY', sql.VarChar);
    ps.input('CALLERNO', sql.VarChar);
    ps.input('CALLEDNO', sql.VarChar);
    ps.input('DURATION', sql.VarChar);
    ps.input('CONTREF', sql.VarChar);
    ps.input('DISPDESC', sql.VarChar);
    ps.input('USERID', sql.Int);
    ps.input('USERDESC', sql.VarChar);
    ps.input('REMARKS', sql.VarChar);
    ps.input('CALLSTARTTIME', sql.DateTime);
    ps.input('CALLENDTIME', sql.DateTime);
    ps.input('DISPID', sql.Int);
    ps.input('LINKID', sql.Int);
    ps.input('CALLSTATUS', sql.Char);
    ps.input('LANGID', sql.Int);
    ps.input('LANGDESC', sql.VarChar);
    ps.input('SHOWID', sql.Int);
    ps.input('SHOWDESC', sql.VarChar);
    ps.input('TEAMID', sql.Int);
    ps.input('TEAMDESC', sql.VarChar);
    ps.input('COMPLAINTNO', sql.VarChar);
    ps.input('PRODID', sql.Int);
    ps.input('PRODDESC', sql.VarChar);
    ps.input('CONTACTNAME', sql.VarChar);
    ps.input('SIZEID', sql.Int);
    ps.input('SIZEDESC', sql.VarChar);
    ps.input('CALLSOURCE', sql.VarChar);
    ps.input('COMPLAINTTYPEDESC', sql.VarChar);
    ps.input('GENDER', sql.VarChar);
    ps.input('REQUESTORDERREF', sql.VarChar);

    var complaintno = value.DISPO[0].COMPLAINTREF !== undefined ? value.DISPO[0].COMPLAINTREF : 'NA';
    var prodid = value.DISPO[0].PRODID !== undefined ? value.DISPO[0].PRODID : -1;
    var proddesc = value.DISPO[0].PRODDESC !== undefined ? value.DISPO[0].PRODDESC : 'NA';
    var sizeid = value.DISPO[0].VARIANTID !== undefined ? value.DISPO[0].VARIANTID : -1;
    var sizedesc = value.DISPO[0].VARIANT !== undefined ? value.DISPO[0].VARIANT : 'NA';
    var complainttype = value.TYPE !== undefined ? value.TYPE : 'NA';
    var requestOrderref = value.ORDERREF !== undefined ? value.ORDERREF : 'NA';


    var command = "INSERT INTO TB_CALLRECORD_LINES (CALLKEY, CALLERNO, CALLEDNO, " +
        "DURATION, CONTREF, DISPID, LINKID, DISPDESC, REMARKS, CALLSTARTTIME, CALLENDTIME, " +
        "CALLSTATUS, USERID, USERDESC, LANGID, LANGDESC, COMPLAINTNO, PRODID, PRODDESC, SHOWID, SHOWDESC, CONTACTNAME, SIZEID, SIZEDESC, CALLSOURCE, TEAMID, TEAMDESC, COMPLAINTTYPEDESC, GENDER, REQUESTORDERREF)" +
        "VALUES (@CALLKEY, @CALLERNO, @CALLEDNO, @DURATION, @CONTREF, @DISPID, @LINKID, " +
        "@DISPDESC, @REMARKS, @CALLSTARTTIME, @CALLENDTIME, @CALLSTATUS, @USERID, @USERDESC, @LANGID, @LANGDESC, @COMPLAINTNO, " +
        "@PRODID, @PRODDESC, @SHOWID, @SHOWDESC, @CONTACTNAME, @SIZEID, @SIZEDESC, @CALLSOURCE, @TEAMID, @TEAMDESC, @COMPLAINTTYPEDESC, @GENDER, @REQUESTORDERREF)";

    ps.prepare(command, function(err) {
        // ... error checks
        console.log(err);
        if(err){callback(err);}

        ps.execute({'CALLKEY': value.CALLKEY,'CALLEDNO':value.CALLEDNO, 'CALLERNO' : value.CALLERNO, 'DURATION':value.DURATION,
               'CONTREF': value.CONTREF, 'DISPID': value.DISPID, 'LINKID' : -1,'DISPDESC': value.DISPDESC,  'REMARKS': value.REMARKS,
                'CALLSTARTTIME':new Date(value.CALLSTARTTIME), 'CALLENDTIME' : new Date(value.CALLENDTIME), 'CALLSTATUS' : value.CALLSTATUS, 'USERID': value.USERID,
                'USERDESC' : value.USERDESC, 'LANGID' : value.LANGID, 'LANGDESC' : value.LANGDESC, 'COMPLAINTNO' : complaintno, 'PRODID' : prodid, 'PRODDESC' : proddesc, 'SHOWID': value.SHOWID, 'SHOWDESC' : value.SHOWDESC,
            'CONTACTNAME' : value.CONTACTNAME, 'SIZEID'  : sizeid, 'SIZEDESC' : sizedesc, 'CALLSOURCE' : value.CALLSOURCE, 'TEAMID' : value.TEAMID, 'TEAMDESC' : value.TEAMDESC,
                'COMPLAINTTYPEDESC': complainttype, 'GENDER' : value.GENDER, '@REQUESTORDERREF' : requestOrderref},
            function(err, recordset) {
                // ... error checks
                console.log(err);
                callback(err, recordset);
                //callback(false);
                ps.unprepare(function(err) {
                    // ... error checks
                    console.log("Create Call Record Line Connection closed");
                    connection.close();
                });
            });

    });
}
