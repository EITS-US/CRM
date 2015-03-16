Ext.define('CrmApp.view.DashboardPanel1', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboardPanel1',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '5 5 5 5',
            items: [
                {xtype: 'dashboardChart'},
                {xtype: 'dashboardPieChart'}
            ]
        }
    ]
});