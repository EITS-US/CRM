
var EventEmitterVar = require('events').EventEmitter,
    util = require('util')
    audit = require('./../models/orderdb/audit');

var complaintDAO = require('./../models/orderdb/complaint');
var orderDAO = require('./../models/orderdb/orders');
var callDAO = require('./../models/callsdb/call');
var contactDAO = require('./../models/contactsdb/contact');

var daoHolder = new Object();
var auditLogEventListnerClass = function() {

    console.log("The Class Constructor Example");
    daoHolder["complaint"] = complaintDAO;
    daoHolder["order"] = orderDAO;
    daoHolder["call"] = callDAO;
    daoHolder["contact"] = contactDAO;

}

util.inherits(auditLogEventListnerClass, EventEmitterVar);

auditLogEventListnerClass.prototype.emitMethod = function(sourceObj, eventType) {

     console.log('before the emitevent');
     var dataHolder = [];
     dataHolder.push(eventType);
     dataHolder.push(sourceObj);
     this.emit('emittedevent', dataHolder);
     console.log('after the emitevent');

}

var auditLogEventListner = new auditLogEventListnerClass();

auditLogEventListner.on('emittedevent', function(eventParamHolder) {


    daoHolder[eventParamHolder[0]].createEvent(eventParamHolder[1]);
    console.log('We have got the functionality of Event Emitter' + "----------------->" + eventParamHolder);

});

exports.auditLogEventListner = auditLogEventListner;