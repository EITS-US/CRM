Ext.define('CrmApp.view.TargetManagementFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.targetManagementFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype: 'container',
                bodyPadding: 0,
                layout: 'hbox',
                border: false,
                items: [
                    {
                        xtype: 'datefield',
                        name: 'targetDate',
                        fieldLabel: 'Target Date',
                        margin: '0 0 0 0',
                        allowBlank: false,
                        labelWidth : 80,
                        width: 240
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Get Target',
                id: 'getTargetBtn',
                width: 100,
                margin: '0 0 0 10'
            }
        ];
    }
});