Ext.define('CrmApp.view.DashboardBarDiagram' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.dashboardBarDiagram',
    store: 'DashboardChart',
    width: 585,
    height: 300,
    axes: [
        {
            title: 'Sample Metrics',
            type: 'Category',
            position: 'left',
            fields: ['name']
        },
        {
            title: 'Sample Values',
            type: 'Numeric',
            position: 'bottom',
            fields: ['data1'],
            grid: true,
            minimum: 0,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            }
        }
    ],
    series: [
        {
            type: 'bar',
            highlight: false,
            axis: 'bottom',
            highlight: true,
            tips: {
                trackMouse: true,
                width: 140,
                height: 28,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
                }
            },
            label: {
                display: 'insideEnd',
                field: 'data1',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333',
                'text-anchor': 'middle'
            },
            xField: 'name',
            yField: ['data1']
        }
    ],
    initComponent: function() {
        this.callParent(arguments);
    }
});