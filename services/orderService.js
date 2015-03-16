var mydb = require('../models/orderdb/orders');
var mypindb = require('../models/orderdb/pincode');
var uHelper = require('../helper/UserHelper');
var mycontactdb = require('../models/contactsdb/contact');

var myproddb = require('./../models/orderdb/product');
var myprodsizedb = require('./../models/orderdb/productsizes');
var userDB = require('./../models/contactsdb/User');

var teamdb = require('./../models/contactsdb/team');

var paydb = require('./../models/orderdb/paymodes');

var courierdb = require('./../models/orderdb/courier');

var async = require('async');

var eventHelper = require('./../helper/eventHelper');



exports.getAllOrders = function(req, res, obj){
    console.log("here i got the object" + obj);

    uHelper.resolveVisibility(req.method, obj, "Order", function(err, results){
        console.log(results + "visibility resolved");

        mydb.getAllOrders(results, function(err, orderResults) {
            res.send(orderResults);
        });

    });

}

exports.createOrder = function(req, res){
    //var input = JSON.parse(JSON.stringify(req.body));
    var recJSON = req.body;
  // var recJSON = '{"ORDERSTATUS":"pending","USERID":"customer profile","USERDESC":"customer profile","CONTREF":"12","CONTNAME":"Customer Name","TOTALQTY":"Order level total quantity","NETT":"Order level Gross","TOTALDUE":"Total Due","DLVCOUNTRYID":"-1","DLVCOUNTRY":"country contact address","DLVSTATEID":"-1","DLVSTATE":"state contact address","DLVCITYID":"-1","DLVCITY":"city contact address","DLVPINCODE":"pincode contact address","DELV":"test","LANGID":"customer profile","LANGDESC":"customer profile","TEAMID":"customer profile","TEAMDESC":"customer profile","SUBTEAMID":"customer profile","SUBTEAMDESC":"customer profile","ORDERSOURCE":"11","CCAUTHID":"11","CCAUTHDESC":"test","CCCHARES":"11","DISTRICTID":"11","DISTRICTDESC":"test","PREFER":"test","ORDER_FRAME":"test","ORDER_FRAMEDESC":"test","FRAMEVALUE":"123","TOTALTAX":"11","TOTALDISC":"test","DELVADD1":"test","DELVADD2":"test","DELVCITY":"test","DELVPINCODE":"111","DELVSTATE":"test","DELVCOUNTRY":"test","INVADD1":"test","INVADD2":"test","INVCITY":"test","INVPINCODE":"11","INVSTATE":"test","INVCOUNTRY":"test","CALLBACKCCONTACTNO":"9811005678","orderlines":[{"PRODID":111,"PRODDESC":"Ervamartin","SIZEID":123,"SIZEDESC":"medium","DISCOUNTCODE":88,"DISCOUNTDESC":"free item","DISCVALUE":0,"AGENTUPSELL":"N","ISAMC":"Y","AMCVALUE":"500","SALEPRICE":"200","QNTY":12,"GROSS":150},{"PRODID":111,"PRODDESC":"Ervamartin","SIZEID":124,"SIZEDESC":"medium","DISCOUNTCODE":88,"DISCOUNTDESC":"free item","DISCVALUE":0,"AGENTUPSELL":"N","ISAMC":"Y","AMCVALUE":"500","SALEPRICE":"200","QNTY":12,"GROSS":150}],"paymentlines":[{"PAYMENTMODEID":111,"PAYMENTMODE":"Ervamartin","PAYMENTAMOUNT":123,"PAYMENTBANKID":"medium","PAYMENTBANKNAME":88,"CARDTYPE":"free item","NAMEONCARD":0,"AUTHCODE":"N","PAYMENTREMARKS":"Y"}]}';
   ///console.log(recJSON);

    var inputJSON=   JSON.parse(recJSON["orderJson"])


  // var inputJSON = JSON.parse(recJSON);

   console.log(inputJSON);

    var orderline = inputJSON.ORDERLINES;
    var paymentline = inputJSON.PAYMENTLINES;

    var orderref;

    mydb.getOrderRefNextSeq(req,function(err, results) {

        orderref = results;

        inputJSON['ORDERREF'] = orderref;

       // res.send(results);

        var count;
        console.log('Length----->' + orderline.length);


            async.forEachSeries(orderline, function (orderline, next) {


                mydb.getOrderLineNextSeq(orderline,function(err, results) {

                    var line = orderline;
                    line['ORDERREF'] = orderref;
                    line['ORDERLINEID'] = results;
                    var oline = JSON.stringify(line);
                    console.log(oline);
                    mydb.createOrderLine(oline, function (err, results) {
                        //res.send(inputJSON);
                        next();

                    });
                });


            }, function (err) {
              //  callback.apply(null, err);
            });



        async.forEachSeries(paymentline, function (paymentline, next) {


            var line = paymentline;
            line['ORDERREF'] = orderref;

            var oline = JSON.stringify(line);
            console.log(oline);
            mydb.createPaymentLine(oline, function (err, results) {
                //res.send(inputJSON);
                next();

            });


        }, function (err) {
            //  callback.apply(null, err);
        });



                //delete inputJSON.orderlines;
                //delete inputJSON.paymentlines;
        console.log(inputJSON);
        mydb.createOrder(inputJSON, function(err, results) {

            res.send(inputJSON);
        });

    });


}

