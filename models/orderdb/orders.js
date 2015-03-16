var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');
var eventHelper = require('../../helper/eventHelper');
var codafBroker = require('../../helper/codafBroker');
var async = require('async');

var Schema   = mongoose.Schema;


var Order = new Schema({
    ORDERID: Number,
    ORDERREF: String,
    ACTUALEXT : String,
    ORDERDATE : { type: Date, default: Date.now },
    ORDERSTATUS: String,
    USERID: String,
    USERDESC: String,
    CONTREF: String,
    CONTNAME: String,
    TOTALQTY: String,
    NETT: String,
    TOTALDUE: Number,
    BALANCEDUE: Number,
    DELVTYPE: String,
    DLVCOUNTRYID: String,
    DLVCOUNTRY: String,
    DLVSTATEID: String,
    DLVSTATE: String,
    DLVCITYID: String,
    DLVCITY: String,
    DLVPINCODE: String,
    DELV: String,
    DELIVERYREMARKS: String,
    LANGID: String,
    LANGDESC: String,
    TEAMID: String,
    TEAMDESC: String,
    SUBTEAMID: String,
    SUBTEAMDESC: String,
    ORDERSOURCE: String,
    CCAUTHID: String,
    CCAUTHDESC: String,
    CCCHARES: String,
    DISTRICTID: String,
    DISTRICTDESC: String,
    PREFER: String,
    ORDER_FRAME:String,
    ORDER_FRAMEDESC: String,
    FRAMEVALUE: String,
    ORDERTIMEFRAME: String,
    ORDERTIMEFRAMEDESC: String,
    TIMEFRAMEVALUE: String,
    TOTALTAX: String,
    TOTALDISC: String,
    DELVADD1: String,
    DELVADD2: String,
    DELVADD3: String,
    DELVCITY: String,
    DELVPINCODE: String,
    DELVSTATE: String,
    DELVCOUNTRY: String,
    INVADD1: String,
    INVADD2: String,
    INVCITY: String,
    INVPINCODE: String,
    INVSTATE: String,
    INVCOUNTRY: String,
    CALLBACKCCONTACTNO: String,
    EXECPOINTID : Number,
    APPROVEFORAUTH: String,
    EXECPOINTDESC : String,
    AUTHORIZEDON : Date,
    AUTHBYID : Number,
    SHOWID : Number,
    SHOWDESC :String,
    AUTHBYDESC : String,
    AUTHREMARKS: String,
    ONHOLDDESC: String,
    CONTACTNO: Array,
    ORDERLINES: Array,
    PAYMENTLINES: Array,
    DELVSTATEID: String,
    DELVCITYID: String,
    DELVCOUNTRYID: String,
    INVSTATEID: String,
    INVCITYID: String,
    INVCOUNTRYID: String,
    CALLKEY: String

},{collection: 'Orders'});

var Order = mongoose.model( 'Orders', Order );

var OrderLines = new Schema({
    PRODID: Number,
    PRODDESC: String,
    SIZEID: { type: Number, default: -1 },
    SIZEDESC: { type: String, default: 'NA' },
    DISCOUNTS: Array,
    DISCOUNTCODE: Number,
    DISCOUNTDESC: String,
    DISCVALUE: Number,
    AGENTUPSELL: String,
    ISUPSELL: String,
    ISAMC: String,
    AMCVALUE: Number,
    SALEPRICE: Number,
    QNTY: Number,
    GROSS: Number,
    ORDERREF: String,
    ORDERLINEREF:String,
    ORDERLINEID: Number,
    DISCTYPE: String,
    DISCDISP : String,
    DISPVAL: Number,
    DISCID: String,
    FREEITEM: String,
    FREEITEMCOST: Number,
    ORIGINALPRICE: Number,
    UPSELLVALUE: Number,
    USERID: Number,
    USERDESC:String,
    AMCBYID: Number,
    AMCBYDESC: String



},{ collection: 'OrderLines' });

var OrderLines = mongoose.model( 'OrderLines', OrderLines );


