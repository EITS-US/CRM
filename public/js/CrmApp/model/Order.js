Ext.define('CrmApp.model.Order', {
	extend: 'Ext.data.Model',
	fields: [
		'product',
		'offer',
		'discount',
		'option',
		'qty',
		'unitPrice',
		'total'
	]
});