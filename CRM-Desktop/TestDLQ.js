var amqp = require('amqplib');
var url = 'amqp://localhost';

amqp.connect(url).then(function(conn) {
    //Subscribe to the WorkQueue in WorkExchange to which the "delayed" messages get dead-letter'ed (is that a verb?) to.
    return conn.createChannel().then(function(ch) {
        return ch.assertExchange('DeadLetterExchange', 'topic').then(function() {
            return ch.assertQueue('DeadLetterQueue', {
                autoDelete: false,
                durable: true
            })
        }).then(function() {
            return ch.bindQueue('DeadLetterQueue', 'DeadLetterExchange', '#');
        })
    })
}).then(null, function(error) {
    console.log('error\'ed')
    console.log(error);
    console.log(error.stack);
});