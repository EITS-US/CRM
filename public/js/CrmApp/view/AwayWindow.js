Ext.define('CrmApp.view.AwayWindow' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.awayWindow',
    closable : false,
    layout: 'fit',
    title:'Away - Reasons',
    resizable: false,
    modal: true,
    header: true,
    border: false,
    draggable: false,
    items:[
        {
            xtype: 'awayForm'
        }
    ]
});