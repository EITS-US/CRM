/**
 * Created by Kunal on 9/16/2014.
 */

var db = require('./mongo-config');

var mongoose = require( './node_modules/mongoose' );

var codafBroker = require('../../helper/codafBroker');

var Schema   = mongoose.Schema;


var Contact = new Schema({
    Email: Array,
    ContactDetails:{},
    BALANCEDUE:Number,
    CITYID:Number,
    STATEID:Number,
    CONTID:Number,
    CONTLANGDESC:String,
    CONTLANGID:Number,
    CONTNAME:String,
    CONTREF:String,
    CONTSTAT:String,
    CONTTYPE:String,
    COUNTRYID:Number,
    CREATION_DATE:Date,
    CREDITCARD:String,
    DNDSTATUS:String,
    GENDER:String,
    LAST_UPDATE_DATE:Date,
    MEDIADESC:String,
    MEDIAID:Number,
    STATEDESC:String,
    SYNCHED_WITH_BYD:Number,
    TITLE:String,
    UNIQUEID:Number,
    PRIMARYCONTACT:String,
    CONTACTNO:Array,
    ACTIVECONTACT : Array,
    INVALIDCONTACT : Array,
    INACTIVE :Array

}, { collection: 'Contacts' });

var Contact = mongoose.model( 'Contacts', Contact);

exports.getContactById = function (id,callback){
    Contact.find({  $or: [ { "PRIMARYCONTACT": id }, {"ACTIVECONTACT": id} ]}).sort({"LAST_UPDATE_DATE":1}).limit(1).exec( function(err, Contact){
        if(err) { console.log(err); callback(true); return; }

        callback(false, Contact);
    })

};


exports.getContactByContactNo = function (id,callback){
    Contact.findOne({"PRIMARYCONTACT": id}).exec( function(err, Contact){
        if(err) { console.log(err); callback(true); return; }
        //console.log(Contact);
        callback(false, Contact);
    })
   // console.log("Kunal Done");
};


exports.createContact = function (contact,callback){
    var contactLineOBJ = JSON.parse(contact.body.customerJSON);
   /* var phoneNo = {};
    phoneNo["PHONENO"] = contactLineOBJ["PRIMARYCONTACT"].toString();
    phoneNo["TYPE"] = "PRIMARY";
    contactLineOBJ["CONTACTNO"].push(phoneNo);*/

    var contactLine = new Contact(contactLineOBJ);

    mongoose.connection.db.eval("getNextSequenceCustomerKey('contref')", function(err, retVal) {

        contactLine["CONTREF"] =  retVal.toString();

        mongoose.connection.db.eval("getNextSequenceCustomerKey('contid')", function(err, retValue) {

            contactLine["CONTID"] =  retValue;


            contactLine.save(function( err, Contact, count ){
                if(err) { console.log(err); callback(true); return; }
                callback(false, Contact);

                    codafBroker.CreateContactInCODAF("CREATECONTACT", JSON.stringify(contactLine));

            });

            console.log("Contact Created");


        });

    });



};

exports.createEvent = function (inputJSON,callback){

    this.putContactUpdate(inputJSON, function(){
        console.log(inputJSON);
    })

};

exports.putContactUpdate = function (inputJSON,callback){


    var cust = new Contact(inputJSON);
    var id = cust.CONTREF;
    Contact.findOne({CONTREF: id}, function(err, Contact){
        if(err) { console.log(err); callback(true); return; }

        for (prop in inputJSON) {
            Contact[prop] = inputJSON[prop];
        }
        console.log("CONTACT--->"+ Contact);
        Contact.save(function(err) {
            if (err) {
                console.log(err); callback(true); return;
            }
            callback(false, { message: 'Contact updated!' });
            if(err === null){
                codafBroker.CreateContactInCODAF("UPDATECONTACT", JSON.stringify(inputJSON));
            }
        });
    })
};

exports.getContactByContref = function (id,callback){
    Contact.findOne({CONTREF: id}, function(err, Contact){
        if(err) { console.log(err); callback(true); return; }
        console.log(Contact);
        callback(false, Contact);
    })

};
