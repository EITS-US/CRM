Ext.define('CrmApp.view.CommunicationReminderDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.communicationReminderDetailGrid',
    //store : 'CommunicationReminderDetail',
    store : new Ext.data.Store({
        fields: ['LASTUPDATEDON', 'TYPE', 'REMARKS', 'STATUS'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    id: 'CommunicationReminderDetailGridPanel',
    width: 565,
    height: 141,
    initComponent: function() {
        this.columns = [
            {
                header: 'Comm. Date',
                dataIndex: 'LASTUPDATEDON',
                type: 'date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                width: '80'
            },
            {
                header: 'Comm. Type',
                dataIndex: 'TYPE',
                width: '80'
            },
            {
                header: 'Notes',
                dataIndex: 'REMARKS',
                flex: 1
            },
            {
                header: 'Status',
                dataIndex: 'STATUS',
                flex: 1
            }
        ];
        this.callParent(arguments);
    }
});