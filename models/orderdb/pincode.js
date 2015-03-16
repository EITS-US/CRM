/**
 * Created by Kunal on 9/16/2014.
 */

//var mongoose = require( './../database/node_modules/mongoose/index');

var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');

var Schema   = mongoose.Schema;


var Pincode = new Schema({
    officename: String,
    pincode: Number,
    officeType: String,
    Deliverystatus: String,
    divisionname : String,
    regionname : String,
    circlename : String,
    Taluk : String,
    Districtname : String,
    statename : String
},{ collection: 'Pincodes' });

var Pincode = mongoose.model( 'Pincodes', Pincode);

exports.getPinCodeById = function (id,callback){
    Pincode.find({ pincode: id}, function(err, Pincode){
        if(err) { console.log(err); callback(true); return; }
        console.log(Pincode);
        callback(false, Pincode);
    })
    console.log("Kunal Done");
};



exports.getAllCity = function (id,callback){
    Pincode.find({}).distinct('Districtname').exec(function(err, Pincode){
        if(err) { console.log(err); callback(true); return; }
        console.log(Pincode);
        callback(false, Pincode);
    })
    //console.log("Kunal Done");
};

