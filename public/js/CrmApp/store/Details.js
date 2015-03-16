var currentLine = 4;

Ext.define('CrmApp.store.Details', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.Detail',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/details.json',
        },
        reader: {
            type: 'json',
            root: 'details',
            successProperty: 'success'
        }
    }
});