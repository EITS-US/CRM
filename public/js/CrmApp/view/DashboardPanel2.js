Ext.define('CrmApp.view.DashboardPanel2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dashboardPanel2',
    renderTo: 'complaintGrid',
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
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox'
                    },
                    width: 560,
                    height: 300,
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            margins: '20 0 0 0',
                            items: [
                                {
                                    xtype: 'component',
                                    html: 'Targeted :-',
                                    width: 100,
                                    cls: 'callNotificaion'
                                },
                                {
                                    xtype: 'component',
                                    html: '0',
                                    width: 100,
                                    cls: 'callNotificaion',
                                    id: 'targetedCalls'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            margins: '20 0 0 0',
                            items: [
                                {
                                    xtype: 'component',
                                    html: 'Achieved :-',
                                    width: 100,
                                    cls: 'callNotificaion'
                                },
                                {
                                    xtype: 'component',
                                    html: '0',
                                    width: 100,
                                    cls: 'callNotificaion',
                                    id: 'achievedCalls'
                                }
                            ]
                        }
                    ]
                },
                {xtype: 'dashboardBarDiagram'}
            ]
        }
    ]
});