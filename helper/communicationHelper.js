/**
 * Created by AM015SI on 11/9/2014.
 */
var smpp = require('smpp');


exports.sendSMSToCustomer = function (inputJSON,callback) {



    var session = smpp.connect('sms6.routesms.com', 2351);
    var msgParams = {};
    msgParams["msg"] = inputJSON["msg"];
    msgParams["contactno"] = "91" + inputJSON["contactno"];

    session.bind_transceiver({
        system_id: 'telebuy',
        password: 'f4h35h'
    }, function (pdu) {
        if (pdu.command_status == 0) {
            // Successfully bound
            session.submit_sm({
                destination_addr: msgParams.contactno,
                message_payload: msgParams.msg,
                source_addr: 'TelBuy',
                registered_delivery: 1,
                data_coding: 0
            }, function (pdu) {
                console.log(pdu);
                if (pdu.command_status === 0) {
                    // Message successfuelly sent
                    console.log(pdu.message_id);

                    callback(false, { message: pdu.message_id });
                }
            });
        }
    });

}