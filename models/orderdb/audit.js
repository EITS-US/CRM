var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');


var Schema   = mongoose.Schema;


var events = new Schema({

        eventType : String,
        eventCreateDate : {type:Date, default:Date.now},
        eventMessage : String,
        eventno : String,
        eventRefNo : String,
        eventCreator : String

},{collection: 'Events'})

var events = mongoose.model( 'events', events );


exports.createEvent = function (paramObj){
   // var eventObj = JSON.parse(paramObj);
    var customEvent = new events(paramObj);
    customEvent.save(function( err, event, count ){
        if(err) {
            console.log(err);
        }

    });
};