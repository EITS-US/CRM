var gridHeight = Ext.getBody().getViewSize().height - 200;
Ext.define('CrmApp.view.TeamTargetGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.teamTargetGrid',
    store : 'TeamTargetGrid',
    width: 377,
    height: gridHeight,
    initComponent: function() {
        this.columns = [
            {
                header: 'Team',
                dataIndex: 'team',
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