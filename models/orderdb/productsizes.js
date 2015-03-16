/**
 * Created by Kunal on 9/16/2014.
 */


var mongoose = require( './node_modules/mongoose' );
var db = require('./mongo-db-config');


var Schema   = mongoose.Schema;


var Product_Sizes = new Schema({
    prodid: Number,
    sizeid: Number


}, { collection: 'Product_Sizes' });

var Product_Sizes = mongoose.model( 'Product_Sizes', Product_Sizes);

exports.getProductSizeById = function (id,callback){
    Product_Sizes.find({prodid:id}).where('sizeid').gt(0).exec(function(err, Product_Sizes){
        if(err) { console.log(err); callback(true); return; }
        console.log(Product_Sizes);
        callback(false, Product_Sizes);
    });
    console.log("Product Size Done");
};

//Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
