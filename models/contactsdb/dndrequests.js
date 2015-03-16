var db = require('./mongo-config');

var mongoose = require( './node_modules/mongoose' );

var Schema   = mongoose.Schema;

var DndRequests = new Schema({

    "USERID":String,
    "USERNAME":String,
    "TEAMID":String,
    "TEAMNAME":String,
    "SUBTEAMID":String,
    "SUBTEAMNAME":String,
    "CONTREF":String,
    "CONTNAME":String,
    "PHONENO":String,
    "LANGID":String,
    "LANGDESC":String,
    "DNDREASON":String,
    "DNDREMARKS":String,
    "REQUESTDATE":String,
    "REQUESTSTATUS":String,
    "APPROVEDUSERID":String,
    "APPROVEDUSERDESC":String,
    "APPROVEDDATE":String


}, { collection: 'DndRequests' });

var DndRequests = mongoose.model( 'DndRequests', DndRequests);

exports.addToDNDRequests = function (inputJSON,callback){
    var dndModelObj = new DndRequests(inputJSON);
    var phoneNo = inputJSON["PHONENO"];
    var status = inputJSON["REQUESTSTATUS"];


DndRequests.findOne({PHONENO: phoneNo, REQUESTSTATUS : "P"}, function( err, DndRequests) {

    if(DndRequests instanceof Object){

        var respMsg = {"message": "false"};
        callback(false, respMsg);

    }

    else{

        dndModelObj.save(function (err, dndModelObj) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            var respMsg = {"message": "true"};
            callback(false, respMsg);
        });


    }


});


};



exports.updateDNDStatus = function (inputJSON,callback){
    var dndModelObj = new DndRequests(inputJSON);
    var phoneNo = inputJSON["PHONENO"];
    var status = inputJSON["REQUESTSTATUS"];
    DndRequests.findOne({PHONENO: phoneNo}, function( err, DndRequests){
        if(err) { console.log(err); callback(true); return; }

        DndRequests["REQUESTSTATUS"] = status;

        DndRequests.save(function(err) {
            if (err) {
                console.log(err); callback(true); return;
            }
            var respMsg = {"message" : "Customer information updated"};
            callback(false, respMsg);
        });


    });
};

exports.getDNDStatus = function(inputJSON,callback){
    inputJSON["REQUESTSTATUS"] = "P";
    DndRequests.find(inputJSON).select({ '_id':0, '__v':0}).exec( function(err, DndRequests){

        if(err) { console.log(err); callback(true); return; }

        callback(false, DndRequests);

    });
}


