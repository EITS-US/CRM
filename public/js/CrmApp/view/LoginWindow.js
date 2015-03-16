Ext.define('CrmApp.view.LoginWindow' ,{

			extend: 'Ext.window.Window',
			alias : 'widget.loginWindow',
			closable : false,
			layout: 'fit',
			title:'User Authentication',
			resizable: false,
			modal: true,
			header: true,
			border: false,
			draggable: false,
			items:[
	{
	xtype: 'loginForm'
	}],
			defaultFocus: 'userName'

	});