Ext.define('CrmApp.view.TeamPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.teamPanel',
    selType: 'rowmodel',
    id: 'teamGridPanel',
    store: Ext.create('Ext.data.Store', {
        autoDestroy: false,
        fields: ['TEAMID', 'TEAMDESC']
    }),
    width: 408,
    height: 308,
    listeners: {
        'afterrender': function () {
            Ext.Ajax.request({
                url: '/crm/api/teams',
                method: 'GET',
                success: function(response, opts){
                    var teamData = Ext.decode(response.responseText);
                    var teamStore = Ext.create('Ext.data.Store', {
                        autoDestroy: false,
                        fields: ['TEAMID', 'TEAMDESC'],
                        data: teamData
                    });
                    Ext.getCmp('teamGridPanel').bindStore(teamStore);
                }
            })
        }
    },
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
                        var selection = Ext.getCmp('teamGridPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selection = Ext.getCmp('teamGridPanel').getSelectionModel().getSelection()[0];
                            if(selection) {
                                var team = {};
                                if (selection.data.TEAMID != '' && selection.data.TEAMDESC != '') {
                                    team['TEAMID'] = selection.data.TEAMID;
                                    team['TEAMDESC'] = selection.data.TEAMDESC;
                                }
                                Ext.Ajax.request({
                                    url: '/crm/api/teams/' + team['TEAMID'],
                                    method: 'DELETE',
                                    success: function (response, opts) {
                                        var respObj = Ext.decode(response.responseText);
                                        Ext.Msg.alert('Message', respObj.message);
                                    },
                                    failure: function (response, opts) {
                                        console.log('server-side failure with status code ' + response.status);
                                    }
                                });
                                Ext.getCmp('teamGridPanel').store.remove(selection);
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
                header: "Team Name",
                flex: 1,
                dataIndex: "TEAMDESC"
            },
            {
                header: "Team Id",
                width: 200,
                dataIndex: "TEAMID"
            }
        ];
        this.callParent(arguments);
    }
});