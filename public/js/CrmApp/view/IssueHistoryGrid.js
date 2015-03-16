Ext.define('CrmApp.view.IssueHistoryGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.issueHistoryGrid',
    store : new Ext.data.Store({
        fields: ['ISSUEDATE', 'ORDERREF', 'CARRIER', 'DELVREFNO', 'STATUS', 'PRODDESC', 'SIZEID', 'QTY', 'SHOWROOM'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    initComponent: function() {
        this.columns = [
            {
                header: 'Date',
                dataIndex: 'ISSUEDATE',
                flex: 1
            },
            {
                header: 'Order Ref.',
                dataIndex: 'ORDERREF',
                width: 80
            },
            {
                header: 'Carrier',
                dataIndex: 'CARRIER',
                width: 80
            },
            {
                header: 'Delv. Ref. No.',
                dataIndex: 'DELVREFNO',
                width: 80
            },
            {
                header: 'Goods Status',
                dataIndex: 'STATUS',
                width: 80
            },
            {
                header: 'Product',
                dataIndex: 'PRODDESC',
                width: 80
            },
            {
                header: 'Option',
                dataIndex: 'SIZEID',
                width: 80
            },
            {
                header: 'Qty',
                dataIndex: 'QTY',
                width: 80
            },
            {
                header: 'Showroom',
                dataIndex: 'SHOWROOM',
                width: 80
            }
        ];
        this.callParent(arguments);
    }
});