Ext.define('CrmApp.view.TeamManagementGridPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.teamManagementGridPanel',
    renderTo: 'complaintGrid',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    items: [
        {
            xtype: 'teamMainGrid'
        },
        {
            xtype: 'teamGrid',
            margins: '0 0 0 10'
        }
    ]
});