var gridHeight = Ext.getBody().getViewSize().height - 200;
Ext.define('CrmApp.view.SubteamTargetGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.subteamTargetGrid',
    store : 'SubteamTargetGrid',
    width: 377,
    height: gridHeight,
    initComponent: function() {
        this.columns = [
            {
                header: 'Sub Team',
                dataIndex: 'subteam',
                flex: 1
            },
            {
                header: 'Target',
                dataIndex: 'target'
            }
        ];
        this.callParent(arguments);
    }
});