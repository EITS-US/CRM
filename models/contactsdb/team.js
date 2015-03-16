var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-config');


var Schema   = mongoose.Schema;

var Teams = new Schema({

    TEAMID:{type: Number, unique : true, required : true, dropDups: true},
    TEAMDESC: {type: String, unique : true, required : true, dropDups: true},
    TEAMEXCELNAME: {type: String}

}, { collection: 'Teams' });


var team = mongoose.model( 'teams', Teams);


var SubTeams = new Schema({

    TEAMID: Number,
    SUBTEAMID: {type: Number, unique : true, required : true},
    SUBTEAMDESC: {type: String, unique : true, required : true},
    TEAMEMPCODE: {type: String, default : 'NA'}

}, { collection: 'SubTeams' });


var subteams = mongoose.model( 'subteams', SubTeams);


var TeamLinks = new Schema({

    LINEID: Number,
    TEAMID : Number,
    USERID : Number,
    TEAMDSGID: Number,
    TEAMDSG: String,
    SUBTEAMID : Number,
    TEAMLINKDESC : String,
    SUBTEAMLINKDESC : String,
    USERLINKDESC : String

}, { collection: 'Teamlinks' });

var teamLinks = mongoose.model( 'teamLinks', TeamLinks);


var Designations = new Schema({

    DESIGNATIONID: Number,
    DESIGNATION: {type: String}

}, { collection: 'Designations' });

var designations = mongoose.model( 'designations', Designations);



exports.getAllTeams = function (id,callback){
    team.find().select({TEAMID : 1, TEAMDESC : 1, '_id':0}).sort('TEAMID').exec(function(err, Team){
        if(err) { console.log(err); callback(true); return; }
        console.log(Team);
        callback(false, Team);
    });

};


exports.getAllSubTeams = function (id,callback){
    subteams.find().select({'_id':0}).sort('SUBTEAMID').exec(function(err, SubTeam){
        if(err) { console.log(err); callback(true); return; }
        console.log(SubTeam);
        callback(false, SubTeam);
    });

};


exports.getSubTeamByTeamId = function (id,callback){
    subteams.find().select({'_id':0}).where({'TEAMID' : id}).exec(function(err, SubTeam){
        if(err) { console.log(err); callback(true); return; }
        console.log(SubTeam);
        callback(false, SubTeam);
    });

};

exports.deleteSubTeamByTeamId = function (id,callback){
    subteams.remove({ SUBTEAMID: id}, function(err, SubTeam){
        if(err) { console.log(err); callback(true); return; }
        callback(false, {message:'Sub-Team deleted'});
    })

};


exports.getTeamByTeamId = function (id,callback){
    team.find().select({'_id':0}).where({'TEAMID' : id}).exec(function(err, SubTeam){
        if(err) { console.log(err); callback(true); return; }
        console.log(SubTeam);
        callback(false, SubTeam);
    });

};

exports.deleteTeamByTeamId = function (id,callback){
    team.remove({ TEAMID: id}, function(err, Team){
        if(err) { console.log(err); callback(true); return; }
        callback(false, {message:'Team deleted'});
    })

};

exports.createTeam = function(inputJSON, callback){

    var teamObj = new team(inputJSON);
    teamObj.save(function (err, newTeam) {
        if(err) { console.log(err); callback(true); return; }
        callback(false, newTeam);

    });

}

exports.createSubTeam = function(inputJSON, callback){

    var teamObj = new subteams(inputJSON);
    teamObj.save(function (err, newSubTeam) {
        if(err) { console.log(err); callback(true); return; }
        callback(false, newSubTeam);

    });

}

exports.getTeamLinks = function(callback){

    teamLinks.find().select({'_id':0}).limit(20).exec(function(err, SubTeam){
        if(err) { console.log(err); callback(true); return; }
        console.log(SubTeam);
        callback(false, SubTeam);
    });



}

exports.getUsersBySubTeamId = function (id,callback){
    teamLinks.find().select({'_id':0, 'LINEID' :0})
        .where({'SUBTEAMID' : id}).exec(function(err, TelebuyUsers){
            if(err) { console.log(err); callback(true); return; }
            callback(false, TelebuyUsers);
        });

}



exports.getUsersDesginations = function (callback){
    designations.find().select({'_id':0, 'DESIGNATION' :1, 'DESIGNATIONID' :1}).exec(function(err, Designations){
            if(err) { console.log(err); callback(true); return; }
            callback(false, Designations);
        });

}

exports.updateUserTeam = function(paramJSON, input, callback){



    teamLinks.findOne(paramJSON,function(err, teamLinks){
        if(err) { console.log(err); callback(true); return; }

        for (prop in input) {
            teamLinks[prop] = input[prop];
        }

        teamLinks.save(function(err, newUser){
            if (err) {
                console.log(err); callback(true); return;
            }
            callback(false, newUser);
        })


    });

}