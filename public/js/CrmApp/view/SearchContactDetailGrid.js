Ext.define('CrmApp.view.SearchContactDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.searchContactDetailGrid',
    store : 'SearchContactDetail',
    id:'searchContactDetailGrid',
    selType: 'rowmodel',
    width: 720,
    height: 100,
    initComponent: function() {
        this.columns = [
            {
                header: 'Name',
                dataIndex: 'CONTNAME',
                autoSizeColumn: true,
                flex: 1

            },
            {
                header: 'Contref',
                hidden: true,
                dataIndex: 'CONTREF',
                autoSizeColumn: true,
                minWidth: 120
            },
            {
                header: 'OrderId',
                hidden: true,
                dataIndex: 'ORDERREF',
                autoSizeColumn: true,
                minWidth: 120
            },
            {
                header: 'Phone',
                dataIndex: 'CALLBACKCCONTACTNO',
                autoSizeColumn: true,
                minWidth: 100
            },
            {
                header: 'City',
                dataIndex: 'DELVCITY',
                autoSizeColumn: true,
                minWidth: 80
            },
            {
                header: 'Country',
                dataIndex: 'DELVCOUNTRY',
                autoSizeColumn: true,
                minWidth: 80
            }
        ];
        this.callParent(arguments);
    }
});