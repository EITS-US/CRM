Ext.define('CrmApp.view.CommunicationDetailsGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.communicationDetailsGrid',
    store : new Ext.data.Store({
        fields: ['DATE', 'TYPE', 'STATUS', 'DELVDATE', 'RECEIVEDBY', 'PRODDESC', 'REMARKS'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    initComponent: function() {
        this.columns = [
            {
                header: 'Comm. Date',
                dataIndex: 'DATE',
                flex: 1
            },
            {
                header: 'Comm. Type',
                dataIndex: 'TYPE',
                width: '80'
            },
            {
                header: 'Goods Status',
                dataIndex: 'STATUS',
                width: '80'
            },
            {
                header: 'Delivered On',
                dataIndex: 'DELVDATE',
                width: '80'
            },
            {
                header: 'Received By',
                dataIndex: 'RECEIVEDBY',
                width: '40'
            },
            {
                header: 'Product',
                dataIndex: 'PRODDESC',
                width: '80'
            },
            {
                header: 'Notes',
                dataIndex: 'REMARKS',
                width: '80'
            }
        ];
        this.callParent(arguments);
    }
});