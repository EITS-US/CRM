Ext.define('CrmApp.view.CalPopup', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.calPopup',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	border: false,
	items: [
		{
			title: 'Call Form',
			xtype: 'callPopupForm'
		},
		{
			title: 'Scripts',
			xtype: 'CallPopupScripts'
		}
	]
});