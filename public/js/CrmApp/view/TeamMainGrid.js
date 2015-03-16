var gridHeight = Ext.getBody().getViewSize().height - 200;
Ext.Loader.setPath('Ext.ux', '../js/lib/ux');
Ext.require([
    'Ext.ux.grid.FiltersFeature'
]);
Ext.define('CrmApp.view.TeamMainGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.teamMainGrid',
    store : new Ext.data.Store({
        fields: ['USERID', 'USERLINKDESC', 'TEAMDSG', 'TEAMID','TEAMLINKDESC', 'SUBTEAMID', 'SUBTEAMLINKDESC', 'TEAMDSGID'],
        autoLoad: false
    }),
    width: 570,
    height: gridHeight,
    multiSelect: true,
    stripeRows: true,
    title: 'Team pool',
    id: 'adminMainTeam',
    features: [
        {
            ftype: 'filters',
            encode: false,
            local: true,
            filters: [
                {
                    type: 'boolean',
                    dataIndex: 'visible'
                }
            ]
        }
    ],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'firstGridDDGroup',
            dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: function(node, data, dropRec, dropPosition) {
                //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('agents') : ' on empty view';
                //console.log("Drag from right to left", 'Dropped ' + data.records[0].get('agents') + dropOn);
                for(i=0; i<data.records.length; i++){
                    var userJSON = {};
                    data.records[i].set('SUBTEAMLINKDESC', 'Free Pool Team');
                    data.records[i].set('SUBTEAMID', 0);
                    data.records[i].set('TEAMLINKDESC', 'Free Pool Sub Team');
                    data.records[i].set('TEAMID', 0);

                    userJSON['TEAMID'] = 0;
                    userJSON['TEAMLINKDESC'] = 'Free Pool Team';
                    userJSON['SUBTEAMID'] = 0;
                    userJSON['SUBTEAMLINKDESC'] = 'Free Pool Sub Team';


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
                flex: 1,
                filter: {
                    type: 'string'
                }
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