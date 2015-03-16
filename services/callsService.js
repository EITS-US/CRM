var mycalldb = require('../models/callsdb/call');
var userDB = require('./../models/contactsdb/User');


exports.getCallDetail = function(req, res){

    var accessParams = {};
    var inputParams = req.query.Search;
    var inputJSON = JSON.parse(inputParams);
    accessParams['username'] = inputJSON.USERNAME;
    switch(inputJSON.REPORTTYPE) {
        case "advanceBooking":
            accessParams["subject"] = "Advancebooking";
            break;
        case "calls":
            accessParams["subject"] = "Call";
            break;
        default:

    }


        userDB.getUserPermissionOnSubject(accessParams, function(err, accessLvl){
            mycalldb.getCallDetail(inputJSON, accessLvl, function(err, results) {
                res.send(results);
            });
        });





}

exports.getCallDetailByContref = function(req, res){

    // console.log( req.params.id);
    var input = req.params.id;
    var inputJSON = {};
    inputJSON["CONTREF"] = input;

    mycalldb.getCallDetailByContref(inputJSON,function(err, results) {
        res.send(results);
    });

}


exports.getCallKeyNextSeq = function(req, res){

    // console.log( req.params.id);
    // var input = req.params.id;

    //console.log( req.params.id);
    var input = req.params.id;
   // input = input.toString();

    mycalldb.getCallKeyNextSeq(input,function(err, results) {
        //var retkey = '{"CALLKEY": '+ results + ',"CALLERNO": '+input+'}';

        var retkey = {};
        retkey["CALLKEY"] = results;
        retkey["CALLERNO"] = input;

        var callkey = results;
        //var startcall = new Date();


        mycalldb.createCallLine(retkey,function(err,result) {
            res.send(retkey);

        });

      //  res.send(results);
    });

}


exports.putCallUpdate = function(req, res) {

    // console.log( req.params.id);
    var input = req.body.inputJSON;
    var callJSON = JSON.parse(input);

    console.log(req);

    mycalldb.putCallUpdate(callJSON, function (err, results) {
      //if (err) { return next(err); }
        res.send(results);
    });
}

exports.getCallDispositionDetails = function(req, res) {
    var input = req.params.id;
    mycalldb.getCallDispositionDetail(input, function (err, results) {
        res.send(results);
    })
}


exports.updateCallClose = function(req, res) {
    var input = req.params.id;
    mycalldb.updateCallClose(input, function (err, results) {
        res.send(results);
    })
}