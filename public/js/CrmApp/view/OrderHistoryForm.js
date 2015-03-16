Ext.define('CrmApp.view.OrderHistoryForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orderHistoryForm',
    border: false,
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
                    text: 'Close',
                    id:'editCancelOrderHistory',
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
            xtype: 'orderHistoryDetailGrid',
            height: 491,
            width: 486,
            border: false,
            id: 'editOrderHistoryDetailGrid',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Show Order History',
                            width:150,
                            handler: function(){
                                var contRef = Ext.getCmp('contRefIdEdit').value;
                                CrmApp.view.callPopupForm.loadOrderHistory(contRef, 'editOrderHistoryDetailGrid');
                            }
                        }
                    ]
                }
            ]
        }
    ]
});