var PaymentLines = new Schema({
    PAYMENTLINEID : Number,
    PAYMENTMODEID: Number,
    PAYMENTMODEIDDESC:String,
    PAYMENTMODE: Number,
    PAYMENTMODEDESC: String,
    PAYMENTCOURIEREXECID: Number,
    PAYMENTCOURIEREXECDESC: String,
    PAYMENTAMOUNT: Number,
    PAYMENTBANKID: String,
    PAYMENTBANKNAME: String,
    CARDTYPE: String,
    NAMEONCARD: String,
    AUTHCODE: String,
    PAYMENTREMARKS: String,
    ORDERREF: String
}, {collection: 'PaymentLines'});

var PaymentLines = mongoose.model('PaymentLines', PaymentLines);

var OrderEvent = new Schema({

    ORDERREF: String,
    ORDERDATE : { type: Date, default: Date.now },
    ORDERSTATUS: String,
    LASTUPDATEDON : {type : Date, default : Date.now},
    REMARKS : String,
    CONTNAME: String

}, {collection: 'OrderEvents'});


var OrderEvent = mongoose.model('OrderEvent', OrderEvent);


exports.createPaymentLine = function (paymentLineObj,callback){
    var paymentLineOBJ = JSON.parse(paymentLineObj);
    var paymentLine = new PaymentLines(paymentLineOBJ);
    paymentLine.save(function( err, PaymentLines, count ){
        if(err) { console.log(err); callback(true); return; }
        callback(false, count);
    });
};




exports.createOrderLine = function (orderLineObj,callback){
    var orderLineOBJ = JSON.parse(orderLineObj);
    var orderLine = new OrderLines(orderLineOBJ);
    orderLine.save(function( err, OrderLines, count ){
        if(err) { console.log(err); callback(true); return; }
        callback(false, count);
    });
};




exports.getAllOrders = function (params, callback){
    var results = [] ;
    console.log(params.ORDERSTATUS + " --> inside model object");

    Order.find({}, function(err, records) {

        records.forEach(function (post, i) {
            results.push({
                id: i,
                ORDERREF: post.ORDERREF,
                ORDERSTATUS: post.ORDERSTATUS

            });
        });

        if(err) { console.log(err); callback(true); return; }
        callback(false, results);

    })

};


exports.createOrder = function (orderObj,callback){
  //  var orders = JSON.parse(orderObj);

   var order = new Order(orderObj);
   order.save(function( err, Order, count ){
            if(err) { console.log(err); callback(true); return; }
            callback(false, Order);
        });

    //var callRecordParam = orderObj;
    var callRecordParam = {};

    callRecordParam["DISPO"] = orderObj.DISPO;
    callRecordParam["CALLSTATUS"] = orderObj.CALLSTATUS;
    callRecordParam["REMARKS"] = orderObj.REMARKS;
    callRecordParam["CALLKEY"] = orderObj.CALLKEY;
    callRecordParam["USERDESC"] = orderObj.USERDESC;
    callRecordParam["DISPID"] = orderObj.DISPID;
    callRecordParam["DISPDESC"] = orderObj.DISPDESC;

    var contactRecordParam = {};
    contactRecordParam["BALANCEDUE"] = orderObj.BALANCEDUE;
    contactRecordParam["CONTREF"] = orderObj.CONTREF;

    eventHelper.auditLogEventListner.emitMethod(callRecordParam, "call");
    eventHelper.auditLogEventListner.emitMethod(orderObj, "order");
    eventHelper.auditLogEventListner.emitMethod(contactRecordParam, "contact");
    delete orderObj.ORDERLINES;
    delete orderObj.PAYMENTLINES;
    codafBroker.sendOrderhdrToCODAF('ORDERHDR',JSON.stringify(orderObj));
    codafBroker.PendingOrderToDialer('INSERTPENDINGORDER',JSON.stringify(orderObj));

};


exports.createEvent = function (paramObj){
    // var eventObj = JSON.parse(paramObj);

// Keep on increase fields on update and other events.
    var eventObj = paramObj;

    delete eventObj["_id"];

    var oe = new OrderEvent(eventObj);
    oe.save(function( err, event, count ){
        if(err) {
            console.log(err);
        }

    });
};



