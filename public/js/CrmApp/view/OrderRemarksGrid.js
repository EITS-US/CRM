Ext.define('CrmApp.view.OrderRemarksGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.orderRemarksGrid',
    id:'orderRemarksDetailGrid',
    store : new Ext.data.Store({
        fields: ['LASTUPDATEDON', 'REMARKS'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    initComponent: function() {
        this.columns = [
            {
                header: 'Order Date',
                dataIndex: 'LASTUPDATEDON',
                type: 'date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
                width: 100
            },
            {
                header: 'Remarks',
                dataIndex: 'REMARKS',
                flex: 1
            }
        ];
        this.callParent(arguments);
    }
});