Ext.define('CrmApp.view.OrderEntry' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.orderEntry',
	id: 'myOrderEntry',
    height: 650,
    activeItem: 0,
    layout: {
        type: 'card',
        deferredRender: true
    },
    dockedItems: [
		{
			xtype: 'container',
			dock: 'bottom',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			padding: '10 10 5',
			items: [
				{
					xtype: 'component',
					flex: 1
				},
				{
					xtype: 'button',
					width: 70,
					id: 'orderBack',
					text: 'Back',
					iconCls: 'prevbutton',
					disabled: true
				},
				{
					xtype: 'button',
					width: 70,
					text: 'Next',
					id: 'orderNext',
					iconCls: 'nextbutton',
					margin: '0 0 0 5',
                    disabled: true
				},
				{
					xtype: 'button',
					width: 70,
					text: 'Cancel',
					margin: '0 0 0 5',
					iconCls: 'cancelbutton',
					handler: function() {
                        var orderJson = {};
                        orderJson['ORDERLINES'] = new Array();
                        orderJson['PAYMENTLINES'] = new Array();
                        Ext.getCmp('myGridPanel').store.removeAll();
                        Ext.getCmp('myPaymentGridPanel').store.removeAll();
						this.up('.window').close();
					}
				}
			]
		}
	],
    // the panels (or "cards") within the layout
    items: [{
        id: 'card-0',
        xtype: 'panel1'	
    },{
        id: 'card-1',
        xtype: 'panel2'
    },{
        id: 'card-2',
        xtype: 'panel3'
    }]
});
