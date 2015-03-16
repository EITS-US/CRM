Ext.define('CrmApp.view.CallHistoryForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.callHistoryForm',
    border: false,
    dockedItems:[
        {
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '0 0 3 5',
            items: [
                {
                    xtype: 'component',
                    flex: 1
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelCallHistory',
                    margin: '5 5 0 5',
                    iconCls: 'cancelbutton',
                    handler: function() {
                        iosocket.emit('CLOSEPOPUP', 'close');
                        this.up('.window').close();
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'callHistory',
            height: 491,
            id: 'editCallHistoryPanel',
            border: false,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'button',
                    text: 'Load Call History',
                    width:150,
                    handler: function(){
                        CrmApp.view.CallHistory.loadCallHistory('editCallHistoryPanel', 'contRefIdEdit');
                    }
                },
                    {xtype: 'tbseparator'}, // or '-'
                     {
                         xtype: 'numberfield',
                         emptyText : 'Enter Contact No.',
                         width:200,
                         minLength:10,
                         maxLength:10,
                         id:'edithistoryPhoneNo',
                         hideTrigger: true,
                         keyNavEnabled: false,
                         mouseWheelEnabled: false
                }, {
                    xtype: 'button',
                    text: 'Search',
                    width:100,
                    handler: function(){
                        CrmApp.view.CallHistory.searchContactNumber('editCallHistoryPanel', 'edithistoryPhoneNo');
                    }
                }]
            }]
        }
    ]
});