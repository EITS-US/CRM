Ext.define('CrmApp.store.AgentTargetGrid', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.AgentTargetGrid'/*,
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
    }*/
});