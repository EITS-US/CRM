Ext.define('CrmApp.view.UserViewPort', {
    extend: 'Ext.Viewport',
	alias : 'widget.userViewPort',
    id: 'mainViewPort',
	layout: 'border',
	initComponent : function() {
		//console.log("Hello");
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
		return [
			{
				region: 'north',
				contentEl: 'north',
				height: 85
			}, {
				region: 'south',
				contentEl: 'south',
				height: 46
			},
			{
				region: 'east',
				contentEl: 'east',
				title: 'East Side',
				animCollapse: true,
				collapsible: true,
                collapsed: true,
				split: true,
				width: 225,
				minSize: 225,
				maxSize: 225,
				margins: '0 0 0 0'
			},
			{
				region: 'west',
				id: 'west-panel',
				title: 'Navigator',
				split: true,
				width: 200,
				minWidth: 200,
				maxWidth: 200,
				collapsible: true,
				animCollapse: true,
				margins: '0 0 0 0',
				layout: 'accordion',
				items: [
                    {
                        contentEl: 'dashboard',
                        title: 'Dashboard',
                        iconCls: 'dashboard',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.DashboardPanel1');
                                vDetailGridPanel = Ext.create('CrmApp.view.DashboardPanel2');
                            }
                        }
                    },
					{
						contentEl: 'complaints',
						title: 'Complaints',
                        id:'complaintTab',
						iconCls: 'complaints',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.ComplaintsSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.ComplaintDetailGrid');
                            }
                        }
					},
					{
						contentEl: 'order',
						title: 'Order',
                        id:'orderTab',
						iconCls: 'order',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.OrderSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.OrderDetailGrid');
                            }
                        }
					},
					{
						contentEl: 'callBack',
						title: 'Call Back',
                        id:'callbackTab',
						iconCls: 'callBack',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.CallBackSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.CallBackDetailGrid');
                            }
                        }
					},
					{
						contentEl: 'calls',
						title: 'Calls',
                        id:'callsTab',
						iconCls: 'calls',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.CallSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.CallsDetailGrid');
                            }
                        }
					},
                    {
                        contentEl: 'advanceBooking',
                        title: 'Advance Booking',
                        id:'advanceBookingTab',
                        iconCls: 'advanceBooking',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.AdvanceBookingSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.AdvanceBookingDetailGrid');
                            }
                        }
                    },
					{
						contentEl: 'otherLanguage',
						title: 'Other Language',
                        id:'otherLanguageTab',
						iconCls: 'otherLanguage',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.OtherLanguageSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.OtherLanguageDetailGrid');
                            }
                        }
					},

					{
						contentEl: 'dndApprovalRejection',
						title: 'DND Approval/ Rejection',
                        id: 'dndApprovalTab',
						iconCls: 'dndApprovalRejection',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.DndSearchFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.DndDetailGrid');
                            }
                        }
					},
					{
						contentEl: 'attendance',
						title: 'Attendance',
                        id: 'attendanceTab',
						iconCls: 'attendance',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                            }
                        }
					},
                    {
                        contentEl: 'administrator',
                        title: 'Admin',
                        id: 'adminTab',
                        iconCls: 'administrator',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.UserManagementFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.UserManagementGridPanel');
                            }
                        }
                    }
				]
			},
			{
				region: 'center',
				contentEl: 'center',
				title: 'Report',
				layout: 'fit'
			}
		]
	}
});