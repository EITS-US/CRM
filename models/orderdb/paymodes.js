/**
 * Created by AM015SI on 10/14/2014.
 */



var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');


var Schema   = mongoose.Schema;

var Paymodes = new Schema({

    PAYMODEID: Number,
    PAYMODEDESC: String

}, { collection: 'Paymodes' });

var Paymentoptions = new Schema({

    MODEID: Number,
    MODEDESC: String,
    PARENTID: Number

}, { collection: 'Paymentoptions' });

var Banks = new Schema({

    MODEID: Number,
    MODEDESC: String

}, { collection: 'Banks' });

var Discounts = new Schema({

    DISCTYPE: String,
    DISCID: Number,
    DISPVAL : String,
    DISCDISP : String

}, { collection: 'Discounts' });


var Paymodes = mongoose.model( 'Paymodes', Paymodes);

var Paymentoptions = mongoose.model( 'Paymentoptions', Paymentoptions);

var Banks = mongoose.model( 'Banks', Banks);

var Discounts = mongoose.model('Discounts', Discounts);


exports.getPayModes = function (id,callback){
    Paymodes.find().select({PAYMODEID : 1, PAYMODEDESC : 1, '_id':0}).sort('PAYMODEID').exec(function(err, paymode){
        if(err) { console.log(err); callback(true); return; }
        console.log(paymode);
        callback(false, paymode);
    });

};


exports.getPayModeOptions = function (id,callback){
    Paymentoptions.find().select({MODEID : 1, MODEDESC : 1, PARENTID : 1, '_id':0}).sort('MODEID').exec(function(err, payOption){
        if(err) { console.log(err); callback(true); return; }
        console.log(payOption);
        callback(false, payOption);
    });

};

exports.getPayOptionsByModes = function (id,callback){
    var parentid = parseInt(id);
    Paymentoptions.find({'PARENTID' : parentid}).select({MODEID : 1, MODEDESC : 1, '_id':0}).sort('MODEID').exec(function(err, payOption){
        if(err) { console.log(err); callback(true); return; }
        console.log(payOption);
        callback(false, payOption);
    });

};

exports.getPayOptionsByModes = function (id,callback){
    var parentid = parseInt(id);
    Paymentoptions.find({'PARENTID' : parentid}).select({MODEID : 1, MODEDESC : 1, '_id':0}).sort('MODEID').exec(function(err, payOption){
        if(err) { console.log(err); callback(true); return; }
        console.log(payOption);
        callback(false, payOption);
    });

};

exports.getBanks = function (callback){

    Banks.find().select({BANKID : 1, BANKDESC : 1, '_id':0}).sort('BANKID').exec(function(err, banks){
        if(err) { console.log(err); callback(true); return; }
        console.log(banks);
        callback(false, banks);
    });

};


exports.getDiscounts = function (callback){

    Discounts.find().select({'_id':0}).sort('DISCTYPE').exec(function(err, discounts){
        if(err) { console.log(err); callback(true); return; }
        console.log(discounts);
        callback(false, discounts);
    });

};

exports.createDiscount = function (input, callback){

    var discountParam = input;

    Discounts.find().select({'_id':0, 'DISCID' : 1}).sort({"DISCID" : -1}).limit(1).exec(function(err, discounts) {

        var discId = discounts[0].DISCID;
        if( discId  !== undefined){
            discId = discId + 1;
        }
        discountParam["DISCID"] = discId;
        var newDisccount = new Discounts(discountParam);
        newDisccount.save(function (err, discount, count) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, {discountid: discount.DISCID});
        });

    });

};

exports.deleteDiscount = function(input, callback){
    Discounts.remove({ DISCID: input}, function(err, Order){
        if(err) { console.log(err); callback(true); return; }
        callback(false, {message:'Discount deleted'});
    })
}