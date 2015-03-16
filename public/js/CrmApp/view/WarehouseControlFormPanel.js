Ext.define('CrmApp.view.WarehouseControlFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.warehouseControlFormPanel',
    renderTo: 'mainControlFormDiv',
    autoHeight: true,
    width : 80,
    bodyPadding: 0,
    margin: '13 2 0 0',
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
                        boxLabel: 'Logout',
                        name: 'rb-auto',
                        id: 'logOutRadio',
                        inputValue: 3,
                        handler: function(ctl, val) {
                            if(val){
                                var logoutWin = Ext.create('CrmApp.view.LogoutWindow');
                                logoutWin.show();
                            }
                        }
                    }
                ]
            }
        ];
    }
});