Ext.define('CrmApp.view.PhoneDetailsForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.phoneDetailsForm',
    border: false,
    layout: 'column',
    labelAlign: 'top',
    height: 550,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 1
    },
    dockedItems:[
        {
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '0 0 3 5',
            items: [
                {
                    xtype: 'component',
                    flex: 1
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Save',
                    id:'editSavePhoneDetails',
                    margin: '5 0 0 0',
                    iconCls: 'savebutton',
                    handler: function() {
                        CrmApp.controller.CRMController.saveEditCustomerDetails();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelPhoneDetails',
                    margin: '5 5 0 5',
                    iconCls: 'cancelbutton',
                    handler: function() {
                        iosocket.emit('CLOSEPOPUP', 'close');
                        this.up('.window').close();
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'fieldset',
            collapsible: false,
            border: false,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 0, bottom: 0, left: 0}
                },
                hideLabel: true
            },
            items: [
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Phone No',
                            margins: '4 10 0 10',
                            width: 100
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            width: 202,
                            name: 'phoneDetailsPhoneNo',
                            id: 'phoneDetailsPhoneNo'
                        },
                        {
                            xtype: 'button',
                            width: 30,
                            cls: 'addbutton',
                            margins: '1 0 0 2',
                            handler : function(){
                                var cellPhoneNo = Ext.getCmp("phoneDetailsPhoneNo").rawValue;
                                if(cellPhoneNo.length == 10){
                                    var contactJSON = {};
                                    contactJSON["CONTACTNO"] = cellPhoneNo;
                                    contactJSON["CONTREF"] = Ext.getCmp('contRefIdEdit').value;
                                    var contactJSONString = JSON.stringify(contactJSON);
                                    var contactExists = Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo.toString());
                                    if(!contactExists){
                                        Ext.Ajax.request({
                                            url: '/crm/api/duplicateContact',
                                            params: {
                                                "contactJSON": contactJSONString
                                            },
                                            success: function (response, opts) {
                                                var serverMsg = Ext.decode(response.responseText);
                                                if(serverMsg.message === "true"){
                                                    Ext.getCmp('phoneDetailsprimaryContact').getStore().add({name:"ACTIVE", value:cellPhoneNo.toString()});
                                                    var tmpHtml = '<tr><td>'+cellPhoneNo.toString()+'</td><td class="ACTIVE">ACTIVE</td></tr>';
                                                    Ext.select('table#phoneDetailscontactContainerTbl tbody').elements[0].innerHTML += tmpHtml;
                                                    Ext.getCmp("phoneDetailsPhoneNo").setValue("");
                                                }else{
                                                    Ext.Msg.alert("Phone Details","Another contact exists for this phone no.");
                                                }
                                            },
                                            failure : function (response, opts){
                                                Ext.Msg.alert("Phone Details",response);
                                            }
                                        });
                                    }else{
                                        Ext.Msg.alert("Phone Details","Contact already exists");
                                    }
                                }else{
                                    Ext.Msg.alert("Phone Details","Enter Proper Contact no.");
                                }

                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items: [
                        {
                            width: 342,
                            margin: '0 0 0 10',
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'title',
                            displayField: 'value',
                            valueField: 'value',
                            queryMode: 'local',
                            id: 'phoneDetailsprimaryContact'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            width: 84,
                            margin: '2 0 0 10',
                            xtype: 'button',
                            text: 'Primary',
                            handler : function(){
                                var cellPhoneNo = Ext.getCmp("phoneDetailsprimaryContact").value;
                                if(Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                    var existingPrimary = Ext.getCmp("phoneDetailsprimaryContact").findRecord("name", "PRIMARY").data.value;
                                    for (var i = 0; i < Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements.length; i++) {
                                        if (Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[0].innerHTML == cellPhoneNo.toString()) {
                                            Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].innerHTML = "PRIMARY";
                                            Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].className = "PRIMARY";
                                        }
                                        if (Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[0].innerHTML == existingPrimary.toString()) {
                                            Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].innerHTML = "ACTIVE";
                                            Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].className = "ACTIVE";
                                        }
                                    }
                                    Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo).data.name = "PRIMARY";
                                    Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(existingPrimary).data.name = "ACTIVE";
                                    Ext.getCmp("primaryNumber").setValue(cellPhoneNo);
                                }
                            }
                        },
                        {
                            width: 84,
                            margin: '2 0 0 2',
                            xtype: 'button',
                            text: 'Active',
                            handler : function(){
                                var cellPhoneNo = Ext.getCmp("phoneDetailsprimaryContact").value;
                                if(Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                    for (var i = 0; i < Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements.length; i++) {
                                        if (Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[0].innerHTML == cellPhoneNo.toString()) {
                                            Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].innerHTML = "ACTIVE";
                                            Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].className = "ACTIVE";
                                        }
                                    }
                                    Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo).data.name = "ACTIVE";
                                }
                            }
                        },
                        {
                            width: 84,
                            margin: '2 0 0 2',
                            xtype: 'button',
                            text: 'Inactive',
                            handler : function(){
                                var cellPhoneNo = Ext.getCmp("phoneDetailsprimaryContact").value;
                                if(Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                    if (!passwordWin) {
                                        var managerPassform = Ext.widget('form', {
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
                                                    inputType: 'password',
                                                    fieldLabel: 'Password',
                                                    id: 'managerPasswordInactive',
                                                    afterLabelTextTpl: required,
                                                    allowBlank: false
                                                }
                                            ],
                                            buttons: [
                                                {
                                                    text: 'Cancel',
                                                    handler: function () {
                                                        this.up('form').getForm().reset();
                                                        this.up('.window').close();
                                                    }
                                                },
                                                {
                                                    text: 'Proceed',
                                                    id: 'inactiveProceedBtn',
                                                    handler: function () {
                                                        CrmApp.view.PhoneDetailsForm.checkManagerCredentials(Ext.getCmp('managerPasswordInactive').value, "INACTIVE", 'inactiveProceedBtn');
                                                    }
                                                }
                                            ]
                                        });
                                        var passwordWin = Ext.widget('window', {
                                            title: 'Fill Password',
                                            closable: false,
                                            width: 300,
                                            height: 130,
                                            layout: 'fit',
                                            resizable: true,
                                            modal: true,
                                            items: managerPassform
                                        });
                                    }
                                    passwordWin.show();
                                }
                            }
                        },
                        {
                            width: 84,
                            margin: '2 0 0 2',
                            xtype: 'button',
                            text: 'Invalid',
                            handler : function(){
                                var cellPhoneNo = Ext.getCmp("phoneDetailsprimaryContact").value;
                                if(Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                    if (!passwordWin) {
                                        var managerPassform = Ext.widget('form', {
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
                                                    inputType: 'password',
                                                    fieldLabel: 'Password',
                                                    id: 'managerPasswordInvalid',
                                                    afterLabelTextTpl: required,
                                                    allowBlank: false
                                                }
                                            ],
                                            buttons: [
                                                {
                                                    text: 'Cancel',
                                                    handler: function () {
                                                        this.up('form').getForm().reset();
                                                        this.up('.window').close();
                                                    }
                                                },
                                                {
                                                    text: 'Proceed',
                                                    id: 'invalidProceedBtn',
                                                    handler: function () {
                                                        CrmApp.view.PhoneDetailsForm.checkManagerCredentials(Ext.getCmp('managerPasswordInvalid').value, "INVALID", 'invalidProceedBtn');
                                                    }
                                                }
                                            ]
                                        });
                                        var passwordWin = Ext.widget('window', {
                                            title: 'Fill Password',
                                            closable: false,
                                            width: 300,
                                            height: 130,
                                            layout: 'fit',
                                            resizable: true,
                                            modal: true,
                                            items: managerPassform
                                        });
                                    }
                                    passwordWin.show();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'component',
                            width: 342,
                            height: 185,
                            margin: '0 0 0 10',
                            id: 'phoneDetailscontactContainer'
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        checkManagerCredentials : function(mgrPassword, status, btnId){
            if(mgrPassword == "" || mgrPassword == undefined || mgrPassword == null){
                Ext.Msg.alert("Password", "Please enter manager password");
                return ;
            }else{
                Ext.Ajax.request({
                    url: '/crm/api/auth/managerCredentials',
                    params: {
                        "username" : userObj.USERNAME,
                        "password" : mgrPassword
                    },
                    success: function(response, opts){
                        var serverResponse = Ext.decode(response.responseText);
                        if(serverResponse.message === true){
                            for (var i = 0; i < Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements.length; i++) {
                                if (Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[0].innerHTML == Ext.getCmp("phoneDetailsprimaryContact").value.toString()) {
                                    Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].innerHTML = status;
                                    Ext.select('table#phoneDetailscontactContainerTbl tbody tr').elements[i].children[1].className = status;
                                }
                            }
                            Ext.getCmp("phoneDetailsprimaryContact").findRecordByValue(Ext.getCmp("phoneDetailsprimaryContact").value).data.name = status;
                            Ext.getCmp(btnId).up('.window').close();
                        }  if(serverResponse.message === false){
                            Ext.Msg.alert("Response", "Please contact your manager");
                        }
                    },
                    failure : function(response, opts){
                        Ext.Msg.alert("Error", response);
                    }

                })

            }

        }
    }
});