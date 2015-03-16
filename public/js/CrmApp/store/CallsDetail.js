var currentOrder = 108;

Ext.define('CrmApp.store.CallsDetail', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.CallDetail',
    autoLoad: false,
    proxy: {
     type: 'ajax',
     api: {
        read: '/js/CrmApp/store/callsDetail.json'
     },
     reader: {
         type: 'json',
         root: 'orders',
         successProperty: 'success'
     }
    }
});