exports.getOrderById = function (id,callback){
    Order.findOne({ ORDERREF: id}, function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        console.log(Order);
        callback(false, Order);
    })
};


exports.getOrderByCustomer = function (id,callback){
    console.log(id);
    Order.find({ CONTREF: id}).select({_id:0, PAYMENTLINES: 0}).exec(function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        console.log(Order);
        callback(false, Order);
    });
};


exports.getOrderSummryByCustomer = function (id,callback){
    console.log(id);
    Order.find({ CONTREF: id}).select({'ORDERREF':1 , '_id':1, 'ORDERSTATUS': 1,'ORDERLINES.PRODDESC' :1 , 'ORDERLINES.PRODID' :1, 'ORDERLINES.SIZEID' :1, 'ORDERLINES.SIZEDESC' :1}).exec(function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        console.log(Order);
        callback(false, Order);
    });
};


exports.updateOrderById = function (newOrderObj,callback){

    var order = new Order(newOrderObj.body);
    var id = order.ORDERREF;

    Order.findOne({ORDERREF: id}, function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        if(Order === null || Order === undefined) { console.log(err); callback(err + "----Wrong Parameter" + newOrderObj.body.toString()); return; }
        for (prop in newOrderObj.body) {

            Order[prop] = newOrderObj.body[prop];
        }


        Order.save(function(err) {
            if (err) {
                console.log(err); callback(err + "---->Wrong Parameter" + newOrderObj.body); return;
            }

            callback(false, { message: 'Order updated!' });
            eventHelper.auditLogEventListner.emitMethod(newOrderObj, "order");
        });


    })
};

exports.deleteById = function (id,callback){

    Order.remove({ ORDERREF: id}, function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        callback(false, "Order deleted");
    })
};



exports.getOrderRefNextSeq = function(req, callback){

    mongoose.connection.db.eval("getNextOrderSequence('orderref')", function(err, retVal) {
        console.log(retVal);
       // var retString = retVal.toString();
        var retString = retVal;
        callback(null, retString);

    });
};



exports.getOrderLineNextSeq = function(req, callback){

    mongoose.connection.db.eval("getNextOrderSequence('orderline')", function(err, retVal) {
        console.log(retVal);
        callback(null, retVal);

    });
};



exports.getSearchOrderAllWithoutCustomer = function (inputJSON, accessLvl, callback){

   // var cust = inputJSON.CONTNAME;
    var dateFrom = inputJSON.DATEFROM;
    var dateTo = inputJSON.DATETO;

    var status = new Array();

    var orderStatus = inputJSON.ORDERSTATUS;

    status = orderStatus.split(',');


    delete inputJSON.CONTNAME;
    delete inputJSON.DATEFROM;
    delete inputJSON.DATETO;
    delete inputJSON.ORDERSTATUS;

    console.log(inputJSON);

    var query = Order.find({});

    if(accessLvl.length > 0){
        query.where(accessLvl[0], accessLvl[1]);
    }
    query.where('ORDERDATE').gte(new Date(dateFrom)).lte(new Date(dateTo));
    query.where('ORDERSTATUS').in(status);



   // console.log(query.$explain);

    //query.where('CONTNAME',  new RegExp(cust, 'i'));

        query.exec(function (err, Order) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            //  console.log(Call);
            console.log(Order);
            callback(false, Order);
        });


};


exports.getSearchOrderAllWithCustomer = function (inputJSON, accessLvl, callback){
    //var test = {'ORDERREF': 5617141007579905};

    var cust = inputJSON.CONTNAME;
    var dateFrom = inputJSON.DATEFROM;
    var dateTo = inputJSON.DATETO;

   /* delete inputJSON.CONTNAME;
    delete inputJSON.DATEFROM;
    delete inputJSON.DATETO;*/

  /*  inputJSON["CONTNAME"] = new RegExp(cust, 'i');

    console.log(inputJSON);*/
    var status = new Array();

    var orderStatus = inputJSON.ORDERSTATUS;
    status = orderStatus.split(',');

    var searchParam = {'CONTNAME' : new RegExp(cust, 'i')};

    //searchParam["ORDERSTATUS"] = inputJSON.ORDERSTATUS;

    var query = Order.find(searchParam);


    if(accessLvl.length > 0){
        query.where(accessLvl[0], accessLvl[1]);
    }
    query.where('ORDERDATE').gte(new Date(dateFrom)).lte(new Date(dateTo));
    query.where('ORDERSTATUS').in(status);

    //query.where('CONTNAME',  new RegExp(cust, 'i'));

        query.exec(function (err, Order) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            //  console.log(Call);
            console.log(Order);
            callback(false, Order);
        });


};


