Ext.define('CrmApp.view.Panel2' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.panel2',
    layout: 'auto',
	border: false,
	items: [
		{
			xtype: 'deliveryDetail'
		}
	]   
});