var mongoose = require('./node_modules/mongoose' );
var moment = require('moment');
//var objectMerge = require('object-merge');
var db = require('./mongo-config');
var codafBroker = require('../../helper/codafBroker');
var complaintService = require('../../services/complaintService');

var Schema   = mongoose.Schema;


var Call = new Schema({
    LINEID : String,
    CALLKEY : String,
    CALLERNO :String,
    CALLEDNO : String,
    CALLSTARTTIME : { type: Date, default: Date.now },
    CALLENDTIME : Date,
    DURATION : Number,
    CALLTYPE : String,
    CALLDESC : String,
    CONTREF : String,
    CONTACTNAME: String,
    LINKID : String,
    DISPID : Number,
    DISPDESC : String,
    LOOKID: Number,
    DISPO: Array,
    // PRODUCTS: Array,
    //PRODID : String,
    //PRODDESC : String,
    SIZEID : String,
    SIZEDESC : String,
    USERID : String,
    USERDESC : String,
    MEDIAID : String,
    MEDIADESC : String,
    LANGID : String,
    LANGDESC : String,
    LINESTATUS : String,
    CALLSTATUS : String,
    REMARKS : String,
    PARENTKEY : String,
    SHOWID : String,
    SHOWDESC : String,
    CALLBACKON : Date,
    CALLBACKTYPE : String,
    COMPCATEGORYID : String,
    COMPLAINTTYPEID : String,
    COMPLAINTTYPEDESC : String,
    COMPLAINTREASON : String,
    COMPLAINTNO : String,
    CLOSEDBYID : String,
    CLOSEDBYDESC : String,
    VISITSHOWROOMID : String,
    VISITSHOWROOMDESC : String,
    VISITINGON : String,
    REQUESTORDERREF : String,
    TRANSFERREDUSERID : String,
    TRANSFERREDUSERDESC : String,
    ESCALATIONTYPE : String,
    OFFERFLAG : String,
    ORDERID : String,
    ACTUALEXT : String,
    CONTACTNAME : String,
    DOWNLOADSTATUS : String,
    TRANSFERID : String,
    TRANSFERDESC : String,
    TEAMID : String,
    TEAMDESC : String,
    SUBTEAMID : String,
    SUBTEAMDESC : String,
    CALLORGINALSTARTTIME : String,
    CALLORGINALENDTIME : String,
    PUSHLEAD : String,
    CALLID : String,
    BYD_ID : String,
    SYNCHED_WITH_BYD : String,
    BYDNOTES : String,
    CHANGE_STATE_ID : String,
    LAST_UPDATE_DATE : String,
    COMPLAINTDESC : String,
    CAMPAIGNNAME : String,
    OFFERPRICE : String,
    LEADID : String,
    SPECIALREQUEST : String,
    SPECIALREQUESTID : String,
    SPECIALREQUESTDESC : String,
    REMARKSID : String,
    REMARKSDETAIL : String,
    CLOSEDDATE : String,
    GENDER : String,
    CALLSOURCE :String

}, { collection: 'CallRecordLines' });

var Call = mongoose.model( 'CallRecordLines', Call);

