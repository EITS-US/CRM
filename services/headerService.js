var headerDAO = require('./../models/orderdb/headers');


exports.getNonSaleReasons = function(req, res){

    headerDAO.getNonSaleCallsReasons(function(err, results) {
        results[0]['LOOKID'] = 14;
        res.send(results);
    });

}

exports.getNotIntReasons = function(req, res){

    headerDAO.getNotIntReasons(function(err, results) {

        results[0]['LOOKID'] = 15;
        res.send(results);
    });

}


exports.getGenInqReasons = function(req, res){

    headerDAO.getGenInqReasons(function(err, results) {
        results[0]['LOOKID'] = 2;
        res.send(results);
    });

}


exports.getCallBackReasons = function(req, res){
    headerDAO.getCallBackReasons(function(err, results) {
        results[0]['LOOKID'] = 1;
        res.send(results);
    });
}

exports.getComplaintReasons = function(req, res){

    var complaintType = req.params.id;
    var inputJSON = {};
    inputJSON["HDRID"] = complaintType;

    headerDAO.getComplaintReasons(inputJSON, function(err, results) {
        results[0]['LOOKID'] = 3;
        res.send(results);
    });


}

exports.getLanguages = function(req, res){

    headerDAO.getLanguages(function(err, results) {
        res.send(results);
    });

}

exports.getOnHoldReasons = function(req, res){

    headerDAO.getOnHoldReasons(function(err, results) {
        res.send(results);
    });

}