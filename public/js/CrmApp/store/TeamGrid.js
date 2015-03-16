Ext.define('CrmApp.store.TeamGrid', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.TeamGrid',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/teamGrid.json'
        },
        reader: {
            type: 'json',
            root: 'teams',
            successProperty: 'success'
        }
    }
});