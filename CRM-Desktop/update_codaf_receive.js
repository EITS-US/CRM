/**
 * Created by AM015SI on 12/6/2014.
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



//var severities = process.argv.slice(2);
var severities = ['UPDATEORDERHDR', 'UPDATEPAYMENTLINE', 'UPDATEORDERLINE'];
if (severities.length < 1) {
    console.warn('Usage: %s [info] [warning] [error]',
        basename(process.argv[1]));
    process.exit(1);
}

amqp.connect('amqp://localhost').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ex = 'CODAF';

        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        ok = ok.then(function() {
            return ch.assertQueue('UPDATEORDERS', {durable: true});
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
                if(msg.fields.routingKey === 'UPDATEORDERHDR'){

                    processOrderhdr(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log("UPDATEORDERHDR Updated");
                            ch.ack(msg);
                        }

                    });

                }if(msg.fields.routingKey === 'UPDATEORDERLINE'){
                    processOrderLine(msg.fields.routingKey, msgContent, function(err, results){
                        if(err === null){
                            console.log(" UPDATEORDERLINE Updated");
                            ch.ack(msg);
                        }

                    });

                }
                if(msg.fields.routingKey === 'UPDATEPAYMENTLINE') {
                    processOrderPayment(msg.fields.routingKey, msgContent, function (err, results) {
                        if (err === null) {
                            console.log("UPDATEPAYMENTLINE Updated");
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

function processOrderhdr(key, value, callback){



    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);

    //ps.input('ORDERID', sql.Int);
    ps.input('CALLKEY', sql.VarChar);
    ps.input('ORDERDATE', sql.DateTime);
    ps.input('ORDERREF', sql.VarChar);
    ps.input('CONTREF', sql.VarChar);
    ps.input('USERID', sql.Int);
    ps.input('CONTNAME', sql.VarChar);
    ps.input('USERDESC', sql.VarChar);
    ps.input('ORDERSTATUS', sql.VarChar);
    ps.input('SHOWID', sql.Int);
    ps.input('SHOWDESC', sql.VarChar);
    ps.input('TOTALQTY', sql.Int);
    ps.input('NETT', sql.VarChar);
    ps.input('DISCVALUE', sql.VarChar);
    ps.input('TOTALDUE', sql.Int);
    ps.input('BALANCEDUE', sql.Int);
    ps.input('DLVCOUNTRYID', sql.VarChar);
    ps.input('DLVCOUNTRY', sql.VarChar);
    ps.input('DLVSTATEID', sql.VarChar);
    ps.input('DLVSTATE', sql.VarChar);
    ps.input('DLVCITYID', sql.VarChar);
    ps.input('DLVCITY', sql.VarChar);
    ps.input('DLVPINCODE', sql.VarChar);
    ps.input('DELVTYPE', sql.VarChar);
    ps.input('AUTHNOTES', sql.VarChar);
    ps.input('LANGID', sql.VarChar);
    ps.input('LANGDESC', sql.VarChar);
    ps.input('TEAMID', sql.VarChar);
    ps.input('TEAMDESC', sql.VarChar);
    ps.input('SUBTEAMID', sql.VarChar);
    ps.input('SUBTEAMDESC', sql.VarChar);
    ps.input('DISTRICTID', sql.VarChar);
    ps.input('DISTRICTDESC', sql.VarChar);
    ps.input('ORDERSOURCE', sql.VarChar);
    ps.input('ORDERTIMEFRAME', sql.Int);
    ps.input('ORDERTIMEFRAMEDESC', sql.VarChar);
    ps.input('TIMEFRAMEVALUE', sql.VarChar);


    var command = "UPDATE TB_ORDERHDR SET  ORDERSTATUS = @ORDERSTATUS, SHOWID = @SHOWID, SHOWDESC = @SHOWDESC, TOTALQTY = @TOTALQTY,NETT = @NETT,DISCVALUE = @DISCVALUE,TOTALDUE = @TOTALDUE,BALANCEDUE = @BALANCEDUE, DLVCOUNTRYID = @DLVCOUNTRYID,DLVCOUNTRY = @DLVCOUNTRY,DLVSTATEID = @DLVSTATEID,DLVSTATE = @DLVSTATE,DLVCITYID = @DLVCITYID, DLVCITY = @DLVCITY,DLVPINCODE = @DLVPINCODE,DELVTYPE = @DELVTYPE,AUTHNOTES = @AUTHNOTES,LANGID = @LANGID,LANGDESC = @LANGDESC,TEAMID = @TEAMID,TEAMDESC = @TEAMDESC,SUBTEAMID = @SUBTEAMID,SUBTEAMDESC = @SUBTEAMDESC,DISTRICTID = @DISTRICTID,DISTRICTDESC = @DISTRICTDESC,ORDERSOURCE = @ORDERSOURCE, ORDERTIMEFRAME = @ORDERTIMEFRAME,ORDERTIMEFRAMEDESC = @ORDERTIMEFRAMEDESC,TIMEFRAMEVALUE = @TIMEFRAMEVALUE " +
        "WHERE ORDERREF =  @ORDERREF";
    ps.prepare(command, function(err) {
        // ... error checks
        if(err){callback(err);}

        ps.execute({'ORDERSTATUS' : value.ORDERSTATUS, 'SHOWID' : value.SHOWID, 'SHOWDESC' : value.SHOWDESC, 'TOTALQTY': value.TOTALQTY, 'NETT':value.NETT,'DISCVALUE': value.TOTALDISC,'TOTALDUE': value.TOTALDUE,'BALANCEDUE': value.BALANCEDUE,'DLVCOUNTRYID': value.DLVCOUNTRYID,'DLVCOUNTRY': value.DLVCOUNTRY,'DLVSTATEID': value.DLVSTATEID,'DLVSTATE': value.DLVSTATE,'DLVCITYID': value.DLVCITYID,'DLVCITY': value.DLVCITY,
            'DLVPINCODE': value.DLVPINCODE,'DELVTYPE': value.DELVTYPE,'AUTHNOTES': value.AUTHREMARKS,'LANGID': value.LANGID,'LANGDESC': value.LANGDESC,'TEAMID': value.TEAMID,'TEAMDESC': value.TEAMDESC,'SUBTEAMID': value.SUBTEAMID,'SUBTEAMDESC': value.SUBTEAMDESC,'DISTRICTID': value.DISTRICTID,'DISTRICTDESC': value.DISTRICTDESC,'ORDERSOURCE': value.ORDERSOURCE,'ORDERTIMEFRAME': value.ORDERTIMEFRAME,'ORDERTIMEFRAMEDESC': value.ORDERTIMEFRAMEDESC,'TIMEFRAMEVALUE': value.TIMEFRAMEVALUE}, function(err, recordset) {
            // ... error checks
            callback(err, recordset);
            //callback(false);
            ps.unprepare(function(err) {
                // ... error checks
                console.log("TB_ORDERHDR Connection closed");
                connection.close();
            });
        });

    });
}

function processOrderPayment(key, value, callback){

    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);

    //ps.input('ORDERID', sql.Int);

    ps.input('ASSIGNDATE', sql.DateTime);
    ps.input('PAYMODEID', sql.Int);
    ps.input('ORDERREF', sql.VarChar);
    ps.input('PAYAMOUNT', sql.Float);
    ps.input('PAYMODEDESC', sql.VarChar);
    ps.input('NAMEONCARD', sql.VarChar);
    ps.input('BANKID', sql.VarChar);
    ps.input('PAYREF', sql.VarChar);
    ps.input('PAYMENTLINEIDWEB', sql.VarChar);

    var command = "UPDATE TB_ORDERPAYMENT SET PAYMODEID = @PAYMODEID, PAYMODEDESC = @PAYMODEDESC, PAYAMOUNT = @PAYAMOUNT, NAMEONCARD = @NAMEONCARD, BANKID = @BANKID " +
        "WHERE PAYMENTLINEIDWEB = @PAYMENTLINEIDWEB";
    ps.prepare(command, function(err) {
        // ... error checks
        if(err)
        {callback(err);
            console.log(err);
        }

        ps.execute({ 'PAYMODEID': value.PAYMENTMODEID, 'PAYMODEDESC': value.PAYMENTMODEIDDESC, 'PAYAMOUNT': value.PAYMENTAMOUNT, 'NAMEONCARD': value.NAMEONCARD.toUpperCase(), 'BANKID': value.PAYMENTBANKID,
            'PAYMENTLINEIDWEB' : value.PAYMENTLINEID}, function(err, recordset) {
            console.log(err);
            // ... error checks

            callback(err, recordset);
            //callback(false);
            ps.unprepare(function(err) {
                // ... error checks
                connection.close();
                console.log("TB_ORDERPAYMENT Connection closed");
            });
        });

    });
}

function processOrderLine(key, value, callback){


    var connection = new sql.Connection(config);
    connection.connect();
    var ps = new sql.PreparedStatement(connection);
    ps.input('CALLKEY', sql.VarChar);
    ps.input('CREATION_DATE', sql.DateTime);
    ps.input('ORDERREF', sql.VarChar);
    ps.input('PRODID', sql.Int);
    ps.input('PRODDESC', sql.VarChar);
    ps.input('SALEPRICE', sql.Float);
    ps.input('QNTY', sql.Int);
    ps.input('ORDERLINEIDWEB', sql.VarChar);
    ps.input('SIZEID', sql.Int);
    ps.input('SIZEDESC', sql.VarChar);
    ps.input('PENDINGQTY', sql.Int);
    ps.input('ISAMC', sql.VarChar);
    ps.input('AMCVALUE', sql.Int);
    ps.input('AMCBYID', sql.Int);
    ps.input('AMCBYDESC', sql.VarChar);
    ps.input('AMCFROMDATE', sql.DateTime);
    ps.input('AMCTODATE', sql.DateTime);
    ps.input('USERID', sql.Int);
    ps.input('USERDESC', sql.VarChar);
    ps.input('FREEITEM', sql.VarChar);
    ps.input('FREEITEMCOST', sql.Float);
    ps.input('ORIGINALPRICE', sql.Float);
    ps.input('ISUPSELL', sql.VarChar);
    ps.input('UPSELLVALUE', sql.Float);
    ps.input('AGENTUPSELL', sql.VarChar);

    var isupsell = '';
    var upsellvalue = 0;
    var agentupsell = '';

    if(value.ISUPSELL == 'Y')
    {
        isupsell = 'Y'
        upsellvalue = value.UPSELLVALUE ;
        agentupsell = value.AGENTUPSELL ;

    }
    else
    {
        supsell = 'N'
        upsellvalue = 0 ;
        agentupsell = 0 ;

    }

    var freeitem = '';
    var freeitemcost = 0;
    var originalprice = 0;


    if(value.FREEITEM == 'Y')
    {
        freeitem = value.FREEITEM;
        freeitemcost = value.FREEITEMCOST;
        originalprice = value.ORIGINALPRICE ;
    }
    else
    {
        freeitem = 'N'
        freeitemcost = 0;
        originalprice = 0;

    }

    var amcfromdate = '';
    var amctodate = '';
    if(value.ISAMC === 'Y')
    {
        amcfromdate = new Date();
        amctodate = new Date();

    }



    var command = "UPDATE TB_ORDERLINES SET PRODID = @PRODID, PRODDESC = @PRODDESC, QNTY = @QNTY, ORDERLINEIDWEB = @ORDERLINEIDWEB,ISUPSELL = @ISUPSELL,UPSELLVALUE = @UPSELLVALUE,AGENTUPSELL = @AGENTUPSELL,FREEITEM = @FREEITEM,FREEITEMCOST = @FREEITEMCOST,ORIGINALPRICE = @ORIGINALPRICE,ISAMC = @ISAMC,AMCVALUE = @AMCVALUE,AMCBYID = @AMCBYID,AMCBYDESC = @AMCBYDESC,AMCFROMDATE = @AMCFROMDATE,AMCTODATE = @AMCTODATE" +
        "WHERE ORDERLINEIDWEB =  @ORDERLINEIDWEB";
    ps.prepare(command, function(err) {
        // ... error checks
        if(err){callback(err);}

        ps.execute({'PRODID': value.PRODID, 'PRODDESC': value.PRODDESC, 'QNTY': value.QNTY, 'ORDERLINEIDWEB': value.ORDERLINEID, 'ISUPSELL': isupsell,'UPSELLVALUE': upsellvalue,'AGENTUPSELL': agentupsell,'FREEITEM': freeitem,'FREEITEMCOST': freeitemcost,
            'ORIGINALPRICE': originalprice , 'ISAMC': value.ISAMC,'AMCVALUE': value.AMCVALUE,'AMCBYID': value.AMCBYID,'AMCBYDESC': value.AMCBYDESC,'AMCFROMDATE': new Date(),'AMCTODATE': new Date()}, function(err, recordset) {

            // ... error checks
            callback(err, recordset);
            //callback(false);
            ps.unprepare(function(err) {
                // ... error checks
                console.log("TB_ORDERHDR Connection closed");
                connection.close();
            });
        });

    });

}
