
var orderService = require('./../services/orderService');
var userService = require('./../services/userService');
var authService = require('./../config/auth');
var pincodeService = require('./../services/pinService');
var callsService = require('./../services/callsService');
var headerService = require('./../services/headerService');
var complaintService = require('./../services/complaintService');
var contactService = require('./../services/contactService');
var smsService = require('./../services/smsservice');
var loggerService = require('./../services/loggerService');


module.exports=function(app)
{
    /*app.get('/crm/login',function(req,res){
        res.render('/crm/login.html');

});*/

    app.get('/crm/home',isAutheticated, function(req,res){
        res.render('/crm/home.html');
    });

    /*  app.get('/crm/dummyCall', isAutheticated, function(req,res){

    });   */

    app.get('/crm/api/logout', function(req,res){
        var tokenObj = req.headers['x-access-token'];
        var userObj = req.headers['x-access-user'];

        authService.inValidateToken(tokenObj, userObj, function(err, results){

            res.send(200);
        });
    });

 // Register All APIS here

    function isAutheticated(req, res, next){
        var tokenObj = req.headers['x-access-token'];
        var userObj = req.headers['x-access-user'];
        authService.validateToken(tokenObj, userObj, function(err, results){
            console.log("inside main" + results);
            if(results == null || results == undefined){
                res.send(401);
            }
            else{
                req.authTokenInfo = results;
                next();

            }
        })

    }    // Register All APIS here

    /*app.get('/crm/api/orders', isAutheticated, function(req, res){
        var tokInfo = req.authTokenInfo;
        req.authTokenInfo = null;
        orderService.getAllOrders(req, res, tokInfo);
    });*/

// Order API Starts

    app.post('/crm/api/orders', orderService.asynchService);
    app.get('/crm/api/orders/:id', orderService.getOrderById);
    app.delete('/crm/api/orders/:id', orderService.deleteById);
    app.put('/crm/api/orders', orderService.updateOrderById);
    app.get('/crm/api/getOrderByCustomer/:id', orderService.getOrderByCustomer);
    app.get('/crm/api/getCustomerByOrder/:id', orderService.getCustomerByOrder);
    app.get('/crm/api/getOrderHistoryById/:id', orderService.getOrderHistoryByOrderId);
    app.get('/crm/api/getCourierByID/:id', orderService.getCourierByID);
    app.get('/crm/api/getAllFranchisees', orderService.getAllFranchisees);
    app.get('/crm/api/getAllShowrooms', orderService.getAllShowrooms);
    app.get('/crm/api/getCustomerAddByOrder/:id', orderService.getCustomerAddbyOrderref);
    app.get('/crm/api/getCustomerAddByContactNo/:id', orderService.getCustomerAddbyContactNo);
    app.get('/crm/api/product', orderService.getProductById);
    app.get('/crm/api/product/:id', orderService.getProduct);
    app.get('/crm/api/productsize/:id', orderService.getProductSizeDetail);
    app.get('/crm/api/getPaymodes', orderService.payModes);
    app.get('/crm/api/getPayOptions', orderService.payOptions);
    app.get('/crm/api/getPayOptionsByModes/:id', orderService.getPayOptionsByModes);
    app.get('/crm/api/getSearchOrder', orderService.getSearchOrder);
    app.get('/crm/api/banks', orderService.getBanksTypes);
    app.get('/crm/api/getOrderSeq', orderService.getOrderRefNextSeq);
    app.get('/crm/api/getTotalOrderCountByCustomer/:id', orderService.getTotalOrderByContref);
    app.get('/crm/api/order/OrderConfirmation', orderService.getAllOrdersForConfirmation); // API for CODAF dialer
    app.put('/crm/api/order/EditOrder', orderService.asynchAuthUpdateService);
    app.get('/crm/api/getOrderSumByCust/:id', orderService.getOrderSummryByCust);
    app.get('/crm/api/order/discount',orderService.getAllDiscount);
    app.post('/crm/api/order/discount',orderService.addDiscount);
    app.delete('/crm/api/order/discount/:id',orderService.removeDiscount);
    app.get('/crm/api/order/contact/:id',orderService.getOrderContacts);
    app.post('/crm/api/order/updateOrderStatus',orderService.updateOrderById);


// Order API End

// Contact API Starts

    app.get('/crm/api/contact/:id', contactService.getContactById);
    app.post('/crm/api/createContact', contactService.createContact);
    app.put('/crm/api/putContactUpdate', contactService.putContactUpdate);
    app.get('/crm/api/checkContactDetails/:id', contactService.getContactByContactNo);
    app.post('/crm/api/primaryContact/contact', contactService.addPrimaryContact);
    app.post('/crm/api/duplicateContact', contactService.checkDuplicateContact);
    app.post('/crm/api/dndRequests', contactService.addToDNDRequests);
    app.put('/crm/api/dndRequests', contactService.updateDNDStatus);
    app.get('/crm/api/dndRequests', contactService.getAllDNDrequests);
    app.get('/crm/api/dndRequests/:id', contactService.getAllDNDrequests);

// Contact API End

    app.post('/crm/api/createPermission', userService.createPermission);
    app.post('/crm/api/user', userService.createUser);
    app.put('/crm/api/team/user', userService.updateUserTeam);
    app.post('/crm/api/assignRole', userService.assignRoleToUser);
    app.get('/crm/api/teams', userService.getAllTeams);
    app.post('/crm/api/teams', userService.createTeam);
    app.get('/crm/api/teams/:id', userService.getTeamById);
    app.delete('/crm/api/teams/:id', userService.deleteTeamById);
    app.get('/crm/api/subteams', userService.getAllSubTeams);
    app.post('/crm/api/subteams', userService.createSubTeam);
    app.get('/crm/api/subteams/:id', userService.getSubTeamByTeamId);
    app.delete('/crm/api/subteams/:id', userService.deleteSubTeamByTeamId);
    app.get('/crm/api/team/users/:id', userService.getUsersBySubTeamId);
    app.get('/crm/api/team/users', userService.getAllUsers);
    app.get('/crm/api/team/designation', userService.getDesignations);
   //app.get('/crm/api/team/users', userService.getTeamLinks);


    app.get('/crm/api/call', callsService.getCallDetail);
    app.get('/crm/api/callHistory/:id', callsService.getCallDetailByContref);
    app.get('/crm/api/call/:id', callsService.getCallDispositionDetails);
    app.get('/crm/api/getCallKeySeq/:id', callsService.getCallKeyNextSeq);
    app.put('/crm/api/putCallUpdate', callsService.putCallUpdate);
    app.put('/crm/api/updateCallClose/:id', callsService.updateCallClose);

    app.get('/crm/api/getNonSaleRes', headerService.getNonSaleReasons);
    app.get('/crm/api/getNotIntReasons', headerService.getNotIntReasons);
    app.get('/crm/api/getGenInqReasons', headerService.getGenInqReasons);
    app.get('/crm/api/getCallBackReasons', headerService.getCallBackReasons);
    app.get('/crm/api/getComplaintReasons/:id', headerService.getComplaintReasons);
    app.get('/crm/api/getLanguages', headerService.getLanguages);
    app.get('/crm/api/getOnHoldReasons', headerService.getOnHoldReasons);

    app.post('/crm/api/complaint', complaintService.createComplaint);
    app.get('/crm/api/complaint/:id', complaintService.getComplaintByRef);
    app.put('/crm/api/complaint', complaintService.updateComplaint);
    app.get('/crm/api/getComplaintHistory/:id', complaintService.getComplaintHistoryById);
    app.get('/crm/api/getComplaintByCustomer/:id', complaintService.getComplaintsByCustomer);
    app.get('/crm/api/getComplainDetails', complaintService.getComplainDetail);

    app.get('/crm/api/pincode/:id', pincodeService.getPincodeById);
    app.get('/crm/api/allCity', pincodeService.getAllCity);

    app.post('/crm/api/sendSMSForOrder', smsService.sendSMSForOrderEnquiry);
    app.post('/crm/api/communication/sendSMS', smsService.sendSMS);

    app.post('/crm/api/auth/managerCredentials', authService.checkManagerCredential);
    app.post('/crm/api/authenticate', function(req, res) {



        var username   = req.body.username;
        var password   = req.body.password;

        var userObj = {"USERNAME" : username.toUpperCase(), "PWD" : password};

        authService.createAndStoreToken(userObj, function(err, token){

            if (err) {
                console.log(err);
                return  res.send(401);
            }else{
                res.send(token);
            }

        });

    });


    app.get('/crm/api/testAsync', orderService.asynchService);

    app.post('/crm/api/logSOAPReq', loggerService.logRequest);

}

