Ext.define('CrmApp.view.DashboardChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.dashboardChart',
    store: 'DashboardChart',
    width: 560,
    height: 300,
    axes: [
        {
            title: 'Sample Values',
            type: 'Numeric',
            position: 'left',
            fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
            grid: true,
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
                }
            },
            minimum: 0,
            adjustMinimumByMajorUnit: 0
        },
        {
            title: 'Sample Metrics',
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            grid: true,
            label: {
                rotate: {
                    degrees: 315
                }
            }
        }
    ],
    series: [
        {
            type: 'area',
            highlight: false,
            axis: 'left',
            xField: 'name',
            yField: ['data1', 'data2', 'data3', 'data4', 'data5']
        }
    ],
    initComponent: function() {
        this.callParent(arguments);
    }
});