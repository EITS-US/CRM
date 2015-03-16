Ext.define('CrmApp.view.SendSmsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sendSmsForm',
    border: false,
    layout: 'column',
    labelAlign: 'top',
    height: 550,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 1
    },
    bodyPadding: 5,
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
                    text: 'Send',
                    id:'editSaveSendSMS',
                    margin: '5 0 0 0',
                    iconCls: 'sendButton',
                    handler: function() {
                        //CrmApp.controller.CRMController.saveEditOrderDetail();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelSendSMS',
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
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Phone No.',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            name: 'smsPhoneNo',
                            id: 'smsPhoneNo'
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
                            xtype: 'label',
                            text: 'SMS Templates',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'smsTemplates',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [

                                ]
                            })
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
                            xtype: 'label',
                            text: 'Message',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            name: 'smsMessage',
                            id: 'smsMessage'
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
                            xtype: 'label',
                            text: 'Notes',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            name: 'smsRemarks',
                            id: 'smsRemarks'
                        }
                    ]
                }
            ]
        }
    ]
});