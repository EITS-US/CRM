
var mongoose = require( './node_modules/mongoose' );

var db = require('./mongo-config')
, rbac = require('./mongoose-rbac');

var Permission = rbac.Permission;
var Role = rbac.Role;

var Schema   = mongoose.Schema;
var UserSchema = mongoose.Schema({

    CREATEDDT: { type: Date, default: new Date() },
    USERNAME: String,
    PASSWORD: {type : String, default : 'password'},
    USERID: {type : String},
    FULLNAME : {type : String},
    DESIGNATION : {type : String},
    EMAILID : {type : String},
    STATUS: { type: String, default: "A" },
    TEAMID : {type : String},
    TEAMDESC : {type : String},
    SUBTEAMID : {type : String},
    SUBTEAMDESC : {type : String},
    DEPTID : Number,
    DEPTDESC : String,
    SHOWROOMID : Number,
    SHOWROOMDESC : String,
    DESIGNATIONID : Number,
    MOBILENO : String

}, { collection: 'users' });

UserSchema.plugin(rbac.plugin);
var UserModel = mongoose.model( 'User', UserSchema);


var TelebuyUserSchema = mongoose.Schema({

    USERID: Number,
    USERNAME : String,
    PASSWORD: String,
    FullName : String,
    SHOWROOMID : Number,
    SHOWROOMDESC : String,
    DESIGNATIONID : Number,
    DESIGNATION : String,
    DEPTID : Number,
    DEPTDESC : String,
    EMAIL :String,
    ISACTIVE : String,
    EMPLOYEECODE :String,
    LASTLOGIN : { type: Date, default: new Date() },
    ISLOGGEDIN : String,
    LOGINCNT : Number,
    LASTLOGOUT : { type: Date, default: new Date() },
    ISLOCKED : String,
    DLV_BOY_ID : Number,
    TEAMID :     Number,
    TEAMDESC : String,
    SUBTEAMID : Number,
    MOBILENO : String,
    SUBTEAMDESC : String

}, { collection: 'TelebuyUsers' });


var TelebuyUserModel = mongoose.model( 'TelebuyUser', TelebuyUserSchema);




exports.createUser = function (userObj,callback){
    var userdb = new UserModel(userObj);
    UserModel.findOne({USERNAME: userObj.USERNAME}, function(err, user) {

    if(user === null){
        userdb.save(function (err, User) {
            if (err) {
                console.log(err);
                callback(true, {msg:'fail'});
                return;
            }

            User.addRole(userObj.ROLE, function (err) {

                callback(false, {msg:'success'});
            });
        });
    }else{
        callback(true, {msg:'fail'});
    }

    });
};


exports.findUserById = function(userObj,callback){

    UserModel.findOne({USERNAME: userObj.USERNAME}, function(err, user) {
        if(user != null){
        if (err) {
            // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
            console.log(err); callback(true); return;
        }else {
            var passwd = userObj.PWD;
            if(passwd ==  user.PASSWORD){
                var respUserObj = {};
                console.log(require('util').inspect(user.roles[0]));
                var roleid = require('util').inspect(user.roles[0]);
                respUserObj= {USERNAME : user.USERNAME, USERID : user.USERID, TEAMID : user.TEAMID,
                    TEAMDESC : user.TEAMDESC, EMAILID : user.EMAILID, DESIGNATION : user.DESIGNATION,
                    DEPARTMENT : user.DEPTDESC, SUBTEAMID : user.SUBTEAMID, SUBTEAMDESC : user.SUBTEAMDESC, SHOWID:user.SHOWROOMID, SHOWDESC : user.SHOWROOMDESC};

                Role.findOne({_id: roleid}, function(err, role) {
                    console.log(role);
                    respUserObj["ROLE"] = role.name;
                    callback(false, respUserObj);
                })


            }

            else callback(true, null);
        }
        }else{
            callback(true, null);
        }
    })

};