exports.getCustomerAddbyOrderref = function (input, callback){

    var orderref = input;
    Order.find({ ORDERREF: orderref}).select({'_id':0, CONTNAME: 1, CONTNAME: 1, CALLBACKCCONTACTNO:1, DELVCITY:1, DELVCOUNTRY:1,  ORDERREF:1, CONTREF :1}).exec(function(err, CustInfo){
        if(err) { console.log(err); callback(true); return; }
        callback(false, CustInfo);

    });

}




exports.getCustomerAddbyContactNo = function (input, callback){

    var contactno = input;
    Order.findOne({ CALLBACKCCONTACTNO: contactno}).select({'_id':0, CONTNAME: 1, ORDERREF:1, CALLBACKCCONTACTNO:1, DELVCITY:1, DELVCOUNTRY:1, CONTREF:1}).exec(function(err, CustInfo){
        if(err) { console.log(err); callback(true); return; }
        callback(false, CustInfo);

    });

}




exports.getCustomerByOrder = function (input, callback){

    var orderref = input;
    Order.find({ ORDERREF: orderref}).select({'_id':0, CONTREF: 1}).exec(function(err, CustInfo){
        if(err) { console.log(err); callback(true); return; }
        callback(false, CustInfo);

    });

}


exports.getOrderHistoryByOrderId = function (input, callback){

    var orderref = input;
    OrderEvent.find({ ORDERREF: orderref}).select({'_id':0}).exec(function(err, OrderEvent){
        if(err) { console.log(err); callback(true); return; }
        callback(false, OrderEvent);

    });

}

exports.getTotalOrderByContref = function (input, callback){

    var contref = input;
    Order.find({ CONTREF: contref}).select({'_id':0, ORDERREF:1}).exec(function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        callback(false, Order.length);

    });

}
exports.getAllOrdersForConfirmation = function(callback){

    var query = Order.find({}).select({'_id':0, 'ORDERREF':1 , 'LANGDESC':1, 'CONTREF' :1, 'ORDERDATE':1, 'TEAMDESC':1, 'CONTACTNO':1});
    query.where('ORDERSTATUS',  'P');
    query.where("APPROVEFORAUTH").ne("Y");
    query.sort({'ORDERDATE':-1});
    query.exec ( function(err, Order){
        if(err) { console.log(err); callback(true); return; }

        callback(false, Order);
    });

}

exports.updateOrderAfterAuth = function (newOrderObj,callback){
    var order = new Order(newOrderObj);
    var id = order.ORDERREF;

        Order.findOne({ORDERREF: id}, function(err, Order){
            if(err) { console.log(err); callback(true); return; }
            if(Order === null || Order === undefined){ console.log(err); callback(true); return; }
            for (prop in newOrderObj) {
                Order[prop] = newOrderObj[prop];
            }


            Order.save(function(err) {
                if (err) {
                    console.log(err); callback(true); return;
                }

                callback(false, { message: 'Order updated!' });
            });

            eventHelper.auditLogEventListner.emitMethod(newOrderObj, "order");
            codafBroker.sendOrderhdrToCODAF('UPDATEORDERHDR',JSON.stringify(newOrderObj));
            codafBroker.PendingOrderToDialer('REMOVEPENDINGORDER',JSON.stringify(Order));
        })



};

