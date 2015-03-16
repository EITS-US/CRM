var express=require('express');
var app=express();
var path = require('path');
var expressWinston = require('express-winston');
var winston = require('winston'); // for transports.Console
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app);



/*var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
}



else{*/

    // express-winston logger makes sense BEFORE the router.
     app.use(expressWinston.logger({
     transports: [
     new winston.transports.Console({
     json: true,
     colorize: true
     })
     ]
     }));





     // express-winston errorLogger makes sense AFTER the router.
     app.use(expressWinston.errorLogger({
     transports: [
     new winston.transports.Console({
     json: true,
     colorize: true
     })
     ]
     }));

    // Optionally you can include your custom error handler after the logging.

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true

    }));

app.all('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

});

//app.set('views',__dirname + '/views');
//app.engine('html', require('ejs').renderFile);

   app.use(express.static(path.join(__dirname, 'public')));

    require('./router/main')(app);


    server.listen(3000, function () {
        console.log('Express server '+process.pid+ ' listening on port ' + server.address().port);

    });
//}

/*
process.on('uncaughtException', function (err, next) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack);

})*/
