var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');
var eventHelper = require('../../helper/eventHelper');


var Schema   = mongoose.Schema;

var Complaint = new Schema({
    ORDERREF: String,
    COMPLAINTREF: String,
    CALLKEY:String,
    CREATIONDATE : {type : Date, default : Date.now},
    TENTATIVERESOLUTIONDATE : {type : Date},
    ASSIGNEDTO :String,
    SHOWID : String,
    SHOWDESC : String,
    CATEGORY : String,
    TYPE : String,
    PRODDESC : String,
    PRODID : String,
    VARIANTISSUED : String,
    VARIANTID :Number,
    VARIANT : String,
    REQVARIANT : String,
    REQVARIANTID : Number,
    REMARKS : String,
    STATUS : String,
    USERID : Number,
    TEAMID : Number,
    SUBTEAMID : Number,
    TEAMDESC :String,
    SUBTEAMDESC :String,
    PHONENO : String,
    CUSTOMERNAME : String,
    REMINDER : String,
    CONTREF : String,
    ORDERS: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }]


},{collection: 'Complaints'});


var ComplaintEvent = new Schema({

    COMPLAINTREF: String,
    TENTATIVERESOLUTIONDATE : {type : Date},
    ASSIGNEDTO :String,
    SHOWID : String,
    TYPE : String,
    SHOWDESC : String,
    REMARKS : String,
    USERNAME : String,
    STATUS : String,
    REMINDERDESC : String,
    REMINDER : String,
    LASTUPDATEDON : {type : Date, default : Date.now}

},{collection: 'ComplaintEvents'});



var Complaints = mongoose.model('Complaints', Complaint);

var ComplaintEvent = mongoose.model('ComplaintEvent', ComplaintEvent);



exports.createComplaint = function (complaintObj,callback){
    //var complaintOBJ = JSON.parse(complaintObj);
    var complaintOBJ = complaintObj;

    mongoose.connection.db.eval("getNextOrderSequence('complaintref')", function(err, retVal) {


        complaintOBJ["COMPLAINTREF"] =  retVal.toString();
       // var complaintOBJ = complaintObj;

        var complaint = new Complaints(complaintOBJ);


        complaint.save(function (err, complaint, count) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            callback(false, {complaintid : complaint["COMPLAINTREF"]});
            if(err === null){
                eventHelper.auditLogEventListner.emitMethod(complaint, "complaint");
                eventHelper.auditLogEventListner.emitMethod(complaintOBJ, "order");

                complaintOBJ.DISPO[0]["COMPLAINTREF"] = complaintOBJ.COMPLAINTREF;
                eventHelper.auditLogEventListner.emitMethod(complaintOBJ, "call");

            }
        });

    });
};

exports.createEvent = function (paramObj){
    // var eventObj = JSON.parse(paramObj);


    var eventObj = paramObj.toObject();

    delete eventObj["_id"];

    var ce = new ComplaintEvent(eventObj);
    ce.save(function( err, event, count ){
        if(err) {
            console.log(err);
        }

    });
};


exports.getComplaintHistoryById = function (complaintID,callback){

    ComplaintEvent.find({COMPLAINTREF: complaintID}).select({ '_id':0, 'REMARKS' :1, 'STATUS':1, 'LASTUPDATEDON' : 1, 'TYPE' :1}).exec(function(err, complaintHistory){
        if(err) { console.log(err); callback(true); return; }
        callback(false, complaintHistory);
    });
};


exports.getComplaintByRef = function (complaintID,callback){

    /*Complaints.find({COMPLAINTREF: complaintID},function(err, complaint, count ){
        if(err) { console.log(err); callback(true); return; }
        callback(false, complaint);
    });*/

    Complaints.find({COMPLAINTREF: complaintID}).populate('ORDERS', 'STATUS').exec(function(err, complaint){
        if(err) { console.log(err); callback(true); return; }
        callback(false, complaint);
    })

};


exports.getComplaintDetailByRef = function (complaintID,callback){

    Complaints.findOne({COMPLAINTREF: complaintID}).select({'_id':0}).exec(function(err, complaint){
        if(err) { console.log(err); callback(true); return; }
        callback(false, complaint);
    })

};


exports.getComplaintsByCustomer = function (contactid,callback){

    Complaints.find({CONTREF: contactid}).select({ '_id':0, 'COMPLAINTREF' : 1, 'ORDERREF' :1, 'CREATIONDATE' : 1,  'CATEGORY' :1,  'TYPE' : 1, 'STATUS' : 1}).exec(function(err, complaint, count ){
        if(err) { console.log(err); callback(true); return; }
        callback(false, complaint);
    });
};

