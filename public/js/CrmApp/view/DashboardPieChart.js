Ext.define('CrmApp.view.DashboardPieChart' ,{
    extend: 'Ext.chart.Chart',
    alias : 'widget.dashboardPieChart',
    store: 'DashboardChart',
    width: 585,
    height: 300,
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 30,
    theme: 'Base:gradients',
    series: [
        {
            type: 'pie',
            field: 'data1',
            showInLegend: true,
            donut: false,
            tips: {
                trackMouse: true,
                width: 140,
                height: 28,
                renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 71;
                    /*store.each(function(rec) {
                        total += rec.get('data1');
                    });*/
                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                }
            },
            highlight: {
                segment: {
                    margin: 20
                }
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true,
                font: '18px Arial'
            }
        }
    ],
    initComponent: function() {
        this.callParent(arguments);
    }
});