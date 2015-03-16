/**
 * Created by kunalkrishna on 10/29/14.
 */

var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');
var eventHelper = require('../../helper/eventHelper');

var Schema   = mongoose.Schema;


var Delvboys = new Schema({
    COMPID: Number,
    DLVBOYID: Number,
    DLVBOYNAME: String

},{ collection: 'Delvboys' });

var Delvboys = mongoose.model( 'Delvboys', Delvboys );


var Franchisees = new Schema({
    FRID : Number,
    FRDESC: String
},{collection: 'Franchisees'});


var Franchisees = mongoose.model('Franchisees',Franchisees);




var Showrooms = new Schema({
    SHOWID : Number,
    SHOWDESC: String
},{collection: 'Showrooms'});


var Showrooms = mongoose.model('Showrooms',Showrooms);


exports.getCourierByID = function (id,callback){
    console.log(id);
    Delvboys.find({ COMPID: id}).select({_id:0, DLVBOYNAME: 1, DLVBOYID: 1}).exec(function(err, Delvboys){
        if(err) { console.log(err); callback(true); return; }
        console.log(Delvboys);
        callback(false, Delvboys);
    });
};



exports.getAllFranchisees = function (id,callback){
    //console.log(id);
    Franchisees.find({}).select({_id:0, FRID: 1, FRDESC: 1}).exec(function(err, Franchisees){
        if(err) { console.log(err); callback(true); return; }
        console.log(Franchisees);
        callback(false, Franchisees);
    });
};



exports.getAllShowrooms = function (id,callback){
    //console.log(id);
    Showrooms.find({}).select({_id:0, SHOWID: 1, SHOWDESC: 1}).exec(function(err, Showrooms){
        if(err) { console.log(err); callback(true); return; }
        console.log(Showrooms);
        callback(false, Showrooms);
    });
};


