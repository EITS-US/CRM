Ext.define('CrmApp.view.TargetManagementGridPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.targetManagementGridPanel',
    renderTo: 'complaintGrid',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    items: [
        {
            xtype: 'teamTargetGrid'
        },
        {
            xtype: 'subteamTargetGrid',
            margins: '0 0 0 10'
        },
        {
            xtype: 'agentTargetGrid',
            margins: '0 0 0 10'
        }
    ]
});