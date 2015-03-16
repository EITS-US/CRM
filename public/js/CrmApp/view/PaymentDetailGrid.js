Ext.define('CrmApp.view.PaymentDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.paymentDetailGrid',
    store : new Ext.data.Store({
        fields: ['PAYMENTMODEID','PAYMENTMODEIDDESC','PAYMENTCOURIEREXECID','PAYMENTCOURIEREXECDESC', 'PAYMENTMODE','PAYMENTMODEDESC', 'PAYMENTAMOUNT', 'PAYMENTBANKID', 'PAYMENTBANKNAME', 'CARDTYPE', 'NAMEONCARD', 'AUTHCODE', 'PAYMENTREMARKS', 'USERID', 'USERDESC'],
        autoLoad: false
    }),
    selType: 'rowmodel',
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

