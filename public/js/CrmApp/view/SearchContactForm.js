Ext.define('CrmApp.view.SearchContactForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.searchContactForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    dockedItems: [
        {
            xtype: 'container',
            dock: 'top',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '5 5 5 5',
            items: [
                {
                    xtype: 'label',
                    text: 'Select Order Ref/Contact No. to search',
                    margins: '0 0 0 10'
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
                    id: 'orederRefSearchContact',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'combo',
                            name:'searchOrder',
                            id:'searchOrder',
                            queryMode:'local',
                            value: 'Order Ref',
                            displayField:'name',
                            valueField: 'value',
                            autoSelect: true,
                            forceSelection: true,
                            margins: '5 5 5 5',
                            width: 140,
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data: [
                                    {name: 'Order Ref', value: 'Order Ref'},
                                    {name: 'Contact No', value: 'Contact No'}
                                ]
                            }),
                            listeners: {
                                select: function(combo){
                                    Ext.getCmp('orderRef').setValue('');
                                    if(combo.value == 'Order Ref'){
                                        Ext.getCmp('orderRef').inputEl.set({maxLength : 16})
                                    }
                                    else{
                                        Ext.getCmp('orderRef').inputEl.set({maxLength : 10})
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            width: 180,
                            name: 'orderRef',
                            id: 'orderRef',
                            margins: '5 0 0 5',
                            maxLength: 16,
                            enableKeyEvents: true,
                            listeners:{
                                keyup : function (textfield, e, options) {
                                    if (Ext.getCmp('searchOrder').getValue() == "Order Ref" && Ext.getCmp('orderRef').getValue().length == 16){
                                        var store = Ext.create('Ext.data.Store', {
                                            autoLoad: true,
                                            autoSync: true,
                                            model: 'CrmApp.model.SearchContactDetail',
                                            proxy: {
                                                type: 'ajax',
                                                url: '/crm/api/getCustomerAddByOrder/' + Ext.getCmp('orderRef').value,
                                                reader: {
                                                    type: 'json'
                                                }
                                            }
                                        });
                                        Ext.getCmp('searchContactDetailGrid').bindStore(store);
                                    }
                                   else if (Ext.getCmp('searchOrder').getValue() == "Contact No" && Ext.getCmp('orderRef').getValue().length == 10) {
                                        var store = Ext.create('Ext.data.Store', {
                                            autoLoad: true,
                                            autoSync: true,
                                            model: 'CrmApp.model.SearchContactDetail',
                                            proxy: {
                                                type: 'ajax',
                                                url: '/crm/api/getCustomerAddByContactNo/' + Ext.getCmp('orderRef').value,
                                                reader: {
                                                    type: 'json'
                                                }
                                            }
                                        });
                                        Ext.getCmp('searchContactDetailGrid').bindStore(store);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            text: 'Orders',
                            iconCls: 'savebutton',
                            margins: '5 0 0 5',
                            handler: function () {
                                if(Ext.getCmp('searchContactDetailGrid').getStore().getCount() > 0){
                                    var contRef = Ext.getCmp('searchContactDetailGrid').getSelectionModel().getSelection()[0].get('CONTREF');
                                    CrmApp.view.callPopupForm.loadOrderHistory(contRef, 'orderHistoryDetailGrid1');
                                }
                            }
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
                            xtype: 'searchContactDetailGrid'
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
                            xtype: 'orderHistoryDetailGrid',
                            height: 280,
                            id: 'orderHistoryDetailGrid1'
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
                            width : 70,
                            id: 'closeNotInterested',
                            text: 'Close',
                            iconCls: 'endCall',
                            margins: '0 0 0 10',
                            handler: function () {
                                this.up('.window').close();
                            }
                        }
                    ]
                }
            ]
        }
    ]
});