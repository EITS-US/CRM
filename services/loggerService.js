var codafBroker = require('../helper/codafBroker');

exports.logRequest = function(req, res){

    var recJSON = req.body.inputXML;
    console.log(recJSON);
    res.send("request sent!!");
    codafBroker.LogGIPRequest('GIPREQS',JSON.stringify(recJSON));
}