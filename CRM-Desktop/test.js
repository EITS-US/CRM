var async = require('async');
    /*operations = [];

var paymentLineExecution = function(abc, callback){
    console.log(abc);
    var a = 0;
    for(i = 0 ; i < 50000 ; i++){
        a++;
        if(a===30000)
            console.log(a);
    }
    console.log(a);
    callback(null, a);
}

var orderLineExecution = function(abc, callback){
    console.log(abc);
    callback(null, 10);
}


    operations.push(paymentLineExecution("abc", function(){}));
    operations.push(orderLineExecution("abc", function(){}));



async.series(operations,  function (err, results) {
    // results[1]
    // results[2]
    console.log(results[0] );
    console.log( results[1]);
});*/

function transformFile(test) {
    async.waterfall([
            function startPoint(callback) {
                // code a
                console.log(test + "<<<<<<<<<<<>>>>>>>>>>>>>>>>>>> +  Hello there");
                callback(null, test, 'b')
            },
            function paymentline(arg1, arg2, callback) {
                // arg1 is equals 'a' and arg2 is 'b'
                // Code c

                console.log(arg1 + "---" + "In second");
                var a = 0;
                var aary = [];
                for(i = 0 ; i < 500000000 ; i++){
                    a++;
                    if(a===30000)
                        console.log(a);
                    aary.push(a);
                }
                console.log(a);
                console.log("two");
                callback(null, aary)
            },
            function orderline(arg1, callback) {
                // arg1 is 'c'
                // code d
                console.log("three" + "--------------" + arg1[10]);
                callback(null, 'd');
            }], function (err, result) {
            // result is 'd'

            console.log(result);
        }
    )

}

transformFile("abc");


/*

var telebuyOrder = {};
executeOrder(telebuyOrder);

var paymentLine = function(callback) {
    telebuyOrder["PAYLINE"] = "PAYLINE";
console.log("TelebuyOrder");
    callback(null, telebuyOrder);
};
var orderLine = function(orderWithPaymentLine, callback) {

    orderWithPaymentLine["ORDERLINE"] = "ORDERLINE";

    callback(null, orderWithPaymentLine);

};
var order = function(orderWithOrderLineAndPaymentLine, callback) {

    orderWithOrderLineAndPaymentLine["ORDER"] = "Order";
    callback(null, orderWithOrderLineAndPaymentLine);

};

function executeOrder(telebuyOrder){

    async.waterfall([
            paymentLine,
            orderLine,
            order
        ],
        function (err, result) {
            // result is 'd'

            console.log(result);
        }
        //callback
    );

}*/

/*
var fs = require('fs');
var async = require('async');

var path = './async.txt';
async.waterfall([
    // check if async.txt exists
    function(cb) {
        fs.stat(path, function(err, stats) {
            if (stats == undefined) cb(null);
            else console.log('async.txt exists');
        });
    },
    // read the contents of this file
    function(cb) {
        fs.readFile(__filename, function(err, content) {
            var code = content.toString();
            cb(null, code);
        });
    },
    // write the content to async.txt
    function(code, cb) {
        fs.writeFile(path, code, function(err) {
            if (err) throw err;
            console.log('async.txt created!');
        });
    }
]);*/
