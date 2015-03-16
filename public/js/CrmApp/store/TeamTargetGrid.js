Ext.define('CrmApp.store.TeamTargetGrid', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.TeamTargetGrid'/*,
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