Ext.define('CrmApp.model.Payment', {
	extend: 'Ext.data.Model',
	fields: [
		'paymentMode',
		'amount',
		'notes',
		'cardType',
		'nameOnCard',
		'cardNumber'
	]
});