exports.updateComplaint = function (complaintObj,callback){



        var complaintID = complaintObj.COMPLAINTREF;
        var complaintOBJ = complaintObj;
        var callRecordParam = JSON.parse(complaintObj.calldetails);


        Complaints.findOne({COMPLAINTREF: complaintID}, function (err, complaint) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            for (prop in complaintObj) {
                complaint[prop] = complaintObj[prop];
            }

            complaint.save(function (err) {
                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }
                callback(false, { message: 'Complaint Updated!' });
                if(err === null){
                    callRecordParam.DISPO[0]["COMPLAINTREF"] = complaintObj.COMPLAINTREF;
                    eventHelper.auditLogEventListner.emitMethod(complaint, "complaint");
                    eventHelper.auditLogEventListner.emitMethod(callRecordParam, "call");
                }
            });


        });

};



exports.getComplainDetail = function (input, accessLvl, callback){




    //var id = input.query.Search;
    var inputJSON = JSON.parse(input);

    var query = Complaints.find({}).populate('ORDERS', 'ORDERDATE ORDERSTATUS');

    var reportType = inputJSON.REPORTTYPE;

    var searchType = inputJSON.SEARCHTYPE;




    if(reportType == 'complaint')
    {
        var phone = inputJSON.CALLERNO;
        var dateFrom = inputJSON.DATEFROM;
        //dateFrom = moment(new Date(dateFrom)).format('YYYY-MM-DD 00:00:00 AM');

        var dateTo = inputJSON.DATETO;
        //dateTo = moment(new Date(dateTo)).format('YYYY-MM-DD 11:59:59 PM');

        if(phone != null)
        {
            if( phone  != "undefined"){
                query.where('CALLERNO',phone);
            }

        }

        // query.where('CALLERNO',phone);

        var calltype = inputJSON.CALLTYPE;


        if (searchType === 'P')
        {
            query.where('STATUS','Open');
        }
        if(searchType === 'C')
        {
            query.where('STATUS','Closed');

        }

        if(accessLvl.length > 0){
            query.where(accessLvl[0], accessLvl[1]);
        }

        query.where('CREATIONDATE').gte(new Date(dateFrom)).lte(new Date(dateTo));
        query.sort({'CREATIONDATE':-1});


    }
    else if(reportType == 'callInfo')
    {
        var phone = inputJSON.CALLERNO;

        query.where('CALLERNO',phone);

        var start = new Date();

        start.setMinutes(start.getMinutes() - 1);

        console.log(start);


        query.where('CALLSTARTTIME').lte(start);
        query.limit(10);
        query.sort({'CALLSTARTTIME':-1});


    }
    else if(reportType = 'callback')
    {

        var phone = inputJSON.CALLERNO;
        var dateFrom = inputJSON.DATEFROM;
        //dateFrom = moment(new Date(dateFrom)).format('YYYY-MM-DD 00:00:00 AM');

        var dateTo = inputJSON.DATETO;
        //dateTo = moment(new Date(dateTo)).format('YYYY-MM-DD 11:59:59 PM');



        if(phone != null)
        {
            if( phone  != "undefined"){
                query.where('CALLERNO',phone);
            }

        }


        var sdate =   inputJSON.SEARCHDATE;

        if(sdate === 'callBackDate')
        {

            // query.where('DISPID',16);
            query.where('CALLBACKON').gte(new Date(dateFrom)).lte(new Date(dateTo));
            query.sort({'CALLBACKON':-1});

        }
        else if (sdate === 'callDate')
        {

            query.where('CALLSTARTTIME').gte(new Date(dateFrom)).lte(new Date(dateTo));
            query.sort({'CALLSTARTTIME':-1});
        }




        var cust = inputJSON.CUSTOMERNAME;

        if(cust != null)
        {

            if( cust  != "undefined"){
                query.where('CONTACTNAME',  new RegExp(cust, 'i'));
            }


        }


    }


    //  query.where('LINEID', '123456');

    /* Call.find({ CALLERNO: phone}, function(err, Call){
     if(err) { console.log(err); callback(true); return; }
     console.log(Call);
     console.log(Call);
     callback(false, Call);
     })*/

    query.exec ( function(err, Complaint){
        if(err) { console.log(err); callback(true); return; }
        console.log(Complaint);
        callback(false, Complaint);
    });


};


