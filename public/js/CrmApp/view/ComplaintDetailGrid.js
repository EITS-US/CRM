var gridHeight = Ext.getBody().getViewSize().height - 269;
Ext.define('CrmApp.view.ComplaintDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.complaintDetailGrid',
    store : 'ComplaintDetail',
    selType: 'rowmodel',
    id: 'complaintDetailGridPanel',
    width: 'auto',
    height: gridHeight,
    renderTo: 'complaintGrid',
    listeners: {
        render: function() {
            Ext.getCmp('editOrderContextMenu').hide();
            Ext.getCmp('printAuthContextMenu').hide();
            Ext.getCmp('emailAuthContextMenu').hide();
            Ext.getCmp('approveOrderContextMenu').hide();
        },
        itemcontextmenu: function(view, record, item, index, e){
            e.stopEvent();
            vGridContextMenus.showAt(e.getXY());
        }
    },
    initComponent: function() {
        this.columns = [
            {
                header: "Complaint On",
                width: 120,
                dataIndex: 'CREATIONDATE',
                type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                header: "Complaint No.",
                width: 120,
                dataIndex: 'COMPLAINTREF'
            },
            {
                header: "Status",
                width: 120,
                dataIndex: 'STATUS'
            },
            {
                header: "Category",
                width: 120,
                dataIndex: 'CATEGORY'
            },
            {
                header: "Complaint Type",
                width: 120,
                dataIndex: 'TYPE'
            },
            {
                header: "Duration",
                width: 120,
                dataIndex: 'DURATION'
            },
            {
                header: "Source",
                width: 120,
                dataIndex: 'SOURCE'
            },
            {
                header: "Customer Name",
                width: 120,
                dataIndex: 'CUSTOMERNAME'
            },
            {
                header: "Order Ref. No.",
                width: 120,
                dataIndex: 'ORDERREF'
            },
            {
                header: "Order Status",
                width: 120,
                dataIndex: 'ORDERS[0].ORDERSTATUS',
                renderer: function(value, metaData, record, row, col, store, gridView){
                    if(value ==='A')
                        return 'Authorized';
                    else if(value ==='P')
                        return 'Pending';
                    return value;
                }
            },
            {
                header: "Order Date",
                width: 120,
                dataIndex: 'ORDERS[0].ORDERDATE',
                type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }
        ];
        this.callParent(arguments);
    }
});