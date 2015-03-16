var mycontactdb = require('../models/contactsdb/contact');
var dndDAO = require('../models/contactsdb/dndrequests');
var mycalldb = require('../models/callsdb/call');


exports.getContactById = function(req, res){

    console.log( req.params.id);
    var input = req.params.id;

    mycontactdb.getContactById(input,function(err, results) {
        res.send(results);
    });

}



exports.createContact = function(req, res){

   // console.log( req.params.id);
    var input = req;

    mycontactdb.createContact(input,function(err, results) {
        var respMsg = {"CONTNAME" : results.CONTNAME, "CONTREF" : results.CONTREF};
        res.send(respMsg);
    });

}


exports.putContactUpdate = function(req, res){

    // console.log( req.params.id);
    var input = req;
    var custJSON = JSON.parse(input.body.customerJSON);
    mycontactdb.putContactUpdate(custJSON,function(err, results) {
        res.send(results);
       if(err === false){
           updateCODAFCallRecordLine(custJSON);
       }

    });


}

updateCODAFCallRecordLine = function(callJSON){
    if(callJSON.CALLKEY !== undefined){
        mycalldb.updateCODAFCallRecordLine(callJSON.CALLKEY);
    }

}

exports.getContactByContactNo = function(req, res){

    // console.log( req.params.id);
    var input = req.params.id;
    input = input.toString();

    mycontactdb.getContactByContactNo(input,function(err, results) {

        var respObj = {};

        if(results != null){


        var pincodes = results["ContactDetails"].Address[0].PINCODE;
        var add1 = results["ContactDetails"].Address[0].ADD1;
        var name = results["CONTNAME"];



        if(pincodes == undefined || pincodes == ""){
            respObj["message"] = "false";
            res.send(respObj);

        }else if(add1 == undefined || add1 == ""){

            respObj["message"] = "false";
            res.send(respObj);

        }else if(name == undefined || name == ""){
            respObj["message"] = "false";
            res.send(respObj);
        }
        else{
            respObj["message"] = "true";
            res.send(respObj);

        }
        }else{
            respObj["message"] = "false";
            res.send(respObj);
        }



    });

}

exports.checkDuplicateContact = function(req, res){

    var paramObj =  req.body;
    var inputJSON =   JSON.parse(paramObj["contactJSON"]);
    var contref =  inputJSON["CONTREF"];
    var contactNo =  inputJSON["CONTACTNO"];

    mycontactdb.getContactById(contactNo, function(err, results){

        if(results.length === 0){
            res.send({"message":"true"});
        }else{
            res.send({"message":"false"});
        }

    })

}

exports.addPrimaryContact = function(req, res){
    var input = req.params.id;
    input = input.toString();

   // To do implementation after clarification.

}

exports.addToDNDRequests = function(req, res){
    var dndJSON = req.body;

   // console.log(dndJSON);

    var inputJSON =   JSON.parse(dndJSON["inputJSON"]);

    // To do implementation after clarification.

    dndDAO.addToDNDRequests(inputJSON,function(err, results) {
       res.send(results);

    })

}

exports.updateDNDStatus = function(req, res){
    var dndJSON = req.body;
    var inputJSON =   JSON.parse(dndJSON["editJson"]);
    dndDAO.updateDNDStatus(inputJSON,function(err, results) {
        res.send(results);

    })

}

exports.getAllDNDrequests = function(req, res){
    var parmas =  req.params.id;
    var inputJSON = {};
    if(parmas != undefined){
        inputJSON["PHONENO"] =  parmas;
    }

    dndDAO.getDNDStatus(inputJSON,function(err, results) {
        res.send(results);

    })

}