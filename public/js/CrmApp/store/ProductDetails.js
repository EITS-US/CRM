var currentOrder = 108;

Ext.define('CrmApp.store.ProductDetails', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.ProductDetail'/*,
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/orders.json',
        },
        reader: {
            type: 'json',
            root: 'orders',
            successProperty: 'success'
        }
    }*/
});