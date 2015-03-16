var vSearchFormPanel, vUserViewPort, chart, vGridContextMenus;

var orderJson = {};
var callSource = '';
orderJson['ORDERLINES'] = new Array();
orderJson['PAYMENTLINES'] = new Array();
var allProductResults = {};
var selectedProductId = '';
var customerName = '';
var userObj;
var editOrderRef = '';
var editOrderCallFlag = false;
var editOrderCallKey = '';

var vDetailGridPanel;
Ext.Loader.setConfig({
    enabled : true
});
Ext.application({
    name: 'CrmApp',
    appFolder: '/js/CrmApp',
    controllers: [
        'CRMController'
    ],
    launch: function() {
        var token = window.localStorage.token;
        if(token === ''){
            Ext.Msg.confirm('Login Failure', 'You are not logged in properly', function (id, value) {
                event.stopEvent();
                window.location.href = "/crm/login.html";
            }, this);
        }
        var jsonToken = JSON.parse(token);
        userObj = jsonToken[1];
        var tokenInfo = jsonToken[0];
        emitLoginMessage(userObj.USERID);
        updateFooter(userObj);
        vUserViewPort = Ext.create('CrmApp.view.WarehouseViewPort');

        var vCallFormPanel = Ext.create('CrmApp.view.BookOrderFormPanel');
        var vMainControlFormPanel = Ext.create('CrmApp.view.WarehouseControlFormPanel');
        vSearchFormPanel = Ext.create('CrmApp.view.OrderManagementFormPanel');
        vDetailGridPanel = Ext.create('CrmApp.view.OrderManagementGrid');

        Ext.Ajax.defaultHeaders = {
            'x-access-token': tokenInfo.tokenid,
            'x-access-user': userObj.USERNAME
        };
    }
});
function updateFooter(){
    Ext.get("userRole").setHTML(userObj.FULLNAME);
    Ext.get("department").setHTML(userObj.DEPARTMENT);
    Ext.get("designation").setHTML(userObj.DESIGNATION);
    Ext.get("userRole").setHTML(userObj.USERNAME);
    Ext.get("time").setHTML(new Date());
}
function emitLoginMessage(userName){
    try{
        iosocket.emit('LOGIN', { userId: userName });
    }catch(ex){
        console.log("No iosocket connection");
    }
}