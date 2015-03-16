var gridHeight = Ext.getBody().getViewSize().height - 247;
Ext.define('CrmApp.view.DndDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dndDetailGrid',
    store : new Ext.data.Store({
        fields: ['CONTREF', 'USERID', 'LANGID', 'TEAMID', 'SUBTEAMID', 'USERNAME', 'TEAMNAME', 'SUBTEAMNAME', 'CONTNAME', 'PHONENO', 'LANGDESC', 'DNDREASON', 'DNDREMARKS', 'REQUESTDATE', 'REQUESTSTATUS'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    id: 'DndDetailGridPanel',
    width: 'auto',
    height: gridHeight,
    renderTo: 'complaintGrid',
    initComponent: function() {
        this.columns = [
            {header: "Rep", flex: 1, dataIndex: 'USERNAME'},
            {header: "Team", width: 120, dataIndex: 'TEAMNAME'},
            {header: "Sub-Team", width: 120, dataIndex: 'SUBTEAMNAME'},
            {header: "Contact Name", width: 120, dataIndex: 'CONTNAME'},
            {header: "Phone No.", width: 120, dataIndex: 'PHONENO'},
            {header: "Language", width: 120, dataIndex: 'LANGDESC'},
            {header: "DND Reasons", width: 120, dataIndex: 'DNDREASON'},
            {header: "DND Remarks", width: 120, dataIndex: 'DNDREMARKS'},
            {header: "Req Date", width: 120, dataIndex: 'REQUESTDATE'},
            {header: "Status", width: 120, dataIndex: 'REQUESTSTATUS',
                renderer: function(value, metaData, record, row, col, store, gridView) {
                    if(value == 'P'){
                        return 'Pending';
                    }
                    else if(value == 'A'){
                        return 'Approve';
                    }
                    else if(value == 'R'){
                        return 'Rejected';
                    }
                }
            }
        ];
        this.callParent(arguments);
    }
});