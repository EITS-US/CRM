Ext.define('CrmApp.view.OrderRemarks', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orderRemarks',
    border: false,
    items: [
        {
            xtype: 'orderRemarksGrid',
            height: 150
        }
    ]
});