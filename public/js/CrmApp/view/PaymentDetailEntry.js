Ext.define('CrmApp.view.PaymentDetailEntry', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.paymentDetailEntry',
    store : 'PaymentDetails',
    selType: 'rowmodel',
	id: 'myPaymentDetailPanel',
	height: 218,
    border: false,
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			items: [
				{
					xtype: 'button',
					text: 'Edit',
                    handler: function (){
                        var selection = Ext.getCmp('myPaymentDetailPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selectedPaymentData = selection.data;
                            var  isnew = selectedPaymentData.ISNEW;
                            if(!isnew){
                                alert('This item cannot be edited,Please add new entry.');
                            }
                            else{
                                var rowIndex = Ext.getCmp('myPaymentDetailPanel').store.indexOf(selection);
                                Ext.getCmp('editPaymentId').setValue(rowIndex);
                                Ext.getCmp('paymentMode').setValue(selectedPaymentData.PAYMENTMODEDESC);
                                Ext.getCmp('paymentAmount').setValue(selectedPaymentData.PAYMENTAMOUNT);
                                Ext.getCmp('paymentBank').setValue(selectedPaymentData.PAYMENTBANKID);
                                Ext.getCmp('cardType').setValue({rbCardType: selectedPaymentData.CARDTYPE});
                                Ext.getCmp('nameOnCard').setValue(selectedPaymentData.NAMEONCARD);
                                Ext.getCmp('authCode').setValue(selectedPaymentData.AUTHCODE);
                                Ext.getCmp('paymentNotes').setValue(selectedPaymentData.PAYMENTREMARKS);
                            }
                        }
                    }
				},
				{
					xtype: 'button',
					text: 'Remove',
                    handler: function (){
                        var selection = Ext.getCmp('myPaymentDetailPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selectedPaymentData = selection.data;
                            var  isnew = selectedPaymentData.ISNEW;
                            if(!isnew){
                                alert('This item cannot be removed,Please add new entry.');
                            }
                            else{
                                var currentDue = parseFloat(Ext.getCmp('totalDue').value);
                                currentDue = currentDue+parseFloat(selectedPaymentData.PAYMENTAMOUNT);
                                Ext.getCmp('totalDue').setValue(currentDue);

                                Ext.getCmp('myPaymentDetailPanel').store.remove(selection);

                                var grossPayment = 0;
                                for(var i=0; i<Ext.getCmp('myPaymentDetailPanel').store.data.items.length; i++){
                                    grossPayment += Ext.getCmp('myPaymentDetailPanel').store.data.items[i].data.PAYMENTAMOUNT;
                                }
                                Ext.getCmp('grossPayment').setValue(grossPayment);
                                Ext.getCmp('totalPayable').setValue(grossPayment);
                                Ext.getCmp('editPaymentId').setValue('');
                            }
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
	],    
    initComponent: function() {        
    	this.columns = [
            {
                header: 'Payment Mode',
                dataIndex: 'PAYMENTMODEDESC',
                flex: 1
            },
            {
                header: 'Card Type',
                dataIndex: 'CARDTYPE',
                width: '80'
            },
            {
                header: 'Name on Card',
                dataIndex: 'NAMEONCARD',
                width: '120'
            },
            {
                header: 'Amount',
                dataIndex: 'PAYMENTAMOUNT',
                width: '80'
            }
        ];
        this.callParent(arguments);
    }
});