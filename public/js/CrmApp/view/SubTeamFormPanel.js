Ext.define('CrmApp.view.SubTeamFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.subTeamFormPanel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 5,
    listeners: {
        'afterrender': function () {
            CrmApp.view.SubTeamFormPanel.loadTeamData();
        }
    },
    items: [
        {
            xtype: 'fieldset',
            collapsible: false,
            border: false,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 0, bottom: 0, left: 0}
                },
                hideLabel: true
            },
            items: [
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Team Name',
                            margins: '5 10 0 0',
                            width: 95
                        },
                        {
                            xtype: "combo",
                            width: 150,
                            value: "CASH",
                            queryMode: "local",
                            displayField: "name",
                            valueField: "value",
                            name: 'teamName',
                            id: 'teamName',
                            listeners: {
                                select: function(combo){
                                    CrmApp.view.SubTeamFormPanel.loadSubTeamData(combo.value);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Sub-Team Id',
                            margins: '5 10 0 0',
                            width: 95
                        },
                        {
                            xtype: "textfield",
                            id: 'subTeamId',
                            width: 150
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Sub-Team Name',
                            margins: '5 10 0 0',
                            width: 95
                        },
                        {
                            xtype: "textfield",
                            id: 'subTeamName',
                            width: 150
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'saveTeam',
                            text: 'Update',
                            iconCls: 'savebutton',
                            margins: '0 0 0 10',
                            handler: function () {
                                var subTeam = {};
                                if (Ext.getCmp('subTeamName').value !== '' && Ext.getCmp('subTeamName').value !== null && Ext.getCmp('subTeamId').value !== '' && Ext.getCmp('subTeamId').value !== null){
                                    subTeam['TEAMID'] = Ext.getCmp('teamName').value;
                                    subTeam['SUBTEAMID'] = Ext.getCmp('subTeamId').value;
                                    subTeam['SUBTEAMDESC'] = Ext.getCmp('subTeamName').value;

                                    var subTeamJson = JSON.stringify(subTeam);
                                    Ext.Ajax.request({
                                        url: '/crm/api/subteams',
                                        method: 'POST',
                                        params: {
                                            subTeamJson : subTeamJson
                                        },
                                        success: function(response, opts){
                                            var respObj = Ext.decode(response.responseText);
                                            var rec = {};
                                            rec['SUBTEAMID'] = respObj.SUBTEAMID;
                                            rec['SUBTEAMDESC'] = respObj.SUBTEAMDESC;
                                            Ext.getCmp('subTeamGridPanel').store.insert(0, rec);
                                            Ext.Msg.alert('Message', 'Sub-Team Created');
                                        },
                                        failure: function(response, opts) {
                                            console.log('server-side failure with status code ' + response.status);
                                        }
                                    });
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    statics:{
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
                    Ext.getCmp('teamName').clearValue();
                    Ext.getCmp('teamName').bindStore(teamStore);
                    Ext.getCmp('teamName').setValue(responseObj[0].TEAMID);
                    CrmApp.view.SubTeamFormPanel.loadSubTeamData(responseObj[0].TEAMID);
                }
            });
        },
        loadSubTeamData: function(teamId){
            Ext.Ajax.request({
                url: '/crm/api/subteams/'+teamId,
                success: function (response, opts) {
                    var subTeamData = Ext.decode(response.responseText);
                    var subTeamStore = Ext.create('Ext.data.Store', {
                        autoDestroy: false,
                        fields: ['SUBTEAMID', 'SUBTEAMDESC'],
                        data: subTeamData
                    });
                    Ext.getCmp('subTeamGridPanel').bindStore(subTeamStore);
                }
            });
        }
    }
});