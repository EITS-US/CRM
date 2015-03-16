/**
 * Created by AMIT SINGH on 9/24/2014.
 */

var mongoose = require( './node_modules/mongoose' );

var db = require('./mongo-config');


var TIME_TO_LIVE = 60*60*24; //24 hours

var Schema = mongoose.Schema;

var TokenSchema = new Schema({
    USERNAME: String,
    tokenInfo: {
        tokenid : String,
        USERID  : String,
        role :String
    },
    createdAt: { type: Date,  default: Date.now}
});

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: TIME_TO_LIVE });



exports.setTokenWithData = function(userobj, token, data, callback) {

    var tokenInfo = {'tokenid' : token, 'USERID' : userobj.USERID};

    var tokenModel = mongoose.model( 'tokenSchema', TokenSchema );

    console.log(data);
    var tokenRow = new tokenModel();

    tokenRow.USERNAME = data.USERNAME;
    tokenRow.tokenInfo = tokenInfo;

    tokenRow.save(function(err, results, count) {

       if(err) {
           console.log(err); callback(true); return;
       }

        console.log(results);

        var resultObj = {'tokenid' :  results.tokenInfo.tokenid, 'USERID' : results.tokenInfo.USERID};

        callback(false, resultObj);
        return;


    });



};

exports.removeToken = function(data, callback) {

    var tokenModel = mongoose.model( 'tokenSchema', TokenSchema );
    var tokenRow = new tokenModel();
    var tokenObj = "";
    tokenModel.remove({USERNAME: data}, function(err, count){
        if(err){
            return;
        }
        console.log("document removed");
        callback(null, count);
        return;
    });

};


exports.getTokenByUserId = function(data, callback) {

    var tokenModel = mongoose.model( 'tokenSchema', TokenSchema );

    var tokenRow = new tokenModel();
    var tokenObj = "";

    tokenModel.findOne({USERNAME: data}, function(err, result){

        if(err){console.log(err); callback(true); return;}
        if(result != null){

            tokenObj = result;
            console.log("inside token Schema" + tokenObj);

            callback(false, tokenObj);
            return;

        }else {callback(true); return;}


    });


};



