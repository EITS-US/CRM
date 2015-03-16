var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');


var Schema   = mongoose.Schema;

var Teams = new Schema({

    TEAMID: Number,
    TEAMDESC: String

}, { collection: 'Teams' });


var team = mongoose.model( 'teams', Teams);

exports.getAllTeams = function (id,callback){
    team.find().select({TEAMID : 1, TEAMDESC : 1, '_id':0}).sort('TEAMID').exec(function(err, Team){
        if(err) { console.log(err); callback(true); return; }
        console.log(Team);
        callback(false, Team);
    });

};