var amqp = require('amqplib');
var url = 'amqp://localhost';

amqp.connect('amqp://localhost').then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
        var ex = 'PrimaryExchange';

        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        ok = ok.then(function() {
            return ch.assertQueue('PrimaryQueue', {
                autoDelete: false,
                durable: true,
                arguments: {
                    'x-dead-letter-exchange': 'DeadLetterExchange'
                }
            });
        });

        ok = ok.then(function(qok) {
            var queue = qok.queue;

            ch.bindQueue(queue, ex, 'GIPPRIMARY');
            return queue;

        });

        ok = ok.then(function(queue) {
            return ch.consume(queue, function(msg) {

                console.log(msg.fields.routingKey + "----------- Starts ---------------------------------->");
                var msgContent = msg.content;
                console.log(msg.fields.routingKey);
                if(msg.fields.routingKey === 'GIPPRIMARY'){
                    if(msgContent.length > 10){
                        ch.ack(msg);
                    }else{
                        ch.reject(msg,false);
                    }


                }
            }, {ack: true}).then(function() { console.log("delivered"); });
        });
        return ok.then(function() {
            console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });


    });
}).then(null, console.warn);