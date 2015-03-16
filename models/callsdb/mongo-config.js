var mongoose = require( './node_modules/mongoose' );

module.exports  = mongoose.connect( 'mongodb://localhost:27017/CRMCALLSDB' , function (error) {
    if (error) {
        console.log("Database connection error ------------->" + error);
    }
});
