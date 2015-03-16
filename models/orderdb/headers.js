var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');

var Schema   = mongoose.Schema;


var looklines = new Schema({

    HDRID: Number,
    LINEDESC: String,
    LOOKID: String

},{ collection: 'Looklines' });


var Lines = mongoose.model( 'looklines', looklines);


var languages = new Schema({

    HDRID: Number,
    LINEDESC: String,
    LOOKID: String

},{ collection: 'Languages' });


var TelebuyLanguages = mongoose.model( 'languages', languages);



exports.getNonSaleCallsReasons = function (callback){
    Lines.find({HDRID:36}).select({HDRID : 1, LINEDESC : 1,LOOKID:1, '_id':0}).sort('HDRID').exec(function(err, Lines){
        if(err) { console.log(err); callback(true); return; }
        console.log(Lines);
        callback(false, Lines);
    });
};

exports.getNotIntReasons = function (callback){
    Lines.find({HDRID:37}).select({HDRID : 1, LINEDESC : 1,LOOKID:1, '_id':0}).sort('HDRID').exec(function(err, Lines){
        if(err) { console.log(err); callback(true); return; }
        console.log(Lines);
        callback(false, Lines);
    });
};

exports.getGenInqReasons = function (callback){
    Lines.find({HDRID:39}).select({HDRID : 1, LINEDESC : 1, LOOKID:1, '_id':0}).sort('HDRID').exec(function(err, Lines){
        if(err) { console.log(err); callback(true); return; }
        console.log(Lines);
        callback(false, Lines);
    });
};

exports.getCallBackReasons = function (callback){
    Lines.find({HDRID:17}).select({HDRID : 1, LINEDESC : 1,LOOKID:1, '_id':0}).sort('HDRID').exec(function(err, Lines){
        if(err) { console.log(err); callback(true); return; }
        console.log(Lines);
        callback(false, Lines);
    });
};


exports.getComplaintReasons = function (compType, callback){
    Lines.find(compType).select({HDRID : 1, LINEDESC : 1,LOOKID:1, '_id':0}).sort('HDRID').exec(function(err, Lines){
        if(err) { console.log(err); callback(true); return; }
        console.log(Lines);
        callback(false, Lines);
    });
};


exports.getLanguages = function(callback){

    TelebuyLanguages.find({}).select({'_id':0}).exec( function(err, Language){
        if(err) { console.log(err); callback(true); return; }
        console.log(Language);
        callback(false, Language);
    })

}

exports.getOnHoldReasons = function (callback){
    Lines.find({HDRID:20}).select({HDRID : 1, LINEDESC : 1,LOOKID:1, '_id':0}).sort('HDRID').exec(function(err, Lines){
        if(err) { console.log(err); callback(true); return; }
        console.log(Lines);
        callback(false, Lines);
    });
};