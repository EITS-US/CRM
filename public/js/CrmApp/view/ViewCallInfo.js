Ext.define('CrmApp.view.ViewCallInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewCallInfo',
    border: false,
    dockedItems: [
        {
            xtype: 'container',
            dock: 'left',
            layout: {
                type: 'vbox'
            },
            autoScroll: true,
            width: 250,
            padding: '5 0 0 0',
            id: 'callHistoryContainer'
        }
    ],
    items: [
        {
            xtype: 'container',
            width: 720,
            bodyPadding: 5,
            id: 'callInfoDetails'
        },
        {
            xtype: 'form',
            layout: 'column',
            labelAlign: 'top',
            width: 720,
            defaults: {
                xtype: 'container',
                layout: 'form',
                columnWidth: 1
            },
            bodyPadding: 0,
            border: false,
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'hidden',
                            id: 'contRefId'
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: 'Show Order History',
                            listeners: {
                                click : function(){
                                    var contRef = Ext.getCmp('contRefId').value;
                                    CrmApp.view.callPopupForm.loadOrderHistory(contRef, 'orderHistoryViewCallInfoDetailGrid');
                                }
                            }
                        }
                    ]
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
                    id: 'orderHistoryViewCallInfoDetailGrid'
                }
            ]

        }
    ],
    statics: {
    }
});