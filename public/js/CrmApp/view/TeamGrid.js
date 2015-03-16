var gridHeight = Ext.getBody().getViewSize().height - 200;
Ext.define('CrmApp.view.TeamGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.teamGrid',
    store : new Ext.data.Store({
        fields: ['USERID', 'USERLINKDESC', 'TEAMDSG', 'TEAMID','TEAMLINKDESC', 'SUBTEAMID', 'SUBTEAMLINKDESC', 'TEAMDSGID'],
        autoLoad: false
    }),
    width: 570,
    height: gridHeight,
    multiSelect: true,
    stripeRows: true,
    title: 'Current Team',
    id: 'adminCurrentTeam',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'secondGridDDGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            drop: function(node, data, dropRec, dropPosition) {
                for(i=0; i<data.records.length; i++){
                    data.records[i].set('SUBTEAMLINKDESC', Ext.getCmp('adminSubTeamName').rawValue);
                    data.records[i].set('SUBTEAMID', Ext.getCmp('adminSubTeamName').value);
                    data.records[i].set('TEAMLINKDESC', Ext.getCmp('adminTeamName').rawValue);
                    data.records[i].set('TEAMID', Ext.getCmp('adminTeamName').value);
                    //var editOrderJSON = {"TEAMID":88671,"TEAMDESC":"Testing","SUBTEAMID":88672,"SUBTEAMDESC":"UAT Testing"};
                    var userJSON = {};
                    userJSON['TEAMID'] = Ext.getCmp('adminTeamName').value;
                    userJSON['TEAMLINKDESC'] = Ext.getCmp('adminTeamName').rawValue;
                    userJSON['SUBTEAMID'] = Ext.getCmp('adminSubTeamName').value;
                    userJSON['SUBTEAMLINKDESC'] = Ext.getCmp('adminSubTeamName').rawValue;
                    var userJsonString = JSON.stringify(userJSON);
                    Ext.Ajax.request({
                        url: '/crm/api/team/user',
                        method: 'PUT',
                        params: {
                            "userJson" : userJsonString,
                            "SEARCHKEY" : "USERID",
                            "SEARCHVAL" : data.records[i].data.USERID
                        },
                        success: function(response, opts){
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }
        }
    },
    initComponent: function() {
        this.columns = [
            {
                header: 'Agent',
                dataIndex: 'USERLINKDESC',
                flex: 1
            },
            {
                header: 'Team',
                dataIndex: 'TEAMLINKDESC'
            },
            {
                header: 'Subteam',
                dataIndex: 'SUBTEAMID'
            },
            {
                header: 'Designation',
                dataIndex: 'TEAMDSG'
            }
        ];
        this.callParent(arguments);
    }
});