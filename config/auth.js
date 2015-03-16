var tokenModel = require('./../models/contactsdb/tokenSchema');
var tokenHelper = require('./../helper/tokenHelper');
var userModel = require('./../models/contactsdb/User');




/*
* Middleware to verify the token and store the user data in req._user
*/

/*
* Create a new token, stores it in redis with data during ttl time in seconds
* callback(err, token);
*/

exports.validateToken = function(token, username, callback){

    tokenModel.getTokenByUserId(username, function(err, results){

        if(results != undefined){

        console.log(results.tokenInfo.tokenid + "Server token" + "inside Auth");
        console.log(token  + "Client token");

        if(results.tokenInfo.tokenid == token){
            callback(null, results);
        }else{
            callback(true, null);
        }

        }else{
            callback(true, null);
        }

    })

};

exports.inValidateToken = function(token, data, callback){

    tokenModel.removeToken( data, function(err, results){

        if (err) {
            // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
            callback(true);
            return;
        }
        else{
            callback(null, results);
            return;
        }


    });

};


exports.createAndStoreToken = function(data, callback) {
    userModel.findUserById(data, function(err, user){

        if (err) {
            // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
            callback(true);
            return;
        }

        console.log(user);

if(user != null){



    tokenHelper.createToken(user, function(err, token) {
        if (err){ callback(err); return};

        tokenModel.setTokenWithData(user, token, data, function(err, results) {
            if (err){ callback(err); return};

            if (results) {
                var paramArray = [];
                paramArray.push(results);
                paramArray.push(user);
               callback(null, paramArray);
               return;
           }
            else {
                callback(new Error('Error when saving token'));
                return;
            }
        });
    });

}



    })


};

exports.checkManagerCredential = function(req, res){

    var username   = req.body.username;
    var password   = req.body.password;
    var userObj = {"USERNAME" : username, "PWD" : password};

    userModel.findUserById(userObj, function(err, user){

        if(user != null){
            res.send({message:true});
        }else{
            res.send({message:false});
        }

    })

}