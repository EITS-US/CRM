Ext.define('CrmApp.store.ComplaintDetail', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.ComplaintDetail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/complainDetail.json'
        },
        reader: {
            type: 'json',
            root: 'complains',
            successProperty: 'success'
        }
    }
});