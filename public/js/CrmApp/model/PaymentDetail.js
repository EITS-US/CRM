Ext.define('CrmApp.model.PaymentDetail', {
	extend: 'Ext.data.Model',
	fields: [
        'PAYMENTMODEID',
        'PAYMENTMODE',
        'PAYMENTMODEIDDESC',
        'PAYMENTMODEDESC',
        'PAYMENTAMOUNT',
        'PAYMENTBANKID',
        'PAYMENTBANKNAME',
        'CARDTYPE',
        'NAMEONCARD',
        'AUTHCODE',
        'PAYMENTREMARKS',
        'ISNEW',
        'USERDESC',
        'USERID',
        'PAYMENTLINEID'
    ]

});