exports.getOrderById = function(req, res){
    console.log( req.params.id);
    var input = req.params.id;
    mydb.getOrderById(input, function(err, results) {
        res.send(results);
    });
}


exports.deleteById = function(req, res){
    console.log( req.params.id);
    var input = req.params.id;
    mydb.deleteById(input, function(err, results) {
        res.send(results);
    });
}

exports.updateOrderById = function(req, res, next){
    //console.log( req.params.id);
  //  var input = req.body;
    mydb.updateOrderById(req, function(err, results) {
        if (err) { return next(err); }
        res.send(results);
    });
}







exports.getProductById = function(req, res){

    // console.log( req.params.id);
    // var input = req.params.id;

    myproddb.getProductById(req,function(err, results) {
        res.send(results);
    });

}

exports.getProduct = function(req, res){

    // console.log( req.params.id);
    var input = req.params.id;

    myproddb.getProduct(input,function(err, results) {
        res.send(results);
    });

}


exports.getProductSizeDetail = function(req, res){

    console.log( req.params.id);
    var input = req.params.id;

    myprodsizedb.getProductSizeById(input,function(err, results) {
        res.send(results);
    });

}


exports.getOrderRefNextSeq = function(req, res){

    mydb.getOrderRefNextSeq(req,function(err, results) {
        res.send(results);
    });

}

exports.payModes = function(req, res){

    paydb.getPayModes(req, function(err, results) {
        res.send(results);
    });

}


exports.payOptions = function(req, res){

    paydb.getPayModeOptions(req, function(err, results) {
        res.send(results);
    });

}


exports.getPayOptionsByModes = function(req, res){

    var input = req.params.id;

    paydb.getPayOptionsByModes(input, function(err, results) {
        res.send(results);
    });

}

exports.getSearchOrder = function(req, res){

    var searchParams = req.query.Search;
    var inputJSON = JSON.parse(searchParams);
    var custName = inputJSON.CONTNAME;

    var accessParams = {"username": inputJSON.USERNAME, "subject" : "Order"};
    userDB.getUserPermissionOnSubject(accessParams, function(err, accessLvl){

        if(custName ===null || custName === "" || custName === undefined)
        {

            mydb.getSearchOrderAllWithoutCustomer(inputJSON, accessLvl, function(err, results) {
                res.send(results);
            });

        }
        else
        {
            mydb.getSearchOrderAllWithCustomer(inputJSON, accessLvl, function(err, results) {
                res.send(results);
            });
        }


    });



}


exports.getBanksTypes = function(req, res){
    paydb.getBanks(function(err, results) {
        res.send(results);
    });

}


exports.getOrderByCustomer = function(req, res){
    console.log( req.params.id);
    var input = req.params.id;
    mydb.getOrderByCustomer(input, function(err, results) {
        res.send(results);
    });
}


exports.getOrderSummryByCust = function(req, res){
    console.log( req.params.id);
    var input = req.params.id;
    mydb.getOrderSummryByCustomer(input, function(err, results) {

        res.send(results);
    });
}

exports.getCustomerAddbyOrderref = function (req, res){

    console.log( req.params.id);
    var input = req.params.id;
    mydb.getCustomerAddbyOrderref(input, function(err, results) {
        res.send(results);
    });

}


exports.getCustomerByOrder = function (req, res){

    console.log( req.params.id);
    var input = req.params.id;
    mydb.getCustomerByOrder(input, function(err, results) {

        //var test = JSON.parse(results);

        var id = results[0].CONTREF;
        console.log(id);

        mycontactdb.getContactByContref(id,function(err, custinfo){
            res.send(custinfo);

        });



    });

}

