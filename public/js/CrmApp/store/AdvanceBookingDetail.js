/**
 * Created by kunalkrishna on 11/3/14.
 */

Ext.define('CrmApp.store.AdvanceBookingDetail', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.AdvanceBookingDetail',
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