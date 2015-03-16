/**
 * Created by AM015SI on 2/20/2015.
 */

var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqp://localhost').then(function(conn) {
    return when(conn.createChannel().then(function(ch) {
        var ex = 'PrimaryExchange';
        var ok = ch.assertExchange(ex, 'direct', {durable: true});

        return ok.then(function() {
            ch.publish(ex, 'GIPPRIMARY', new Buffer('Kunal krishna going home'));
            console.log(" [x] Sent %s:'%s'", 'GIPPRIMARY', 'Kunal krishna');
            return ch.close();
        });
    })).ensure(function() { conn.close(); });
}).then(null, console.warn);