exports.getOrderHistoryByOrderId = function (req, res){

    console.log( req.params.id);
    var input = req.params.id;
    mydb.getOrderHistoryByOrderId(input, function(err, results) {
        res.send(results);
    });

}



exports.getCourierByID = function (req, res){

    console.log( req.params.id);
    var input = req.params.id;
    courierdb.getCourierByID(input, function(err, results) {
        res.send(results);
    });

}




exports.getAllFranchisees = function (req, res){

   // console.log( req.params.id);
    var input = req;
    courierdb.getAllFranchisees(input, function(err, results) {
        res.send(results);
    });

}


exports.getAllShowrooms = function (req, res){

    // console.log( req.params.id);
    var input = req;
    courierdb.getAllShowrooms(input, function(err, results) {
        res.send(results);
    });

}

exports.getTotalOrderByContref = function (req, res){

    var input = req.params.id;
    mydb.getTotalOrderByContref(input, function(err, orderCount) {
        var totalCount = {"TOTALORDER" : orderCount};
        res.send(totalCount);
    });

}


exports.getAllOrdersForConfirmation = function (req, res){


    mydb.getAllOrdersForConfirmation(function(err, OrderList) {
        res.send(OrderList);
    });

}


exports.updateOrderAfterAuth = function(req, res){
    //var input = JSON.parse(JSON.stringify(req.body));
    var recJSON = req.body;
    // var recJSON = '{"ORDERSTATUS":"pending","USERID":"customer profile","USERDESC":"customer profile","CONTREF":"12","CONTNAME":"Customer Name","TOTALQTY":"Order level total quantity","NETT":"Order level Gross","TOTALDUE":"Total Due","DLVCOUNTRYID":"-1","DLVCOUNTRY":"country contact address","DLVSTATEID":"-1","DLVSTATE":"state contact address","DLVCITYID":"-1","DLVCITY":"city contact address","DLVPINCODE":"pincode contact address","DELV":"test","LANGID":"customer profile","LANGDESC":"customer profile","TEAMID":"customer profile","TEAMDESC":"customer profile","SUBTEAMID":"customer profile","SUBTEAMDESC":"customer profile","ORDERSOURCE":"11","CCAUTHID":"11","CCAUTHDESC":"test","CCCHARES":"11","DISTRICTID":"11","DISTRICTDESC":"test","PREFER":"test","ORDER_FRAME":"test","ORDER_FRAMEDESC":"test","FRAMEVALUE":"123","TOTALTAX":"11","TOTALDISC":"test","DELVADD1":"test","DELVADD2":"test","DELVCITY":"test","DELVPINCODE":"111","DELVSTATE":"test","DELVCOUNTRY":"test","INVADD1":"test","INVADD2":"test","INVCITY":"test","INVPINCODE":"11","INVSTATE":"test","INVCOUNTRY":"test","CALLBACKCCONTACTNO":"9811005678","orderlines":[{"PRODID":111,"PRODDESC":"Ervamartin","SIZEID":123,"SIZEDESC":"medium","DISCOUNTCODE":88,"DISCOUNTDESC":"free item","DISCVALUE":0,"AGENTUPSELL":"N","ISAMC":"Y","AMCVALUE":"500","SALEPRICE":"200","QNTY":12,"GROSS":150},{"PRODID":111,"PRODDESC":"Ervamartin","SIZEID":124,"SIZEDESC":"medium","DISCOUNTCODE":88,"DISCOUNTDESC":"free item","DISCVALUE":0,"AGENTUPSELL":"N","ISAMC":"Y","AMCVALUE":"500","SALEPRICE":"200","QNTY":12,"GROSS":150}],"paymentlines":[{"PAYMENTMODEID":111,"PAYMENTMODE":"Ervamartin","PAYMENTAMOUNT":123,"PAYMENTBANKID":"medium","PAYMENTBANKNAME":88,"CARDTYPE":"free item","NAMEONCARD":0,"AUTHCODE":"N","PAYMENTREMARKS":"Y"}]}';
    console.log(recJSON);

    var inputJSON=   JSON.parse(recJSON["editJson"]);


    // var inputJSON = JSON.parse(recJSON);

    // console.log(inputJSON.count);

    var orderline = inputJSON.ORDERLINES;
    var paymentline = inputJSON.PAYMENTLINES;

    var orderref = inputJSON.ORDERREF;




        var count = paymentline.length;
        console.log('Length----->' + paymentline.length);


        async.forEachSeries(orderline, function (orderline, next) {

            var line = orderline;
           // var isnew = line['ISNEW'];
         //   if(isnew)
          //  {

                mydb.getOrderLineNextSeq(orderline,function(err, results) {


                   // line['ORDERREF'] = orderref;
                    line['ORDERLINEID'] = results;
                    var oline = JSON.stringify(line);
                    console.log(oline);
                    mydb.createOrderLine(oline, function (err, results) {
                        //res.send(inputJSON);
                        next();

                    });
                });

         //   }

        }, function (err) {
            //  callback.apply(null, err);
        });



        async.forEachSeries(paymentline, function (paymentline, next) {



            var line = paymentline;
          //  var isnew = line['ISNEW'];

          //  if(isnew)
          //  {
              //  line['ORDERREF'] = orderref;

                var oline = JSON.stringify(line);
                console.log(oline);
                mydb.createPaymentLine(oline, function (err, results) {
                    //res.send(inputJSON);
                    next();

                });
           // }
        }, function (err) {
            //  callback.apply(null, err);
        });

        //delete inputJSON.orderlines;
        //delete inputJSON.paymentlines;
        console.log(inputJSON);
        mydb.updateOrderAfterAuth(inputJSON, function(err, results) {

            res.send(inputJSON);
        });

  //  });


}


