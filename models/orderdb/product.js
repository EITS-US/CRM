/**
 * Created by Kunal on 9/16/2014.
 */

var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');


var Schema   = mongoose.Schema;

var Product = new Schema({
    _id: Number,
    PRODDESC: String

}, { collection: 'Products' });

var Product = mongoose.model( 'Products', Product);

exports.getProductById = function (id,callback){
    Product.find({'PRODTYPE' :'SALE'}).select({PRODID:1, PRODDESC: 1, SALEVALUE:1,FREECOST:1, ISAMC:1, AMCVALUE:1, '_id' :0}).sort('PRODDESC').exec(function(err, Product){
        if(err) { console.log(err); callback(true); return; }
        console.log(Product);
        callback(false, Product);
    });
    console.log("Product Done");
};

exports.getProduct = function (prodid,callback){
    var prodID = parseInt(prodid);
    Product.find({'PRODTYPE' :'SALE', 'PRODID':prodID}).select({PRODID:1, PRODDESC: 1, SALEVALUE:1,FREECOST:1, ISAMC:1, AMCVALUE:1, '_id' :0}).sort('PRODDESC').exec(function(err, Product){
        if(err) { console.log(err); callback(true); return; }
        console.log(Product);
        callback(false, Product);
    });

};