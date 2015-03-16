Ext.define('CrmApp.view.PermissionPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.permissionPanel',
    store : new Ext.data.ArrayStore({
        fields: ['SUBJECT', 'ACTION'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    id: 'permissionGridPanel',
    width: 400,
    height: 200,
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            autoCancel: true/*,
            listeners: {
                edit: function(e){
                    var selection = Ext.getCmp('permissionGridPanel').getSelectionModel().getSelection()[0];
                    if(selection) {
                        var permission = new Array();
                        if (selection.data.SUBJECT != '' && selection.data.ACTION != '') {
                            permission[0] = {};
                            permission[0]['subject'] = selection.data.SUBJECT;
                            permission[0]['action'] = selection.data.ACTION;
                        }
                    }
                    var permissionJson = JSON.stringify(permission);
                    Ext.Ajax.request({
                        url: '/crm/api/createPermission',
                        method: 'POST',
                        params: {
                            data : permissionJson,
                            role: Ext.getCmp('userPermissionRole').value
                        },
                        success: function(response, opts){
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }*/
        })
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    width: 150,
                    xtype: 'combo',
                    mode: 'local',
                    value: 'agent',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: false,
                    name: 'userPermissionRole',
                    id: 'userPermissionRole',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields : ['name', 'value'],
                        data   : [
                            {name : 'Agent',  value: 'agent'},
                            {name : 'Lead',   value: 'lead'},
                            {name : 'Manager',  value: 'manager'},
                            {name : 'WareHouse',  value: 'warehouse'},
                            {name : 'Confirmation',  value: 'confirmation'}
                        ]
                    })
                },
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'nextbutton',
                    handler: function(){
                        var rec = {};
                        rec['SUBJECT'] = '';
                        rec['ACTION'] = '';
                        Ext.getCmp('permissionGridPanel').store.insert(0, rec);
                    }
                }, '-',
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'prevbutton',
                    handler: function(){
                        var selection = Ext.getCmp('permissionGridPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            Ext.getCmp('permissionGridPanel').store.remove(selection);
                        }
                    }
                }, '-',
                {
                    xtype: 'button',
                    text: 'Update',
                    iconCls: 'savebutton',
                    handler: function(){
                        if(Ext.getCmp('permissionGridPanel').store.data.items.length>0){
                            for (var i = 0; i < Ext.getCmp('permissionGridPanel').store.data.items.length; i++) {
                                var gridItem = Ext.getCmp('permissionGridPanel').store.data.items[i];
                                if(gridItem.data.SUBJECT == '' || gridItem.data.ACTION ==''){
                                    Ext.getCmp('permissionGridPanel').store.removeAt(i);
                                }
                            }
                            var permission = new Array();
                            for (var i = 0; i < Ext.getCmp('permissionGridPanel').store.data.items.length; i++) {
                                var gridItem = Ext.getCmp('permissionGridPanel').store.data.items[i];
                                if(gridItem.data.SUBJECT !== '' && gridItem.data.ACTION !==''){
                                    permission[i] = {};
                                    permission[i]['subject'] = gridItem.data.SUBJECT;
                                    permission[i]['action'] = gridItem.data.ACTION;
                                }
                            }
                            var permissionJson = JSON.stringify(permission);
                            Ext.Ajax.request({
                                url: '/crm/api/createPermission',
                                method: 'POST',
                                params: {
                                    data: permissionJson,
                                    role: Ext.getCmp('userPermissionRole').value
                                },
                                success: function (response, opts) {
                                    var serverResp = Ext.decode(response.responseText);
                                    Ext.Msg.alert("Message", 'Permission created for role');
                                },
                                failure: function (response, opts) {
                                    console.log('server-side failure with status code ' + response.status);
                                }
                            });
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function() {
        this.columns = [
            {
                header: "Subject",
                flex: 1,
                dataIndex: "SUBJECT",
                editor: {
                    xtype: "combobox",
                    store: subjectStore,
                    queryMode: "local",
                    displayField: "name",
                    valueField: "name",
                    listeners: {
                        select: function(combo, recs, opts){
                            combo.fireEvent("blur");
                        }
                    }
                }
            },
            {
                header: "Action",
                width: 200,
                dataIndex: "ACTION",
                editor: {
                    xtype: "combobox",
                    store: actionStore,
                    queryMode: "local",
                    displayField: "name",
                    valueField: "name",
                    listeners: {
                        select: function(combo, recs, opts){
                            combo.fireEvent("blur");
                        }
                    }
                }
            }
        ];
        this.callParent(arguments);
    }
});
var subjectStore = Ext.create('Ext.data.Store', {
    fields: ['name'],
    data : [
        {"name":"Order"},
        {"name":"Call"},
        {"name":"Callback"},
        {"name":"Advancebooking"},
        {"name":"Complaint"}
    ]
});
var actionStore = Ext.create('Ext.data.Store', {
    fields: ['name'],
    data : [
        {"name":"ALL"},
        {"name":"CREATE"},
        {"name":"EDIT"},
        {"name":"TEAMID"},
        {"name":"USERID"},
        {"name":"AUTHBYID"}
    ]
});