Ext.define('CrmApp.view.TeamManagementFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.teamManagementFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    listeners: {
        afterrender: function(){

            CrmApp.view.TeamManagementFormPanel.loadTeamData();

        }
    },
    buildItems : function() {
        return [
            {
                xtype: 'button',
                text: 'Load Free Pool Users',
                width: 140,
                margin: '0 0 0 10',
                handler: function(){

                    CrmApp.view.TeamManagementFormPanel.loadMainTeamData();

                }
            },
            {
                xtype: 'component',
                flex: 1
            },
            {
                xtype: 'container',
                bodyPadding: 0,
                layout: 'hbox',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        editable: true,
                        fieldLabel: 'Team',
                        name: 'adminTeamName',
                        id: 'adminTeamName',
                        labelWidth : 68,
                        margins: '0 0 0 0',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        listeners: {
                            select: function(combo){
                                CrmApp.view.TeamManagementFormPanel.loadSubTeamData(combo.value);
                            }
                        }
                    },
                    {
                        xtype: 'combo',
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        editable: false,
                        fieldLabel: 'Sub Team',
                        name: 'adminSubTeamName',
                        id: 'adminSubTeamName',
                        labelWidth : 68,
                        margins: '0 0 0 10',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        listeners: {
                            select: function(combo){
                                CrmApp.view.TeamManagementFormPanel.loadCurrentTeamData(combo.value);
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'button',
                text: 'Manage Team',
                width: 110,
                margin: '0 0 0 10',
                handler: function(){
                    var subTeamId = Ext.getCmp('adminSubTeamName').value;
                    CrmApp.view.TeamManagementFormPanel.loadCurrentTeamData(subTeamId);
                }
            }
        ];
    },
    statics: {
        loadTeamData: function(){
            Ext.Ajax.request({
                url: '/crm/api/teams',
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    var dataTeam = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataTeam[i] = new Array();
                        dataTeam[i]['name'] = responseObj[i].TEAMDESC;
                        dataTeam[i]['value'] = responseObj[i].TEAMID;
                    }
                    var teamStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataTeam
                    });
                    Ext.getCmp('adminTeamName').clearValue();
                    Ext.getCmp('adminTeamName').bindStore(teamStore);
                    Ext.getCmp('adminTeamName').setValue(responseObj[0].TEAMID);
                    CrmApp.view.TeamManagementFormPanel.loadSubTeamData(responseObj[0].TEAMID);
                }
            });
        },
        loadSubTeamData: function(teamId){
            Ext.Ajax.request({
                url: '/crm/api/subteams/'+teamId,
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    var dataTeam = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataTeam[i] = new Array();
                        dataTeam[i]['name'] = responseObj[i].SUBTEAMDESC;
                        dataTeam[i]['value'] = responseObj[i].SUBTEAMID;
                    }
                    var subTeamStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataTeam
                    });
                    Ext.getCmp('adminSubTeamName').clearValue();
                    Ext.getCmp('adminSubTeamName').bindStore(subTeamStore);
                    Ext.getCmp('adminSubTeamName').setValue(responseObj[0].SUBTEAMID);
                    CrmApp.view.TeamManagementFormPanel.loadCurrentTeamData(responseObj[0].SUBTEAMID);
                }
            });
        },
        loadMainTeamData: function(){
            Ext.Ajax.request({
                url: '/crm/api/team/users/' + 0,
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    Ext.getCmp('adminMainTeam').store.removeAll();
                    if(responseObj.length > 0){
                        for(var i=0; i<responseObj.length; i++){
                            Ext.getCmp('adminMainTeam').store.add(responseObj[i]);
                        }
                    }
                    else{
                        Ext.Msg.alert("Team", "No resource in free pool");
                    }
                }
            });
        },
        loadCurrentTeamData: function(subTeamId){
            Ext.Ajax.request({
                url: '/crm/api/team/users/'+subTeamId,
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    Ext.getCmp('adminCurrentTeam').store.removeAll();
                    if(responseObj.length > 0){
                        for(var i=0; i<responseObj.length; i++){
                            Ext.getCmp('adminCurrentTeam').store.add(responseObj[i]);
                        }
                    }
                }
            });
        }
    }
});