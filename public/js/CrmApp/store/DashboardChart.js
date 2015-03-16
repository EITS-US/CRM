Ext.define('CrmApp.store.DashboardChart', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.DashboardChart',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/dashboardChart.json'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});