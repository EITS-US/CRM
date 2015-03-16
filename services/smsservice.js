/**
 * Created by AM015SI on 11/3/2014.
 */

var orderDAO = require('../models/orderdb/orders');
var comHelper = require('../helper/communicationHelper');



exports.sendSMSForOrderEnquiry = function(req, res){

    var recJSON = req.body;
    var inputJSON=   JSON.parse(recJSON["orderSmsJson"]);

    orderDAO.smsEventLogOnOrderEquiry(inputJSON, function(err, results) {
        res.send(results);
    });


}

exports.sendSMS = function(req, res){

    var smsParam = req.body;
    var inputJSON =   JSON.parse(smsParam["smsJSON"]);

    comHelper.sendSMSToCustomer(inputJSON , function(err, results) {
        res.send(results);
    })

}