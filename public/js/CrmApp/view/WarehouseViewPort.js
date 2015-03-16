Ext.define('CrmApp.view.WarehouseViewPort', {
    extend: 'Ext.Viewport',
    alias : 'widget.warehouseViewPort',
    id: 'mainViewPort',
    layout: 'border',
    initComponent : function(){
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
                        contentEl: 'orderManagement',
                        title: 'Order Management',
                        iconCls: 'dashboard',
                        listeners: {
                            expand: function(){
                                vSearchFormPanel.destroy();
                                vDetailGridPanel.destroy();
                                vSearchFormPanel = Ext.create('CrmApp.view.OrderManagementFormPanel');
                                vDetailGridPanel = Ext.create('CrmApp.view.OrderManagementGrid');
                            }
                        }
                    }
                ]
            },
            {
                region: 'center',
                contentEl: 'center',
                title: 'Order Management',
                layout: 'fit'
            }
        ]
    }
});