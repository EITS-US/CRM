/**
 * Created by am015si on 11/29/2014.
 */
var amqp = require('amqplib');
var when = require('when');


exports.sendOrderhdrToCODAF = function(severity, message){

    amqp.connect('amqp://localhost').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            var ex = 'CODAF';
            var ok = ch.assertExchange(ex, 'direct', {durable: true});

            return ok.then(function() {
                ch.publish(ex, severity, new Buffer(message));
                console.log(" [x] Sent %s:'%s'", severity, message);
                return ch.close();
            });
        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);

}


exports.PendingOrderToDialer = function(severity, message){

    amqp.connect('amqp://localhost').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            var ex = 'CODAFDIALER';
            var ok = ch.assertExchange(ex, 'direct', {durable: true});

            return ok.then(function() {
                ch.publish(ex, severity, new Buffer(message));
                console.log(" [x] Sent %s:'%s'", severity, message);
                return ch.close();
            });
        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);

}


exports.CreateContactInCODAF = function(severity, message){

    amqp.connect('amqp://localhost').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            var ex = 'CONTACT';
            var ok = ch.assertExchange(ex, 'direct', {durable: true});

            return ok.then(function() {
                ch.publish(ex, severity, new Buffer(message));
                console.log(" [x] Sent %s:'%s'", severity, message);
                return ch.close();
            });
        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);

}


exports.CreateCallLineInCODAF = function(severity, message){

    amqp.connect('amqp://localhost').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            var ex = 'CALLS';
            var ok = ch.assertExchange(ex, 'direct', {durable: true});

            return ok.then(function() {
                ch.publish(ex, severity, new Buffer(message));
                console.log(" [x] Sent %s:'%s'", severity, message);
                return ch.close();
            });
        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);

}


exports.LogGIPRequest = function(severity, message){

    amqp.connect('amqp://localhost').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            var ex = 'gip';
            var ok = ch.assertExchange(ex, 'direct', {durable: true});

            return ok.then(function() {
                ch.publish(ex, severity, new Buffer(message));
                console.log(" [x] Sent %s:'%s'", severity, message);
                return ch.close();
            });
        })).ensure(function() { conn.close(); });
    }).then(null, console.warn);

}