exports.getCallDetail = function (inputJSON, accessLvl, callback){


   /* var id = input.query.Search;
    var inputJSON = JSON.parse(id);*/

    var query = Call.find({});

    var reportType = inputJSON.REPORTTYPE;




    if(reportType == 'calls')
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


        if (calltype === 'current')
        {
            query.where('CALLSTARTTIME').gte(dateFrom).lte(dateTo);


        }

        else if (calltype === 'advance')
        {
            query.where('DISPID',16);
            query.where('CALLBACKON').gte(new Date(dateFrom)).lte(new Date(dateTo));
        }

        if(accessLvl.length > 0){
            query.where(accessLvl[0], accessLvl[1]);
        }
        query.sort({'CALLSTARTTIME':-1});

    }
    else if(reportType === "CUSTTODAYCALL"){

        var callKey = inputJSON.CONTREF;
        var today = new Date();
        today.setDate(today.getDate());
        today.setHours(00, 00, 00);
        //var start = moment(new Date()).format('YYYY-MM-DD');

        query.where('CONTREF',callKey);
        query.where('CALLSTARTTIME').gte(today);
        query.sort({'CALLSTARTTIME':-1});

    }
    else if(reportType == 'callInfo')
    {
        var phone = inputJSON.CALLERNO;

        query.where('CALLERNO',phone);

        var start = new Date();

        //query.where('CALLSTARTTIME').lte(start);
        query.limit(50);
        query.sort({'CALLSTARTTIME':-1});


    }
    else if(reportType === 'callback')
    {

        var phone = inputJSON.CALLERNO;
        var dateFrom = inputJSON.DATEFROM;
        //dateFrom = moment(new Date(dateFrom)).format('YYYY-MM-DD 00:00:00 AM');

        var dateTo = inputJSON.DATETO;
        //dateTo = moment(new Date(dateTo)).format('YYYY-MM-DD 11:59:59 PM');

    //    query.where({$or : [{'DISPID': 1}, {'DISPID': 16}]});

        query.where('DISPID',1);

        if(phone != null)
        {
            if( phone  != "undefined"){
                query.where('CALLERNO',phone);
            }

        }

        var stype = inputJSON.SEARCHTYPE;

        if(stype === 'pending')
        {
            query.where({$or : [{'CALLSTATUS': 'O'}, {'CALLSTATUS':'Open'}]});
        }
        else if(stype === 'completed')
        {
            query.where({$or : [{'CALLSTATUS': 'C'}, {'CALLSTATUS':'Closed'}]});
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
    else if (reportType === 'advanceBooking')
    {


        var dateFrom = inputJSON.DATEFROM;
        var dateTo = inputJSON.DATETO;
        var sdate =   inputJSON.SEARCHDATE;



        if(sdate === 'callBackDate')
        {


            query.where('DISPID',16);
            if(accessLvl.length > 0){
                query.where(accessLvl[0], accessLvl[1]);
            }
            query.where('CALLBACKON').gte(new Date(dateFrom)).lte(new Date(dateTo));
            query.sort({'CALLBACKON':-1});

        }
        else if (sdate === 'callDate')
        {

            query.where('DISPID',16);

            query.where('CALLSTARTTIME').gte(new Date(dateFrom)).lte(new Date(dateTo));
            if(accessLvl.length > 0){
                query.where(accessLvl[0], accessLvl[1]);
            }
            query.sort({'CALLSTARTTIME':-1});
        }


    }


    //  query.where('LINEID', '123456');

    /* Call.find({ CALLERNO: phone}, function(err, Call){
     if(err) { console.log(err); callback(true); return; }
     console.log(Call);
     console.log(Call);
     callback(false, Call);
     })*/

    query.exec ( function(err, Call){
        if(err) { console.log(err); callback(true); return; }
       if(Call.length > 0 && Call[0].CALLENDTIME === undefined){
           Call.splice(0,1);
       }

        callback(false, Call);
    });




};


exports.getCallKeyNextSeq = function(input, callback){

    mongoose.connection.db.eval("getNextSequenceCallKey('custref')", function(err, retVal) {

        if(err) { console.log(err); callback(true); return; }
        var retString = retVal.toString();
        callback(null, retString);

    });


};


exports.createCallLine = function (callKey,callback){

       var callLineOBJ = callKey;
       callLineOBJ["CALLSTARTTIME"] = new Date();
       var callLine = new Call(callLineOBJ);
       callLine.save(function( err, Call, count ){
           if(err) { console.log(err); callback(true); return; }
           callback(false, count);

       });


};

exports.createEvent = function (inputJSON,callback){

    this.putCallUpdate(inputJSON, function(){

    })


};


exports.putCallUpdate = function (inputJSON,callback){

      var callJSON = inputJSON;

      var call = new Call(callJSON);

      var id = call.CALLKEY;
      Call.findOne({CALLKEY: id}, function (err, Call) {
          if (err) {
              console.log(err);
              callback(true);
              return;
          }

          if (Call === null || Call === undefined) {
              console.log(err);
              callback(true);
              return;
          }

          var duration;
          if (inputJSON.CALLENDTIME !== undefined) {

              callJSON.CALLENDTIME = new Date();
              var duration = new Date(new Date().toISOString()) - new Date(Call.CALLSTARTTIME);
              duration = duration / 1000;
              duration = Math.floor(duration);
              Call["DURATION"] = duration;
              callJSON["DURATION"] = duration;
          }

          for (prop in callJSON) {
              Call[prop] = callJSON[prop];
          }


          Call.save(function (err, CallObj) {
              if (err) {
                  console.log(err);
                  callback(true);
                  return;
              }
              callback(false, { message: 'Call updated!' });



          });
      })

};

exports.updateCODAFCallRecordLine = function(callKey){
    if (callKey !== undefined){

        Call.findOne({CALLKEY: callKey}).select({ '_id': 0}).exec(function (err, Call) {
            var codafJSON = {};
            if(Call.DISPO[0].COMPLAINTREF !== undefined){
                complaintService.getComplaintDetailsByRef(Call.DISPO[0].COMPLAINTREF, function(err, complaintJSON){
                    //codafJSON = objectMerge(complaintJSON, Call);
                    codafJSON = Call.toObject();
                    codafJSON["CATEGORY"] = complaintJSON.CATEGORY;
                    codafJSON["TYPE"] = complaintJSON.TYPE;
                    codafJSON["ORDERREF"] = complaintJSON.ORDERREF;
                    codafBroker.CreateCallLineInCODAF('CREATECALLRECORD', JSON.stringify(codafJSON));
                })
            }else{


                codafBroker.CreateCallLineInCODAF('CREATECALLRECORD', JSON.stringify(Call));
            }

        });
    }
}

exports.getCallDispositionDetail = function (inputJSON,callback){

        Call.findOne({CALLKEY: inputJSON}).select({ '_id': 0, 'DISPO': 1, 'REMARKS': 1, 'CALLERNO': 1}).exec(function (err, Call) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }

            callback(false, Call);

        });


};

exports.getCallDetailByContref = function(inputJSON,callback){

        var query = Call.find(inputJSON).select({ '_id':0, 'DISPO':1 ,  'CALLERNO' :1, 'CALLSTARTTIME':1, 'TEAMDESC' :1, 'USERDESC':1, 'LANGDESC':1});
        query.sort({'CALLSTARTTIME':-1});

        query.exec(function(err, Call){
            if(err) { console.log(err); callback(true); return;}

            callback(false, Call);

        });

}


exports.updateCallClose = function (inputJSON,callback){

        Call.where('CALLKEY', inputJSON)
            .findOneAndUpdate({ CALLSTATUS: 'C' })
            .setOptions({ new: false })
            .exec(function (err, Call) {
                if (err){}
                callback(false, { message: 'Call updated!' });
            });

};


