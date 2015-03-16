var currentOrder = 108;

Ext.define('CrmApp.store.Payments', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.Payment'/*,
    autoLoad: true,

    proxy: {
        type: 'ajax',
        api: {
            read: '/js/CrmApp/store/payments.json',
        },
        reader: {
            type: 'json',
            root: 'orders',
            successProperty: 'success'
        }
    }*/
});