var complaintDAO = require('./../models/orderdb/complaint');

var callDAO = require('./../models/callsdb/call');
var userDB = require('./../models/contactsdb/User');


exports.createComplaint = function(req, res){

    var complaintInputObj  = req.body.inputJSON;
    var inputParam =JSON.parse(complaintInputObj);

    inputParam["PRODUCTID"] = inputParam.DISPO[0].PRODID;
    inputParam["PRODUCT"] = inputParam.DISPO[0].PRODDESC;


    //console.log(complaintInputObj);

    complaintDAO.createComplaint(inputParam, function(err, results) {
        res.send(results);
    });
}


exports.getComplaintByRef = function(req, res){

    var complaintInputObj  =  req.params.id;
    console.log(complaintInputObj);
    complaintDAO.getComplaintByRef(complaintInputObj, function(err, results) {
        res.send(results);
    });


}

exports.getComplaintDetailsByRef = function(complaintId, callback){

    complaintDAO.getComplaintDetailByRef(complaintId, function(err, complaintOBJ) {
        callback(err, complaintOBJ);
    });


}


exports.updateComplaint = function(req, res){

    var complaintInputObj  =  req.body;
    //console.log(complaintInputObj);
    complaintDAO.updateComplaint(complaintInputObj, function(err, results) {
        res.send(results);
    });


}

exports.getComplaintHistoryById = function(req, res){

       var complaintInputObj =  req.params.id;
    complaintDAO.getComplaintHistoryById(complaintInputObj, function(err, results) {
        res.send(results);
    });


}

exports.getComplaintsByCustomer = function (req, res){

    var complaintInputObj =  req.params.id;
    complaintDAO.getComplaintsByCustomer(complaintInputObj, function(err, results) {
        res.send(results);
    });

}



exports.getComplainDetail = function (req, res){

    var accessParams = {};
    var complaintInputObj =  req.query.Search;

    var inputJSON = JSON.parse(complaintInputObj);
    accessParams['username'] = inputJSON.USERNAME;
    accessParams["subject"] = "Complaint";

    userDB.getUserPermissionOnSubject(accessParams, function(err, accessLvl) {

        complaintDAO.getComplainDetail(complaintInputObj, accessLvl, function (err, results) {
            res.send(results);
        });

   });

}

