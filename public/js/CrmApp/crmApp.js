var vSearchFormPanel, vUserViewPort, chart, vGridContextMenus;
var complaintFormObj = {};
var orderFormObj = {};
var callBackFormObj = {};
var callSearchFormObj = {};
var advBookFormObj = {};
var otherLangFormObj = {};
var dndSearchFormObj = {};
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
        //console.log(JSON.parse(token));
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

        vUserViewPort = Ext.create('CrmApp.view.UserViewPort');

        switch (userObj.ROLE)
        {
            case 'manager':
                Ext.getCmp('dndApprovalTab').show();
                Ext.getCmp('attendanceTab').show();
                Ext.getCmp('adminTab').show();
                Ext.getCmp('orderTab').show();
                Ext.getCmp('complaintTab').show();
                Ext.getCmp('advanceBookingTab').show();
                Ext.getCmp('callsTab').show();
                Ext.getCmp('callbackTab').show();
                Ext.getCmp('otherLanguageTab').show();
                break;
            case 'agent':
                Ext.getCmp('complaintTab').show();
                Ext.getCmp('orderTab').show();
                Ext.getCmp('attendanceTab').show();
                Ext.getCmp('advanceBookingTab').show();
                Ext.getCmp('callsTab').show();
                Ext.getCmp('callbackTab').show();
                Ext.getCmp('dndApprovalTab').hide();
                Ext.getCmp('adminTab').hide();
                Ext.getCmp('otherLanguageTab').hide();
                break;
            case 'lead':
                Ext.getCmp('complaintTab').show();
                Ext.getCmp('orderTab').show();
                Ext.getCmp('attendanceTab').show();
                Ext.getCmp('advanceBookingTab').show();
                Ext.getCmp('callsTab').show();
                Ext.getCmp('callbackTab').show();
                Ext.getCmp('dndApprovalTab').hide();
                Ext.getCmp('adminTab').hide();
                Ext.getCmp('otherLanguageTab').show();
                break;
            case 'confirmation':
                Ext.getCmp('attendanceTab').show();
                Ext.getCmp('dndApprovalTab').hide();
                Ext.getCmp('adminTab').hide();
                Ext.getCmp('otherLanguageTab').hide();
                Ext.getCmp('complaintTab').hide();
                Ext.getCmp('advanceBookingTab').hide();
                Ext.getCmp('callsTab').hide();
                Ext.getCmp('callbackTab').hide();
                break;
            default: statement(s)
        }

        var vCallFormPanel = Ext.create('CrmApp.view.CallFormPanel');
        var vMainControlFormPanel = Ext.create('CrmApp.view.MainControlFormPanel');
        vSearchFormPanel = Ext.create('CrmApp.view.DashboardPanel1');
        vDetailGridPanel = Ext.create('CrmApp.view.DashboardPanel2');
        Ext.QuickTips.init();

        Ext.Ajax.defaultHeaders = {
            'x-access-token': tokenInfo.tokenid,
            'x-access-user': userObj.USERNAME
        };
        vGridContextMenus = Ext.create('CrmApp.view.GridContextMenus');
	}
});

function updateFooter(){

    Ext.get("userRole").setHTML(userObj.FULLNAME);
    Ext.get("department").setHTML(userObj.DEPARTMENT);
    Ext.get("designation").setHTML(userObj.DESIGNATION);
    Ext.get("userRole").setHTML(userObj.USERNAME);
    Ext.get("time").setHTML(new Date());

}
function loadTeamManagementPanel(){
    vSearchFormPanel.destroy();
    vDetailGridPanel.destroy();
    vSearchFormPanel = Ext.create('CrmApp.view.TeamManagementFormPanel');
    vDetailGridPanel = Ext.create('CrmApp.view.TeamManagementGridPanel');
}
function loadTargetManagementPanel(){
    vSearchFormPanel.destroy();
    vDetailGridPanel.destroy();
    vSearchFormPanel = Ext.create('CrmApp.view.TargetManagementFormPanel');
    vDetailGridPanel = Ext.create('CrmApp.view.TargetManagementGridPanel');
}
function loadUserManagementPanel(){
    vSearchFormPanel.destroy();
    vDetailGridPanel.destroy();
    vSearchFormPanel = Ext.create('CrmApp.view.UserManagementFormPanel');
    vDetailGridPanel = Ext.create('CrmApp.view.UserManagementGridPanel');
}
function emitLoginMessage(userName){

    try{
        iosocket.emit('LOGIN', { userId: userName });
    }catch(ex){
        console.log("No iosocket connection");
    }
}
function isObjExistInArray(obj, arr){
    var isExist = false;
    for(var index in obj) {
        for(var i=0; i<arr.length; i++){
            if(arr[i][index] == obj[index]){
                isExist = true;
                break;
            }
        }
    }
    return isExist;
}