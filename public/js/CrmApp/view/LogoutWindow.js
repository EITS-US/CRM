Ext.define('CrmApp.view.LogoutWindow' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.logoutWindow',
    closable : false,
    layout: 'fit',
    title:'Offline - Reasons',
    resizable: false,
    modal: true,
    header: true,
    border: false,
    draggable: false,
    items:[
        {
            xtype: 'logoutForm'
        }
    ],
    defaultFocus: 'userName'

});