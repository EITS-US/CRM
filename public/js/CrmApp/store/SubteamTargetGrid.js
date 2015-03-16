Ext.define('CrmApp.store.SubteamTargetGrid', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.SubteamTargetGrid'/*,
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