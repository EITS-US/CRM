Ext.define('CrmApp.store.CallBackDetail', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.CallBackDetail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/callBackDetail.json'
        },
        reader: {
            type: 'json',
            root: 'callback',
            successProperty: 'success'
        }
    }
});