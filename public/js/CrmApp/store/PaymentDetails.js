var currentOrder = 108;

Ext.define('CrmApp.store.PaymentDetails', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.PaymentDetail'/*,
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