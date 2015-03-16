Ext.define('CrmApp.view.OrderManagementGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.orderManagementGrid',
    renderTo: 'complaintGrid',
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
                xtype: 'component'
            }
        ];
    }
});