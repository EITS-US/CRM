var mypindb = require('../models/orderdb/pincode');

    exports.getPincodeById = function(req, res){
        console.log( req.params.id);
        var input = req.params.id;
        mypindb.getPinCodeById(input, function(err, results) {
            res.send(results);
        });
    }


exports.getAllCity = function(req, res){
   // console.log( req.params.id);
    var input = req;
    mypindb.getAllCity(input, function(err, results) {
        res.send(results);
    });
}




