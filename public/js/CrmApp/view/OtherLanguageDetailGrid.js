var gridHeight = Ext.getBody().getViewSize().height - 247;
Ext.define('CrmApp.view.OtherLanguageDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.otherLanguageDetailGrid',
    store: 'OtherLanguageDetail',
    selType: 'rowmodel',
    id: 'OtherLanguageDetailGridPanel',
    width: 'auto',
    height: gridHeight,
    renderTo: 'complaintGrid',
    initComponent: function() {
        this.columns = [
            {header: "Call Time", width: 120, dataIndex: 'callTime'},
            {header: "Call Status", width: 120, dataIndex: 'callStaatus'},
            {header: "Phone No.", width: 120, dataIndex: 'phoneNumber'},
            {header: "Source", width: 120, dataIndex: 'source'},
            {header: "Product", width: 120, dataIndex: 'product'},
            /*{header: "Media", width: 120, dataIndex: 'media'},*/
            {header: "Language", width: 120, dataIndex: 'lang'},
            {header: "Option", width: 120, dataIndex: 'option'},
            {header: "Rep", width: 120, dataIndex: 'rep'},
            {header: "Team", width: 120, dataIndex: 'team'},
            {header: "Sub-Team", width: 120, dataIndex: 'subTeam'},
            {header: "Remarks", width: 120, dataIndex: 'remarks'}
        ];
        this.callParent(arguments);
    }
});