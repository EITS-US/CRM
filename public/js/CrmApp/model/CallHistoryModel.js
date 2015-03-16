Ext.define('CrmApp.model.CallHistoryModel', {
	extend: 'Ext.data.Model',
	fields: [
		'CALLSTARTTIME',
		'CALLERNO',
        'USERDESC',
		'TEAMDESC',
		'SUBTEAMDESC',
		'DISPO[0].DISPDESC',
		'DISPO[0].PRODUCTS',
        'LANGDESC'
	]
});