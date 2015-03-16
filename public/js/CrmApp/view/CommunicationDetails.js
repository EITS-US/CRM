Ext.define('CrmApp.view.CommunicationDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.communicationDetails',
    border: false,
    items: [
        {
            xtype: 'communicationDetailsGrid',
            height: 150
        }
    ]
});