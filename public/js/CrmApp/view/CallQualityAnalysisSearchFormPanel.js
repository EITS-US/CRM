Ext.define('CrmApp.view.CallQualityAnalysisSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.callQualityAnalysisSearchFormPanel',
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
                xtype: 'fieldset',
                title: 'Date Range',
                layout: 'vbox',
                width: 230,
                margin: '0 0 0 0',
                height: 78,
                items: [
                    {
                        xtype: 'datefield',
                        name: 'startDate',
                        fieldLabel: 'From',
                        margin: '0 0 5 0',
                        allowBlank: false,
                        labelWidth : 30,
                        width: 190
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        fieldLabel: 'To',
                        allowBlank: false,
                        labelWidth : 30,
                        width: 190
                    }
                ]
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'Find',
                width: 60,
                margin: '30 0 0 10',
                handler: function () {
                    alert('true');
                }
            }
        ];
    }
});