exports.asynchService = function(req, res){

    var recJSON = req.body;
    var inputJSON=   JSON.parse(recJSON["orderJson"]);

    var order = inputJSON;

    async.waterfall([
        function startPoint(callback) {

            mydb.getOrderRefNextSeq(req, function(err, results){

                order["ORDERID"] = results;
                order["ORDERREF"] = '661714120'+ results.toString();
                callback(null, order, order["ORDERREF"])

            })

        },
        function paymentline(order, orderref, callback) {

            var customOrder = order;

            var paymentLines = order["PAYMENTLINES"];


            mydb.processPaymentLines(paymentLines, orderref, function(err, results) {
                customOrder["PAYMENTLINES"] = results;
                callback(null,customOrder);

            });

        },
        function orderline(updatedOrder, callback) {

            var newOrderLineWithPayLine = {};
            newOrderLineWithPayLine = updatedOrder;

            var orderLines = updatedOrder["ORDERLINES"];
            var orderref = updatedOrder["ORDERREF"];

            mydb.processOrderLine(orderLines,orderref, function(err, results) {
                console.log(results);
                newOrderLineWithPayLine["ORDERLINES"] = results;
                callback(null,newOrderLineWithPayLine);


            });

        }], function (err, result) {
        mydb.createOrder(result, function(err, results){

            res.send(results);
        })

    });



}


/*



exports.createSyncOrder = function(req, res){
    //var input = JSON.parse(JSON.stringify(req.body));
    var recJSON = req.body;
    // var recJSON = '{"ORDERSTATUS":"pending","USERID":"customer profile","USERDESC":"customer profile","CONTREF":"12","CONTNAME":"Customer Name","TOTALQTY":"Order level total quantity","NETT":"Order level Gross","TOTALDUE":"Total Due","DLVCOUNTRYID":"-1","DLVCOUNTRY":"country contact address","DLVSTATEID":"-1","DLVSTATE":"state contact address","DLVCITYID":"-1","DLVCITY":"city contact address","DLVPINCODE":"pincode contact address","DELV":"test","LANGID":"customer profile","LANGDESC":"customer profile","TEAMID":"customer profile","TEAMDESC":"customer profile","SUBTEAMID":"customer profile","SUBTEAMDESC":"customer profile","ORDERSOURCE":"11","CCAUTHID":"11","CCAUTHDESC":"test","CCCHARES":"11","DISTRICTID":"11","DISTRICTDESC":"test","PREFER":"test","ORDER_FRAME":"test","ORDER_FRAMEDESC":"test","FRAMEVALUE":"123","TOTALTAX":"11","TOTALDISC":"test","DELVADD1":"test","DELVADD2":"test","DELVCITY":"test","DELVPINCODE":"111","DELVSTATE":"test","DELVCOUNTRY":"test","INVADD1":"test","INVADD2":"test","INVCITY":"test","INVPINCODE":"11","INVSTATE":"test","INVCOUNTRY":"test","CALLBACKCCONTACTNO":"9811005678","orderlines":[{"PRODID":111,"PRODDESC":"Ervamartin","SIZEID":123,"SIZEDESC":"medium","DISCOUNTCODE":88,"DISCOUNTDESC":"free item","DISCVALUE":0,"AGENTUPSELL":"N","ISAMC":"Y","AMCVALUE":"500","SALEPRICE":"200","QNTY":12,"GROSS":150},{"PRODID":111,"PRODDESC":"Ervamartin","SIZEID":124,"SIZEDESC":"medium","DISCOUNTCODE":88,"DISCOUNTDESC":"free item","DISCVALUE":0,"AGENTUPSELL":"N","ISAMC":"Y","AMCVALUE":"500","SALEPRICE":"200","QNTY":12,"GROSS":150}],"paymentlines":[{"PAYMENTMODEID":111,"PAYMENTMODE":"Ervamartin","PAYMENTAMOUNT":123,"PAYMENTBANKID":"medium","PAYMENTBANKNAME":88,"CARDTYPE":"free item","NAMEONCARD":0,"AUTHCODE":"N","PAYMENTREMARKS":"Y"}]}';
    console.log(recJSON);

    var inputJSON=   JSON.parse(recJSON["orderJson"])


    // var inputJSON = JSON.parse(recJSON);

    // console.log(inputJSON.count);

    var orderline = inputJSON.ORDERLINES;
    var paymentline = inputJSON.PAYMENTLINES;

    var orderref;

    mydb.getOrderRefNextSeq(req,function(err, results) {

        orderref = results;

        inputJSON['ORDERREF'] = orderref;

        // res.send(results);

        var count = orderline.length;
        console.log('Length----->' + orderline.length)
        var i = 0;


        mydb.processOrderLines(orderline,orderref,function(err, results) {

            var test = 'abc';
            test = test + 'd';
            console.log(test);
            console.log('Final Result---->>>>>>>>');
            console.log(results);
            inputJSON.ORDERLINES = results;
            console.log('Updated OrderLines.....Now going to update Full Order');
            console.log(inputJSON);

            mydb.createOrder(inputJSON, function(err, results) {

                //res.send(inputJSON);

                console.log('Final Result---->>>>>>>>');
            });





        })




        >>>>>>> Stashed changes





        <<<<<<< Updated upstream
        =======

        });


        }
        >>>>>>> Stashed changes

*/


