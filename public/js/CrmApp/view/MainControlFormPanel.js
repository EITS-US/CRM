Ext.define('CrmApp.view.MainControlFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.mainControlFormPanel',
    renderTo: 'mainControlFormDiv',
	autoHeight: true,
	width : 310,
	bodyPadding: 0,
	margin: '13 0 0 0',
	initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype: 'radiogroup',
				cls: 'x-check-group-alt',
				items: [
					{
						boxLabel: 'Online',
						name: 'rb-auto',
						id: 'onlineRadio',
						inputValue: 1,
						checked: true,
						handler: function(ctl, val) {
							if(val){
								Ext.getCmp('logOutRadio').enable();
								Ext.getCmp('phoneCall').hide();
                                iosocket.emit('RELOGIN', { hello: 'Relogin after away/OutCall' });
							}
						}
					},
					{
						boxLabel: 'Away',
						name: 'rb-auto',
						inputValue: 2,
						handler: function(ctl, val) {
							if(val){
								Ext.getCmp('logOutRadio').disable();
								Ext.getCmp('phoneCall').hide();
                                Ext.getCmp('phoneCall').hide();
                                var awayWin = Ext.create('CrmApp.view.AwayWindow');
                                awayWin.show();
							}
						}
					},
					{
						boxLabel: 'Logout',
						name: 'rb-auto',
						id: 'logOutRadio',
						inputValue: 3,
						handler: function(ctl, val) {
                            if(val){
                                Ext.getCmp('phoneCall').hide();
                                var logoutWin = Ext.create('CrmApp.view.LogoutWindow');
                                logoutWin.show();
                            }
                        }
					},
					{
						boxLabel: 'Out Call',
						name: 'rb-auto',
                        id: 'outgoingCall',
						inputValue: 4,
						handler: function(ctl, val) {
							if(val){
								iosocket.emit('MANUALCALL', { hello: 'Calling Customer' });
								Ext.getCmp('logOutRadio').disable();
								var mb = Ext.MessageBox.wait("Loading...", 'Please Wait');
								setTimeout(function(){
									mb.close();
									Ext.getCmp('phoneCall').show();
								}, 2000);
							}
						}
					}
				]
            }
        ];
    }
});