exports.smsEventLogOnOrderEquiry = function (paramObj, callback){

    var eventObj = paramObj;


    var oe = new OrderEvent(eventObj);
    oe.save(function(err, oe){
        if(err) {
            console.log(err); callback(true); return;
        }

        callback(false, { message: 'Enquiry updated!' });
    });

    var callRecordParam = {};

    callRecordParam["DISPO"] = paramObj.DISPO;
    callRecordParam["CALLSTATUS"] = paramObj.CALLSTATUS;
    callRecordParam["REMARKS"] = paramObj.REMARKS;
    callRecordParam["CALLKEY"] = paramObj.CALLKEY;
    callRecordParam["DISPDESC"] = paramObj.DISPDESC;
    callRecordParam["DISPID"] = paramObj.DISPID;


    eventHelper.auditLogEventListner.emitMethod(callRecordParam, "call");
};

    exports.processPaymentLines = function(paymmentLineItems, orderref, callback) {

        var paymentLinesResponse = new Array();
        var orderref = orderref;
        async.each(paymmentLineItems, function (paymmentLineItem, callback) {


            var newPayLineObj = {};
                newPayLineObj = paymmentLineItem;

            mongoose.connection.db.eval("getNextOrderSequence('paymentline')", function(err, retVal) {

                  newPayLineObj["ORDERREF"] = orderref;
                  newPayLineObj["PAYMENTLINEID"] = retVal;

              //  JSON.stringify()

            var payLinesObj = new PaymentLines(newPayLineObj);
                payLinesObj.save(function (err, newPay, count) {
                    delete newPay["_id"];
                    delete newPay["__v"];
                    paymentLinesResponse.push(newPay);
                console.log("inside array");
                callback();

            })

                codafBroker.sendOrderhdrToCODAF('PAYMENTLINE',JSON.stringify(newPayLineObj));

            });

        },
            function(err) {
                callback(null, paymentLinesResponse);
            }

        );


}

exports.processOrderLine = function(orderLineItems,orderref,  callback){

    var orderLines = new Array();
    var orderref = orderref;
    async.each(orderLineItems, function (orderLineItem, callback) {

                var newOrderLineObj = {};

            newOrderLineObj = orderLineItem;



        mongoose.connection.db.eval("getNextOrderSequence('orderline')", function(err, retVal) {

            newOrderLineObj["ORDERLINEID"] = retVal;
            newOrderLineObj["ORDERREF"] = orderref;
            var orderLinesObj = new OrderLines(newOrderLineObj);

            orderLinesObj.save(function (err, newOrder, count) {
                delete newOrder["_id"];
                delete newOrder["__v"];
                orderLines.push(newOrder);
                console.log("inside array");
                callback();

            })
            codafBroker.sendOrderhdrToCODAF('ORDERLINE',JSON.stringify(newOrderLineObj));

        });

    },
        function(err) {
            callback(null, orderLines);
        });

  /*  var orderLineObj = new OrderEvent(param);

    orderLineObj.save(function( err, OrderLines, count ){
        if(err) { console.log(err); callback(true); return; }
        callback(false, { message: OrderLines });
    });
*/


}

/*


exports.processOrderLines = function (orderLine,orderref,callback){

    // var orderLineJSON = JSON.parse(orderLine);

    var orderLineJSON = orderLine;

    var i = 0;

    var test = this;

    async.forEachSeries(orderLineJSON, function (orderLineJSON, next) {


        mongoose.connection.db.eval("getNextOrderSequence('orderline')", function(err, retVal) {

            // var retString = retVal.toString();

            console.log('ORDERLINE----->'+ i);

            orderLineJSON['ORDERLINEID'] = retVal;
            orderLineJSON['ORDERREF'] = orderref;
            i++;

            var line = orderLineJSON;
            line['ORDERREF'] = orderref;
            line['ORDERLINEID'] = retVal;
            var oline = JSON.stringify(line);
            console.log(oline);
            test.createOrderLine(oline, function (err, results) {
                //res.send(inputJSON);
                next();

            });
        });


    }, function (err) {
        //  callback.apply(null, err);
    });
    callback(false,orderLineJSON);

};
*/

exports.orderContacts = function(orderref,  callback){

    var query = Order.findOne({}).select({'_id':0, 'CONTACTNO':1});
    query.where('ORDERREF',  orderref);

    query.exec ( function(err, contacts){
        if(err) { console.log(err); callback(true); return; }

        callback(false, contacts);
    });

}

