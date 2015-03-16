Ext.define('CrmApp.store.OrderDetail', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.OrderDetail',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/orderDetail.json'
        },
        reader: {
            type: 'json',
            root: 'orders',
            successProperty: 'success'
        }
    }
});