exports.getAllDiscount = function(req, res){
    paydb.getDiscounts(function(err, results) {
        res.send(results);
    });

}

exports.addDiscount = function(req, res){
    var inputJSON = JSON.parse(req.body.data);
    var discountParam = {};
    if(inputJSON.type === 'CASH'){

        discountParam["DISCTYPE"] = "CASH";
        discountParam["DISCDISP"] = "Rs " + inputJSON.value + " Off";
        discountParam["DISPVAL"] = inputJSON.value;

    }
    else if(inputJSON.type ==='PERCENTAGE'){

        discountParam["DISCTYPE"] = "PERCENTAGE";
        discountParam["DISCDISP"] = inputJSON.value + "% Off";
        discountParam["DISPVAL"] = inputJSON.value;
    }
    paydb.createDiscount(discountParam, function(err, results) {
        res.send(results);
    });

}

exports.removeDiscount = function(req, res){
    var discID = JSON.parse(req.params.id);
    paydb.deleteDiscount(discID, function(err, results) {
        res.send(results);
    })
}

exports.getOrderContacts = function(req, res){
    var orderref = req.params.id
    mydb.orderContacts(orderref, function(err, results) {
        res.send(results);
    });

}


exports.getCustomerAddbyContactNo = function(req, res){
    var contactno = req.params.id
    mydb.getCustomerAddbyContactNo(contactno, function(err, results) {
        res.send(results);
    });

}



exports.asynchAuthUpdateService = function(req, res){

    var recJSON = req.body;
    var inputJSON=   JSON.parse(recJSON["editJson"]);

    var order = inputJSON;

    var orderref = order.ORDERREF;

    async.waterfall([
        function paymentline(callback) {

            var customOrder = order;

            var paymentLines = order.PAYMENTLINES;


            mydb.processAuthPaymentLines(paymentLines, orderref, function(err, results) {
                customOrder["PAYMENTLINES"] = results;
                callback(null,customOrder);

            });

        },
        function orderline(updatedOrder, callback) {

            var newOrderLineWithPayLine = {};
            newOrderLineWithPayLine = updatedOrder;

            var orderLines = updatedOrder["ORDERLINES"];
            var orderref = updatedOrder["ORDERREF"];

            mydb.processAuthOrderLine(orderLines,orderref, function(err, results) {
                console.log(results);
                newOrderLineWithPayLine["ORDERLINES"] = results;
                callback(null,newOrderLineWithPayLine);


            });

        }], function (err, result) {
        mydb.updateOrderAfterAuth(result, function(err, results){

            res.send(results);
        })

    });



}