exports.processAuthPaymentLines = function(paymmentLineItems, orderref, callback) {

    var paymentLinesResponse = new Array();
    var orderref = orderref;
    async.each(paymmentLineItems, function (paymmentLineItem, callback) {


            var newPayLineObj = {};
            newPayLineObj = paymmentLineItem;

            if(paymmentLineItem["ISNEW"])
            {
                mongoose.connection.db.eval("getNextOrderSequence('paymentline')", function(err, retVal) {

                    newPayLineObj["ORDERREF"] = orderref;
                    newPayLineObj["PAYMENTLINEID"] = retVal;

                    var payLinesObj = new PaymentLines(newPayLineObj);
                    payLinesObj.save(function (err, newPay, count) {
                        delete newPay["_id"];
                        delete newPay["__v"];
                        paymentLinesResponse.push(newPay);
                        console.log("inside array");
                        callback();

                    })

                 //   codafBroker.sendOrderhdrToCODAF('UPDATEPAYMENTLINE',JSON.stringify(newPayLineObj));

                });
            }
            else
            {
                var paymentLinesObj = new PaymentLines(newPayLineObj);

                var id = paymentLinesObj.PAYMENTLINEID;
                PaymentLines.findOne({PAYMENTLINEID: id}, function(err, PaymentLines){
                    if(err) { console.log(err); callback(true); return; }
                    for (prop in newPayLineObj) {

                        PaymentLines[prop] = newPayLineObj[prop];
                    }


                    PaymentLines.save(function (err, newPay, count) {
                        delete newPay["_id"];
                        delete newPay["__v"];
                        paymentLinesResponse.push(newPay);
                        console.log("inside array");
                        callback();

                    })

                  //  codafBroker.sendOrderhdrToCODAF('UPDATEPAYMENTLINE',JSON.stringify(newPayLineObj));


                });

            }



        },
        function(err) {
            callback(null, paymentLinesResponse);
        }

    );


}

exports.processAuthOrderLine = function(orderLineItems,orderref,  callback){

    var orderLines = new Array();
    var orderref = orderref;
    async.each(orderLineItems, function (orderLineItem, callback) {

            var newOrderLineObj = {};

            newOrderLineObj = orderLineItem;

            if(newOrderLineObj["ISNEW"])
            {
                mongoose.connection.db.eval("getNextOrderSequence('orderline')", function(err, retVal) {

                    newOrderLineObj["ORDERLINEID"] = retVal;
                    newOrderLineObj["ORDERREF"] = orderref;
                    var orderLinesObj = new OrderLines(newOrderLineObj);

                    orderLinesObj.save(function (err, newOrder, count) {
                        delete newOrder["_id"];
                        delete newOrder["__v"];
                        orderLines.push(newOrder);
                        console.log("inside array");
                        callback();

                    })

                 //   codafBroker.sendOrderhdrToCODAF('UPDATEORDERLINE',JSON.stringify(newOrderLineObj));


                });

            }
            else
            {
                var orderLinesObj = new OrderLines(newOrderLineObj);

                var id = orderLinesObj.ORDERLINEID;
                OrderLines.findOne({ORDERLINEID: id}, function(err, OrderLines){
                    if(err) { console.log(err); callback(true); return; }
                    for (prop in newOrderLineObj) {

                        OrderLines[prop] = newOrderLineObj[prop];
                    }


                    OrderLines.save(function (err, newOrder, count) {
                        delete newOrder["_id"];
                        delete newOrder["__v"];
                        orderLines.push(newOrder);
                        console.log("inside array");
                        callback();

                    })

                //    codafBroker.sendOrderhdrToCODAF('UPDATEORDERLINE',JSON.stringify(newOrderLineObj));


                });


            }



        },
        function(err) {
            callback(null, orderLines);
        });

    /*  var orderLineObj = new OrderEvent(param);

     orderLineObj.save(function( err, OrderLines, count ){
     if(err) { console.log(err); callback(true); return; }
     callback(false, { message: OrderLines });
     });
     */


}
