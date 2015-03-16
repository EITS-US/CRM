Ext.define('CrmApp.view.Panel3' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.panel3',
	layout: 'auto',
	border: false,
    items: [
		{
			xtype: 'panel',
            border: false,
			layout: {
				type: 'column'
			},
			items: [
				{
					xtype: 'fieldset',
					columnWidth: 0.5,
					defaults: {
						width: 400
					},
					items: [
						{
                            xtype: 'hidden',
                            id: 'totalDue',
                            fieldLabel: 'Total Due',
                            value: 0
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
					defaults: {
						width: 400
					},
					items: [
						{
							xtype: 'displayfield',
							id: 'totalPayable',
							fieldLabel: 'Total Payable',
                            value: 0
						}
					]
				}
			]
		},
		{
			xtype: 'paymentEntry'
		},
		{
			xtype: 'paymentDetailGrid',
            id: 'myPaymentGridPanel',
            width: 486,
            height: 180,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Edit',
                            handler: function (){
                                var selection = Ext.getCmp('myPaymentGridPanel').getSelectionModel().getSelection()[0];
                                if(selection){
                                    var selectedPayData = selection.data;
                                    var rowIndex = Ext.getCmp('myPaymentGridPanel').store.indexOf(selection);
                                    Ext.getCmp('editPaymentId').setValue(rowIndex);
                                    Ext.getCmp('paymentMode').setValue(selectedPayData.PAYMENTMODEDESC);
                                    Ext.getCmp('paymentAmount').setValue(selectedPayData.PAYMENTAMOUNT);
                                    Ext.getCmp('paymentBank').setValue(selectedPayData.PAYMENTBANKID);
                                    Ext.getCmp('cardType').setValue({rbCardType: selectedPayData.CARDTYPE});
                                    Ext.getCmp('nameOnCard').setValue(selectedPayData.NAMEONCARD);
                                    Ext.getCmp('authCode').setValue(selectedPayData.AUTHCODE);
                                    Ext.getCmp('paymentNotes').setValue(selectedPayData.PAYMENTREMARKS);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            handler: function (){
                                var selection = Ext.getCmp('myPaymentGridPanel').getSelectionModel().getSelection()[0];
                                if(selection){
                                    var selectedPayData = selection.data;
                                    var currentDue = parseFloat(Ext.getCmp('totalDue').value);
                                    currentDue = currentDue+parseFloat(selectedPayData.PAYMENTAMOUNT);
                                    Ext.getCmp('totalDue').setValue(currentDue);

                                    Ext.getCmp('myPaymentGridPanel').store.remove(selection);

                                    var grossPayment = 0;
                                    for(var i=0; i<Ext.getCmp('myPaymentGridPanel').store.data.items.length; i++){
                                        grossPayment += Ext.getCmp('myPaymentGridPanel').store.data.items[i].data.PAYMENTAMOUNT;
                                    }
                                    Ext.getCmp('grossPayment').setValue(grossPayment);
                                    Ext.getCmp('totalPayable').setValue(grossPayment);
                                    Ext.getCmp('editPaymentId').setValue('');
                                    CrmApp.view.PaymentEntry.toogleNextBtn();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Total',
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            width : 50,
                            editable: false,
                            id: 'grossPayment',
                            value: 0
                        }
                    ]
                }
            ]
        }
	]
});