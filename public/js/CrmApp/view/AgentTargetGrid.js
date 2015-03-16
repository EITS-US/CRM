var gridHeight = Ext.getBody().getViewSize().height - 200;
Ext.define('CrmApp.view.AgentTargetGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.agentTargetGrid',
    store : 'AgentTargetGrid',
    width: 377,
    height: gridHeight,
    initComponent: function() {
        this.columns = [
            {
                header: 'Agent',
                dataIndex: 'agent',
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