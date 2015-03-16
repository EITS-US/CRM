Ext.define('CrmApp.view.TeamFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.teamFormPanel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    bodyPadding: 5,
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
                            text: 'Team Id',
                            margins: '5 10 0 0',
                            width: 80
                        },
                        {
                            xtype: "textfield",
                            id: 'teamId',
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
                            text: 'Team Name',
                            margins: '5 10 0 0',
                            width: 80
                        },
                        {
                            xtype: "textfield",
                            id: 'teamName',
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
                                var team = {};
                                if (Ext.getCmp('teamName').value !== '' && Ext.getCmp('teamName').value !== null){
                                    team['TEAMID'] = Ext.getCmp('teamId').value;
                                    team['TEAMDESC'] = Ext.getCmp('teamName').value;
                                    team['TEAMEXCELNAME'] = Ext.getCmp('teamName').value;

                                    var teamJson = JSON.stringify(team);
                                    Ext.Ajax.request({
                                        url: '/crm/api/teams',
                                        method: 'POST',
                                        params: {
                                            teamJson : teamJson
                                        },
                                        success: function(response, opts){
                                            var respObj = Ext.decode(response.responseText);
                                            var rec = {};
                                            rec['TEAMID'] = respObj.TEAMID;
                                            rec['TEAMDESC'] = respObj.TEAMDESC;
                                            Ext.getCmp('teamGridPanel').store.insert(0, rec);
                                            Ext.Msg.alert('Message', 'Team Created');
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
    ]
});