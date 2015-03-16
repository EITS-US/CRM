Ext.define('CrmApp.view.DndRequestForm' , {
    extend: 'Ext.form.Panel',
    alias: 'widget.dndRequestForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function () {
            //CrmApp.view.NonSaleCallForm.loadNonSaleCallReasons();
        }
    },

    items: [
        {
            xtype: 'fieldset',
            collapsible: false,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 10, right: 0, bottom: 0, left: 0}
                },
                hideLabel: true
            },
            items: [
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Reason for DND',
                            margins: '10 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Reason for DND',
                            hiddenName: 'DND',
                            id: 'dndRequestsReasons',
                            name:'dnd',
                            width:300,
                            store: new Ext.data.SimpleStore({
                                data: [
                                    [1, 'Customer Shouting'],
                                    [2, 'Customer does not want call From Telebuy']

                                ],
                                id: 0,
                                fields: ['name', 'value']
                            }),
                            valueField: 'value',
                            displayField: 'value',
                            triggerAction: 'all',
                            editable: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Remarks:',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            allowBlank: false,
                            minLength: 10,
                            name: 'dndRequestsNotes',
                            id: 'dndRequestsNotes',
                            rows: 5
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'component',
                            flex : 1
                        },
                        {
                            xtype: 'button',
                            width : 150,
                            id: 'saveDndForm',
                            text: 'Submit for Approval',
                            formBind: true,
                            margins: '0 0 0 15',
                            iconCls: 'savebutton',
                            handler: function(){
                                CrmApp.view.DndRequestForm.saveDNDRequest();

                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeDndForm',
                            text: 'Close',
                            iconCls: 'endCall',
                            margins: '0 0 0 15',
                            handler: function () {
                                this.up('.window').close();
                            }
                        }
                    ]
                }
            ]
        }
    ],
    statics: {

        saveDNDRequest: function(){
            var formJson = {};

            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            formJson['DNDREASON'] = Ext.getCmp("dndRequestsReasons").getValue();
            formJson['DNDREMARKS'] = Ext.getCmp("dndRequestsNotes").getValue();
            formJson['CONTREF'] = Ext.getCmp('contRefId').getValue();
            formJson['USERID'] = userObj.USERID;
            formJson['USERNAME'] = userObj.USERNAME;
            formJson['TEAMNAME'] = userObj.TEAMNAME;
            formJson['SUBTEAMNAME'] = userObj.SUBTEAMNAME;
            formJson['PHONENO'] = Ext.getCmp("primaryNumber").getValue().toString();
            formJson['CONTNAME'] = customerName;
            formJson['REQUESTDATE'] = new Date().toISOString();
            formJson['REQUESTSTATUS'] = "P";
            formJson['TEAMID'] = userObj.teamid;
            formJson['SUBTEAMID'] =userObj.subteamid;
            formJson['LANGDESC'] = Ext.getCmp("languageCombo").rawValue;
            formJson['LANGID'] = Ext.getCmp('languageCombo').value;

            var formJsonString = JSON.stringify(formJson);
            Ext.Ajax.request({
                url: '/crm/api/dndRequests',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'POST',
                success: function(response, opts){

                    var resp  = Ext.decode(response.responseText);
                    if(resp.message == "true"){
                        Ext.Msg.alert("DND", "Customer Information updated");
                        Ext.getCmp('saveDndForm').up('.window').close();
                    }
                    if(resp.message == "false"){
                        Ext.Msg.alert("DND", "request already in pending status");
                    }


                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }

    }
})