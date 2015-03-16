Ext.define('CrmApp.store.TeamMainGrid', {
    extend: 'Ext.data.Store',
    model: 'CrmApp.model.TeamMainGrid',
     autoLoad: true,
     proxy: {
         type: 'ajax',
         api: {
            read: '/js/CrmApp/store/teamMainGrid.json'
         },
         reader: {
             type: 'json',
             root: 'teams',
             successProperty: 'success'
         }
     }
});