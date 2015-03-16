var userDB = require('./../models/contactsdb/User');
var teamDB = require('./../models/contactsdb/team');


exports.createUser = function(req, res){
    //var input = JSON.parse(JSON.stringify(req.body));
    // var input = req.body;

    var username = req.body.username;
    var password = req.body.password;
    var userid = req.body.userid;
    var fullName = req.body.fullName;
    var designation = req.body.designation;
    var designationid = req.body.designationid;
    var emailId = req.body.emailid;
    var teamid = req.body.teamid;
    var teamdesc = req.body.teamdesc;
    var subteamid = req.body.subteamid;
    var subteamdesc = req.body.subteamdesc;
    var department = req.body.department;
    var departmentid = req.body.departmentid;
    var showroomid = req.body.showroomid;
    var showroomdesc = req.body.showroomdesc;
    var mobileNumber = req.body.mobileNumber;
    var userRole = req.body.userRole;

    var userObj = {
        USERNAME:username.toUpperCase(),
        PASSWORD:password,
        USERID: userid,
        FULLNAME: fullName,
        DESIGNATION: designation,
        DESIGNATIONID: designationid,
        EMAILID : emailId,
        TEAMID : teamid,
        TEAMDESC : teamdesc,
        SUBTEAMID : subteamid,
        SUBTEAMDESC:subteamdesc,
        DEPTID:departmentid,
        DEPTDESC:department,
        SHOWROOMID :showroomid,
        SHOWROOMDESC : showroomdesc,
        MOBILENO : mobileNumber,
        ROLE : userRole

    };

    userDB.createUser(userObj, function(err, results) {
        res.send(results);
    });
}


exports.assignRoleToUser = function(req, res){
    //var input = JSON.parse(JSON.stringify(req.body));
    // var input = req.body;

    var username = req.body.USERNAME;
    var role = req.body.role;

    var roleObj = {USERNAME : username, role : role};

    userDB.assignRoleToUser(roleObj, function(err, results) {
        if(err === null)
        res.send({msg:'sucess', detail: "Role Assigned"});
        else
            res.send({msg:'fail', detail: "User Not Found"});
    });
}

exports.createPermission = function(req, res){

        var params = req.body.data;
        var role = req.body.role;
        console.log(params);

    userDB.createPermissionsOnSubject(params,role, function(err, results) {
        if(err == null)
            res.send(results);
        else
            res.send("Error encountered");
    });
}

exports.getAllTeams = function(req, res){

    teamDB.getAllTeams(req,function(err, results) {
        res.send(results);
    });

}

exports.getAllSubTeams = function(req, res){

    teamDB.getAllSubTeams(req,function(err, results) {
        res.send(results);
    });

}

exports.getTeamById = function(req, res){
    var teamId = req.params.id;
    teamDB.getTeamByTeamId(teamId,function(err, results) {
        res.send(results);
    });

}

exports.deleteTeamById = function(req, res){
    var teamId = req.params.id;
    teamDB.deleteTeamByTeamId(teamId,function(err, results) {
        res.send(results);
    });

}

exports.getSubTeamByTeamId = function(req, res){
    var teamId = req.params.id;
    teamDB.getSubTeamByTeamId(teamId,function(err, results) {
        res.send(results);
    });

}

exports.deleteSubTeamByTeamId = function(req, res){
    var subteamId = req.params.id;
    teamDB.deleteSubTeamByTeamId(subteamId,function(err, results) {
        res.send(results);
    });

}

exports.getUsersBySubTeamId = function(req, res){
    var teamId = req.params.id;
    teamDB.getUsersBySubTeamId(teamId,function(err, results) {
        res.send(results);
    });

}

exports.getAllUsers = function(req, res){

    userDB.getAllUsers(function(err, results) {
        res.send(results);
    });

}

exports.createTeam = function(req, res){


    var inputParamBody  = req.body;
    var inputJSON=   JSON.parse(inputParamBody["teamJson"]);

    teamDB.createTeam(inputJSON, function(err, results) {
        res.send(results);
    });

}

exports.createSubTeam = function(req, res){


    var inputParamBody  = req.body;
    var inputJSON=   JSON.parse(inputParamBody["subTeamJson"]);

    teamDB.createSubTeam(inputJSON, function(err, results) {
        res.send(results);
    });

}


exports.getDesignations = function(req, res){

    teamDB.getUsersDesginations(function(err, results) {
        res.send(results);
    });

}


exports.updateUserTeam = function(req, res){


    var inputParamBody  = req.body;
    var inputJSON =   JSON.parse(inputParamBody["userJson"]);
    var key = req.body.SEARCHKEY;
    var val = req.body.SEARCHVAL;

    var searchParamJSON = {};
    searchParamJSON[key] = val;

    teamDB.updateUserTeam(searchParamJSON, inputJSON, function(err, results) {

        res.send(results);
    });
    var userJSON = {};
    userJSON["TEAMID"] = inputJSON["TEAMID"];
    userJSON["SUBTEAMID"] = inputJSON["SUBTEAMID"];
    userJSON["TEAMDESC"] = inputJSON["TEAMLINKDESC"];
    userJSON["SUBTEAMDESC"] = inputJSON["SUBTEAMLINKDESC"];
    userDB.updateUserTeam(searchParamJSON, userJSON, function(err, results){
        console.log(results)
    });

}


exports.getTeamLinks = function(req, res){
    teamDB.getTeamLinks(function(err, results) {
        res.send(results);
    });

}