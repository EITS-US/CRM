Ext.define('CrmApp.view.SubTeamPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.subTeamPanel',
    selType: 'rowmodel',
    id: 'subTeamGridPanel',
    store: Ext.create('Ext.data.Store', {
        autoDestroy: false,
        fields: ['SUBTEAMID', 'SUBTEAMDESC']
    }),
    width: 408,
    height: 278,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'prevbutton',
                    handler: function(){
                        var selection = Ext.getCmp('subTeamGridPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selection = Ext.getCmp('subTeamGridPanel').getSelectionModel().getSelection()[0];
                            if(selection) {
                                var subTeam = {};
                                if (selection.data.SUBTEAMID != '' && selection.data.SUBTEAMDESC != '') {
                                    subTeam['SUBTEAMID'] = selection.data.SUBTEAMID;
                                    subTeam['SUBTEAMDESC'] = selection.data.SUBTEAMDESC;
                                }
                                Ext.Ajax.request({
                                    url: '/crm/api/subteams/'+subTeam['SUBTEAMID'],
                                    method: 'DELETE',
                                    success: function(response, opts){
                                        var respObj = Ext.decode(response.responseText);
                                        Ext.Msg.alert('Message', respObj.message);
                                    },
                                    failure: function(response, opts) {
                                        console.log('server-side failure with status code ' + response.status);
                                    }
                                });
                                Ext.getCmp('subTeamGridPanel').store.remove(selection);
                            }
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function() {
        this.columns = [
            {
                header: "Sub-Team Name",
                flex: 1,
                dataIndex: "SUBTEAMDESC"
            },
            {
                header: "Sub-Team Id",
                width: 200,
                dataIndex: "SUBTEAMID"
            }
        ];
        this.callParent(arguments);
    }
});