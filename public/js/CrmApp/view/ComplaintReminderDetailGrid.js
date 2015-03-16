Ext.define('CrmApp.view.ComplaintReminderDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.complaintReminderDetailGrid',
    //store : 'ComplaintReminderDetail',
    store : new Ext.data.Store({
        fields: ['COMPLAINTREF', 'CREATIONDATE', 'ORDERREF', 'CATEGORY', 'STATUS'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    id : 'ComplaintReminderDetailGridPanel',
    width: 565,
    height: 141,
    listeners: {
        itemclick: function(dataview, record, item, index, e) {
            Ext.Ajax.request({
                url: '/crm/api/getComplaintHistory/'+record.data["COMPLAINTREF"],
                success: function(response, opts){
                    var dataProduct = Ext.decode(response.responseText);
                    var productStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['LASTUPDATEDON', 'TYPE', 'REMARKS', 'STATUS'],
                        data: dataProduct
                    });
                    Ext.getCmp('CommunicationReminderDetailGridPanel').bindStore(productStore);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    },
    initComponent: function() {
        this.columns = [
            {
                header: 'Complaint No.',
                dataIndex: 'COMPLAINTREF',
                flex: 1
            },
            {
                header: 'Complaint Date',
                dataIndex: 'CREATIONDATE',
                type: 'date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                width: '80'
            },
            {
                header: 'Order Ref. No.',
                dataIndex: 'ORDERREF',
                width: '80'
            },
            {
                header: 'Category',
                dataIndex: 'CATEGORY',
                width: '80'
            },
            {
                header: 'Status',
                dataIndex: 'STATUS',
                width: '40'
            }
        ];
        this.callParent(arguments);
    }
});