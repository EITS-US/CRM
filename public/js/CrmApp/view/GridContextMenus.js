Ext.define('CrmApp.view.GridContextMenus', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.gridContextMenus',
    width: 210,
    items: [
        {
            text: 'View Call Info',
            handler: function () {
                var selection = Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0];
                if (selection){
                    var phoneNum;
                    var selectedRowData = selection.data;
                    switch (vDetailGridPanel.id) {
                        case 'callsDetailGridPanel':
                            phoneNum = selectedRowData.CALLERNO;
                            break;
                        case 'callBackDetailGridPanel':
                            phoneNum = selectedRowData.CALLERNO;
                            break;
                        case 'OrderDetailGridPanel':
                            phoneNum = selectedRowData.CALLBACKCCONTACTNO;
                            break;
                        case 'advanceBookingDetailGridPanel':
                            phoneNum = selectedRowData.CALLERNO;
                            break;
                        case 'complaintDetailGridPanel':
                            phoneNum = selectedRowData.PHONENO;
                            break;

                    }
                    CrmApp.controller.CRMController.viewCallInfo(phoneNum);
                }
            }
        },
        {
            text: 'Edit Order',
            hidden: true,
            id: 'editOrderContextMenu',
            handler: function(){
                var selection = Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0];
                console.log(selection);
                if(selection){
                    editOrderCallFlag = false;
                        var selectedOrderData = selection.data;
                        CrmApp.controller.CRMController.getCustomerByOrder(selectedOrderData.ORDERREF);
                        CrmApp.controller.CRMController.getOrderDetail(selectedOrderData.ORDERREF);
                        var editOrder = Ext.widget('window', {
                            title: 'View / Edit Order',
                            width: 635,
                            height: 580,
                            layout: 'fit',

                            modal: true,
                            closable: false,
                            items: [
                                {
                                    xtype: 'editOrderPopup'
                                }
                            ]
                        });
                        editOrder.show();
                }
                else{
                    Ext.Msg.alert("Message", "No Item selected.");
                }
            }
        },
        /*{
            text: 'Call Caller ID',
            handler: function () {
                Ext.Msg.alert('Status title', 'Show Customized Popup ');
            }

        },*/
        {
            text: 'Call Phone No.',
            handler: function () {
                var selection = Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0];
                if (selection){
                    var selectedRowData = selection.data;
                    var phoneNum = new Array();
                    var callkey = selectedRowData.CALLKEY;
                    switch (vDetailGridPanel.id) {
                        case 'callsDetailGridPanel':
                            phoneNum[0] = selectedRowData.CALLERNO;
                            break;
                        case 'callBackDetailGridPanel':
                            phoneNum[0] = selectedRowData.CALLERNO;
                            //updateCallClose(selectedRowData.CALLKEY);
                            break;
                        case 'OrderDetailGridPanel':
                            phoneNum = selectedRowData.CONTACTNO;
                            break;
                        case 'advanceBookingDetailGridPanel':
                            phoneNum[0] = selectedRowData.CALLERNO;
                            break;
                        case 'complaintDetailGridPanel':
                            phoneNum[0] = selectedRowData.PHONENO;
                            break;
                    }
                    callContactForm(phoneNum,callkey);
                }
            }
        },
        '-',
        {
            text: 'Send SMS',
            handler: function(){
                var selection = Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0];
                if (selection){
                    var selectedRowData = selection.data;
                    var phoneNum = new Array();
                    switch (vDetailGridPanel.id) {
                        case 'callsDetailGridPanel':
                            phoneNum[0] = selectedRowData.CALLERNO;
                            break;
                        case 'callBackDetailGridPanel':
                            phoneNum[0] = selectedRowData.CALLERNO;
                            break;
                        case 'OrderDetailGridPanel':
                            phoneNum = selectedRowData.CONTACTNO;
                            break;
                        case 'advanceBookingDetailGridPanel':
                            phoneNum[0] = selectedRowData.CALLERNO;
                            break;
                        case 'complaintDetailGridPanel':
                            phoneNum[0] = selectedRowData.PHONENO;
                            break;
                    }
                    showSMSForm(phoneNum);
                }
            }
        },
        {
            text: 'Send Email',
            handler: function(){
                var selection = Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0];
                if (selection){
                    var customer;
                    var selectedRowData = selection.data;
                    switch (vDetailGridPanel.id) {
                        case 'callsDetailGridPanel':
                            customer = selectedRowData.CONTACTNAME;
                            break;
                        case 'callBackDetailGridPanel':
                            customer = selectedRowData.CONTACTNAME;
                            break;
                        case 'OrderDetailGridPanel':
                            customer = selectedRowData.CONTNAME;
                            break;
                        case 'advanceBookingDetailGridPanel':
                            customer = selectedRowData.CONTACTNAME;
                            break;
                    }
                    showContactForm(customer);
                }
            }
        },
        '-',
        {
            text: 'Print Authorization Form',
            hidden: true,
            id: 'printAuthContextMenu',
            handler: function () {
                Ext.Msg.alert('Status title', 'Show Customized Popup ');
            }
        },
        {
            text: 'Email Authorization Form',
            hidden: true,
            id: 'emailAuthContextMenu',
            handler: function () {
                Ext.Msg.alert('Status title', 'Show Customized Popup ');
            }
        },
        {
            text: 'Approve Order For Authentication',
            hidden: true,
            id: 'approveOrderContextMenu',
            handler: function () {

                var selection = Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    url: '/crm/api/orders',
                    method: 'PUT',
                    params :{
                        "ORDERREF" : selection.data.ORDERREF,
                        "APPROVEFORAUTH" : "N"
                    },
                    success: function (response, opts) {
                        var serverResponse = Ext.decode(response.responseText);
                        Ext.Msg.alert("Response", serverResponse.message);
                        Ext.getCmp(vDetailGridPanel.id).getSelectionModel().getSelection()[0].data.APPROVEFORAUTH = "N";

                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        }
    ]
});
function showContactForm(customer) {
    if (!win) {
        var form = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,

            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    afterLabelTextTpl: required,
                    value: customer,
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Your Email Address',
                    afterLabelTextTpl: required,
                    vtype: 'email',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Subject',
                    afterLabelTextTpl: required,
                    allowBlank: false
                }, {
                    xtype: 'textareafield',
                    fieldLabel: 'Message',
                    labelAlign: 'top',
                    flex: 1,
                    margins: '0',
                    afterLabelTextTpl: required,
                    allowBlank: false
                }],

            buttons: [{
                text: 'Cancel',
                handler: function() {
                    this.up('form').getForm().reset();
                    this.up('window').hide();
                }
            }, {
                text: 'Submit',
                handler: function() {
                    if (this.up('form').getForm().isValid()) {
                        this.up('form').getForm().reset();
                        this.up('window').hide();
                        Ext.MessageBox.alert('Thank you!', 'Your Message has been sent.');
                    }
                }
            }]
        });
        var win = Ext.widget('window', {
            title: 'Message Us',
            closeAction: 'hide',
            width: 300,
            height: 350,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: form
        });
    }
    win.show();
}
function showSMSForm(phoneNum) {
    if (!win) {
        var form = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,
            id:'smsForm',

            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            items: [

                {
                    xtype: 'combo',
                    fieldLabel: 'Contact No',
                    afterLabelTextTpl: required,
                    mode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: false,
                    allowBlank: false,
                    name: 'sendSMSContact',
                    id: 'sendSMSContact',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Message',
                    labelAlign: 'top',
                    flex: 1,
                    name: 'sendSMSMessage',
                    id: 'sendSMSMessage',
                    rows: 5,
                    afterLabelTextTpl: required,
                    allowBlank: false
                }
            ],
            buttons: [{
                text: 'Cancel',
                handler: function() {
                    this.up('form').getForm().reset();
                    this.up('.window').close();
                }
            }, {
                text: 'Send SMS',
                handler: function() {
                    var contactNo = Ext.getCmp("sendSMSContact").rawValue;
                    var message = Ext.getCmp("sendSMSMessage").rawValue;
                    var smsJSONParam = {};
                    smsJSONParam["contactno"] = contactNo;
                    smsJSONParam["msg"] = message;
                    var smsJSONString = JSON.stringify(smsJSONParam);


                    if (this.up('form').getForm().isValid()) {
                        Ext.Ajax.request({
                            url: '/crm/api/communication/sendSMS',
                            method: 'POST',
                            params: {
                                "smsJSON" : smsJSONString
                            },
                            success: function(response, opts){
                                Ext.Msg.alert("Communication", "SMS Sent to customer.");
                                Ext.getCmp('smsForm').getForm().reset();
                                Ext.getCmp('smsForm').up('.window').close();
                            },
                            failure : function(response, opts){
                                Ext.Msg.alert("Communication", "Server encountered issue.");
                            }
                        });

                        Ext.MessageBox.alert('Thank you!', 'Your Message has been sent.');
                    }
                }
            }]
        });

        var win = Ext.widget('window', {
            title: 'Message Us',
            closable:false,
            width: 300,
            height: 300,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: form
        });
    }
    win.show();
    var dataContact = new Array();
    for(var i=0; i<phoneNum.length; i++){
        dataContact[i] = new Array();
        dataContact[i]['name'] = phoneNum[i];
        dataContact[i]['value'] = phoneNum[i];
    }
    var contactStore = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        fields: ['name', 'value'],
        data: dataContact
    });
    Ext.getCmp('sendSMSContact').clearValue();
    Ext.getCmp('sendSMSContact').bindStore(contactStore);
    Ext.getCmp('sendSMSContact').setValue(phoneNum[0]);
}
function callContactForm(phoneNum, callKey) {
    if (!win) {
        var form = Ext.widget('form', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            bodyPadding: 10,

            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 100,
                labelStyle: 'font-weight:bold'
            },
            items: [

                {
                    xtype: 'combo',
                    fieldLabel: 'Contact No',
                    afterLabelTextTpl: required,
                    mode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: false,
                    allowBlank: false,
                    name: 'callUserContact',
                    id: 'callUserContact',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local'
                }
            ],
            buttons: [{
                text: 'Cancel',
                handler: function() {
                    this.up('.window').close();
                }
            }, {
                text: 'Call',
                handler: function() {

                    updateCallClose(callKey);
                    if(Ext.getCmp('outgoingCall').value == true){
                        var win = Ext.widget('window', {
                            title: 'New Call Information',
                            width: 1154,
                            height: 620,
                            layout: 'fit',
                            modal: true,
                            closable:false,
                            items: [
                                {
                                    xtype: 'calPopup'
                                }
                            ],
                            defaultFocus: 'firstName'
                        });
                        //Ext.fly('callheader').update('Incoming Call   -- Campaign '+ custInfoArr[2], true);
                        win.show();
                        CrmApp.controller.CRMController.loadLanguages('languageCombo');
                        var phoneNumber = Ext.getCmp('callUserContact').value;
                        CrmApp.controller.CRMController.loadCallKey(phoneNumber);
                        CrmApp.controller.CRMController.loadContactDetails(phoneNumber);
                        CrmApp.controller.CRMController.loadProductDataStore('newCallProductCombo', 'product', selectedProductId);
                    }
                    else{
                        Ext.MessageBox.alert('Message!', 'Select Out call first.');
                    }
                    this.up('.window').close();
                }
            }]
        });

        var win = Ext.widget('window', {
            title: 'Call',
            closable:false,
            width: 300,
            height: 150,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: form
        });
    }
    win.show();
    var dataContact = new Array();
    for(var i=0; i<phoneNum.length; i++){
        dataContact[i] = new Array();
        dataContact[i]['name'] = phoneNum[i];
        dataContact[i]['value'] = phoneNum[i];
    }
    var contactStore = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        fields: ['name', 'value'],
        data: dataContact
    });
    Ext.getCmp('callUserContact').clearValue();
    Ext.getCmp('callUserContact').bindStore(contactStore);
    Ext.getCmp('callUserContact').setValue(phoneNum[0]);
}


function updateCallClose(callKey) {
    if(Ext.getCmp('outgoingCall').value == true) {
        Ext.Ajax.request({
            url: '/crm/api/updateCallClose/' + callKey,
            method: 'PUT',
            success: function (response, opts) {

            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }

}