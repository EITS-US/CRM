
var userSpec = require("./../models/contactsdb/User");

exports.resolveVisibility = function(actionType, authInfo, subject, callback) {

    var paramObj = new Object();
    paramObj.username = authInfo.username;
    paramObj.subject = subject;

    if(actionType == 'GET'){

        userSpec.getUserPermissionOnSubject(paramObj, function(err, results){

            console.log(results);
            var visibityType = results[0];
            var userInfo = results[1];
            var controlParams = {};

            switch (visibityType) {
                case "viewall":
                    // Blah
                    controlParams["ORDERSTATUS"] = "Show All";
                    break;
                case "viewmine":
                    // Blah
                    controlParams["ORDERSTATUS"] = "Show Only Mine";
                    break;
                case "viewteam":
                    // Blah
                    controlParams["ORDERSTATUS"] = "Show Only my team";
                    break;
            }
            callback(null, controlParams);
        });

    }
    else if(actionType == 'POST'){
        userSpec.postUserPermissionOnSubject(paramObj, function(err, results){
        });
    }

    else if(actionType == 'PUT'){
        userSpec.putUserPermissionOnSubject(paramObj, function(err, results){
        });
    }

    else if(actionType == 'DELETE'){
        userSpec.deleteUserPermissionOnSubject(paramObj, function(err, results){
        });
    }




};