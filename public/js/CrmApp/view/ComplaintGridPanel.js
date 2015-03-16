var gridHeight = Ext.getBody().getViewSize().height - 260;
Ext.define('CrmApp.view.ComplaintGridPanel', {
    extend   : 'Ext.grid.Panel',
    alias    : 'widget.ComplaintGridPanel',
    requires : ['CrmApp.store.ComplaintStore'],
	renderTo: 'complaintGrid',
	width: 'auto',
    columns: [
		{text: "Call Start Time", width: 120, dataIndex: 'callStart', sortable: true},
		{text: "Call End Time", width: 120, dataIndex: 'callEnd', sortable: true},
		{text: "Extension", width: 120, dataIndex: 'extn', sortable: true},
		{text: "Duration", width: 120, dataIndex: 'duration', sortable: true},
		{text: "Customer", width: 120, dataIndex: 'customer', sortable: true},
		{text: "Phone Number", width: 120, dataIndex: 'phoneNum', sortable: true},
		{text: "Source", width: 120, dataIndex: 'source', sortable: true},
		{text: "Product", width: 120, dataIndex: 'product', sortable: true},
		{text: "Option", width: 120, dataIndex: 'option', sortable: true},
		{text: "Disposition", width: 120, dataIndex: 'disposition', sortable: true},
		{text: "Reasons", width: 120, dataIndex: 'reasons', sortable: true},
		{text: "Rep", width: 120, dataIndex: 'rep', sortable: true},
		{text: "Team", width: 120, dataIndex: 'team', sortable: true},
		{text: "Sub-Team", width: 120, dataIndex: 'subTeam', sortable: true},
		{text: "Media", width: 120, dataIndex: 'media', sortable: true},
		{text: "Language", width: 120, dataIndex: 'lang', sortable: true},
		{text: "Transferred", width: 120, dataIndex: 'transferred', sortable: true},
		{text: "Notes", width: 120, dataIndex: 'notes', sortable: true}
	],
	height: gridHeight,//firefox 377,//chrome 387,
	width: 'auto'
});