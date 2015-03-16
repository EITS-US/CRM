Ext.define('CrmApp.view.RemarksForm', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.remarksForm',
    store : new Ext.data.Store({
        fields: ['DATE', 'REMARKS'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    id: 'remarksGridPanel',
    width: 486,
    height: 550,
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
                    id:'editCancelRemarks',
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
    initComponent: function() {
        this.columns = [
            {
                header: 'Date',
                dataIndex: 'DATE',
                width: 120
            },
            {
                header: 'Remarks',
                dataIndex: 'REMARKS',
                flex: 1
            }
        ];
        this.callParent(arguments);
    }
});