Ext.define('CrmApp.view.PaymentDetailsTab' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.paymentDetailsTab',
	layout: 'auto',
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
                    text: 'Save',
                    id:'editSavePayment',
                    margin: '7 0 0 0',
                    iconCls: 'savebutton',
                    handler: function() {
                        CrmApp.controller.CRMController.saveEditOrderDetail();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelPayment',
                    margin: '7 5 0 5',
                    iconCls: 'cancelbutton',
                    handler: function() {
                        Ext.getCmp('myProductDetailPanel').store.removeAll();
                        Ext.getCmp('myPaymentDetailPanel').store.removeAll();
                        iosocket.emit('CLOSEPOPUP', 'close');
                        this.up('.window').close();
                    }
                }
            ]
        }
    ],
    items: [
		{
			xtype: 'panel',
			layout: {
				type: 'column'
			},
			margin: '0 0 2 0',
			items: [
				{
					xtype: 'fieldset',
					columnWidth: 0.5,
					margin: '0 0 0 0',
					items: [
						{
							xtype: 'hidden',
							itemId: 'orderNo',
							fieldLabel: 'Total Due',
                            id: 'totalDue'
						},
                        {
                            xtype: 'displayfield',
                            id: 'netDue',
                            fieldLabel: 'Total Due',
                            value: 0
                        }
					]
				},
				{
					xtype: 'fieldset',
					columnWidth: 0.5,
					margin: '0 0 0 0',
					items: [
						{
							xtype: 'displayfield',
							itemId: 'itemCount',
                            id: 'totalPayable',
							fieldLabel: 'Total Payable'
						}
					]
				}
			]
		},
		{
			xtype: 'paymentDetailsForm'
		},
		{
			xtype: 'paymentDetailEntry'
		}
	]
});