exports.getUserPermissionOnSubject = function(params, callback){

    if (params.username !== undefined) {

    var viewTypeArray = ['USERID', 'ALL', 'TEAMID', 'SUBTEAMID', 'AUTHBYID'];

    UserModel.findOne({USERNAME: params.username}, function(err, user) {

        viewTypeArray.forEach(function(item) { /* etc etc */
            user.can(item, params.subject, function (err, can) {
                if (can) {

                    var paramArray = [];
                    //paramArray[item] = user[item];


                    if(item.toUpperCase() !== 'ALL'){
                        paramArray.push(item.toUpperCase());
                        paramArray.push(user[item]);
                    }
                    callback(null, paramArray);
                }
                else {
                    // insufficient privileges
                }
            });
        });
    });

    }
    else{
        callback(null, "not required");
    }

};



exports.postUserPermissionOnSubject = function(params, callback){

    UserModel.findOne({USERNAME: params.USERNAME}, function(err, user) {
        user.can('create', params.subject, function (err, can) {
        });
    })

};

exports.putUserPermissionOnSubject = function(params, callback){
    UserModel.findOne({USERNAME: params.USERNAME}, function(err, user) {
        user.can('update', params.subject, function (err, can) {
        });
    })
};

exports.deleteUserPermissionOnSubject = function(params, callback){
    UserModel.findOne({USERNAME: params.USERNAME}, function(err, user) {
        user.can('delete', params.subject, function (err, can) {

        });
    })
};

exports.assignRoleToUser = function(params, callback){
    UserModel.findOne({USERNAME: params.USERNAME}, function(err, user) {
      if(user === null || user === undefined){
          callback("failed");
      }
      else  if(err){
            callback("failed");
        }
     else{
          user.roles.splice(0,1);
          user.addRole(params.role, function () {
              console.log(require('util').inspect(user.roles[0]));
              callback(null, "Executed");
          });

      }


    })
};


exports.createPermissionsOnSubject = function (permissionArray, roleParam,  callback) {

    //var permissions = permissionArray;
     var permissions = JSON.parse(permissionArray);
    console.log(permissions);
    /*var permissions = [
        { subject: 'Order', action: 'create' }
    ];*/

    Permission.create(permissions, function (err) {
        console.log(permissions);
        var perms = Array.prototype.slice.call(arguments, 1);

        Role.findOne({name: roleParam}, function(err, role) {

            if(role == null){

                var newRole = new Role({name : roleParam});
                newRole.permissions = perms;
                newRole.save(function (err, role) {
                    callback(null, newRole);
                });

            }
            else{

                role.permissions[role.permissions.length] = perms;
                role.save(function (err, role) {
                    callback(null, role);
                });

            }
        })

    });

}



/*exports.getUsersBySubTeamId = function (id,callback){
    TelebuyUserModel.find().select({'_id':0, USERNAME:1, FULLNAME: 1,
        DESIGNATION:1, DEPTDESC:1, DEPTID:1, DEPTDESC:1, TEAMID:1, TEAMDESC:1, SUBTEAMID:1, SUBTEAMDESC:1})
        .where({'SUBTEAMID' : id}).exec(function(err, TelebuyUsers){
        if(err) { console.log(err); callback(true); return; }
        callback(false, TelebuyUsers);
    });

};*/

/*exports.getAllUsers = function (callback){
    TelebuyUserModel.find().select({'_id':0, USERNAME:1, FULLNAME: 1,
        DESIGNATION:1, DEPTDESC:1, DEPTID:1, DEPTDESC:1, TEAMID:1, TEAMDESC:1, SUBTEAMID:1, SUBTEAMDESC:1}).limit(20)
        .exec(function(err, TelebuyUsers){
            if(err) { console.log(err); callback(true); return; }
            callback(false, TelebuyUsers);
        });

};*/


exports.getAllUsers = function (callback){
    UserModel.find().select({'_id':0 })
        .exec(function(err, UserModel){
            if(err) { console.log(err); callback(true); return; }
            callback(false, UserModel);
        });

};

exports.updateUserTeam = function(paramJSON, input, callback){



        TelebuyUserModel.findOne(paramJSON,function(err, TelebuyUsers){
            if(err) { console.log(err); callback(true); return; }
            else if(TelebuyUsers === null || TelebuyUsers === undefined){
                console.log(err); callback(true); return;
            }
            else{
                for (prop in input) {

                    TelebuyUsers[prop] = input[prop];
                }

                TelebuyUsers.save(function(err, newUser){
                    if (err) {
                        console.log(err); callback(true); return;
                    }
                    callback(false, newUser);
                })
            }



        });

}

