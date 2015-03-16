Ext.define('CrmApp.view.CreateUserPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.createUserPanel',
    layout: 'column',
    labelAlign: 'top',
    border: false,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 0.5
    },
    bodyPadding: 5,
    listeners: {
        afterrender: function(){
            CrmApp.view.CreateUserPanel.loadTeamData();
            CrmApp.view.CreateUserPanel.loadShowrooms();
            CrmApp.view.CreateUserPanel.loadDesignations();
        }
    },
    items: [
        {
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'User Name',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            width : 150,
                            id: 'userName',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Mobile No.',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            width : 150,
                            id: 'mobileNumber',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Password',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'textfield',
                            inputType: 'password',
                            id: 'password',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Confirm Password',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            inputType: 'password',
                            width : 150,
                            id: 'confirmPass',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Team',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            name: 'userTeam',
                            id: 'userTeam',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            listeners: {
                                select: function(combo){
                                    CrmApp.view.CreateUserPanel.loadSubTeamData(combo.value);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Sub-Team',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            name: 'userSubTeam',
                            id: 'userSubTeam',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Role',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'combo',
                            mode: 'local',
                            value: 'agent',
                            triggerAction: 'all',
                            forceSelection: true,
                            name: 'userAssignRole',
                            id: 'userAssignRole',
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
                        }
                    ]
                }
            ]
        },
        {
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'User Id',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            width : 150,
                            id: 'userId',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Full Name',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            width : 150,
                            id: 'fullName',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'E-Mail',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            xtype: 'textfield',
                            vtype: 'email',
                            width : 150,
                            id: 'emailId',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Department',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'combo',
                            mode: 'local',
                            value: '7',
                            triggerAction: 'all',
                            forceSelection: true,
                            name: 'userDepartment',
                            id: 'userDepartment',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
                                    {name : 'SALES',  value: '7'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Designation',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            name: 'userDesignation',
                            id: 'userDesignation',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Show Room',
                            margins: '5 10 0 0',
                            width: 120
                        },
                        {
                            width: 150,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            name: 'showRoomDD',
                            id: 'showRoomDD',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'component',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            width: 70,
                            text: 'Cancel',
                            margin: '5 0 0 10',
                            handler: function () {
                                this.up('.window').close();
                            }
                        },
                        {
                            xtype: 'button',
                            width: 70,
                            text: 'Create',
                            id: 'userCreateBtn',
                            margin: '5 5 0 10',
                            formBind: true,
                            handler: function () {
                                var pass = Ext.getCmp('password').value;
                                var confirmPass = Ext.getCmp('confirmPass').value;
                                if(pass == confirmPass){
                                    CrmApp.view.CreateUserPanel.createNewUser();
                                }
                                else{
                                    alert('Password and Confirm Password not same.');
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            width: 70,
                            text: 'Update Role',
                            id: 'updateRoleBtn',
                            margin: '5 5 0 10',
                            formBind: true,
                            hidden: true,
                            handler: function () {
                                var userName = Ext.getCmp('userName').value;
                                userName = userName.toUpperCase();
                                if(userName !== userObj.USERNAME) {
                                    var userRole = Ext.getCmp('userAssignRole').value;
                                    CrmApp.view.CreateUserPanel.assignUserRole(userName, userRole);
                                }
                                else{
                                    alert('Same user cannot edit his/her role.');
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
                    Ext.getCmp('userTeam').clearValue();
                    Ext.getCmp('userTeam').bindStore(teamStore);
                    Ext.getCmp('userTeam').setValue(responseObj[0].TEAMID);
                    CrmApp.view.CreateUserPanel.loadSubTeamData(responseObj[0].TEAMID);
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
                    Ext.getCmp('userSubTeam').clearValue();
                    Ext.getCmp('userSubTeam').bindStore(subTeamStore);
                    Ext.getCmp('userSubTeam').setValue(responseObj[0].SUBTEAMID);
                }
            });
        },
        createNewUser: function(){
            Ext.Ajax.request({
                url: '/crm/api/user',
                method: 'POST',
                params: {
                    username : Ext.getCmp('userName').value.toUpperCase(),
                    mobileNumber: Ext.getCmp('mobileNumber').value,
                    password: Ext.getCmp('password').value,
                    userid: Ext.getCmp('userId').value,
                    fullName: Ext.getCmp('fullName').value,
                    designationid: Ext.getCmp('userDesignation').value,
                    designation: Ext.getCmp('userDesignation').rawValue,
                    emailid: Ext.getCmp('emailId').value,
                    teamid: Ext.getCmp('userTeam').value,
                    teamdesc: Ext.getCmp('userTeam').rawValue,
                    subteamid: Ext.getCmp('userSubTeam').value,
                    subteamdesc: Ext.getCmp('userSubTeam').rawValue,
                    department: Ext.getCmp('userDepartment').rawValue,
                    departmentid: Ext.getCmp('userDepartment').value,
                    showroomdesc: Ext.getCmp('showRoomDD').rawValue,
                    showroomid: Ext.getCmp('showRoomDD').value,
                    userRole : Ext.getCmp('userAssignRole').value
                },
                success: function(response, opts){
                    var serverResp = Ext.decode(response.responseText);
                    if(serverResp.msg === 'success'){
                        Ext.Msg.alert("Message", 'User Created and Role Assigned');
                        Ext.getCmp('userCreateBtn').up('.window').close();
                    }else{
                        Ext.Msg.alert("Message", 'User Already Exists');
                    }

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        assignUserRole: function(userName, userRole){
            Ext.Ajax.request({
                url: '/crm/api/assignRole',
                method: 'POST',
                params: {
                    USERNAME : userName,
                    role: userRole
                },
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    Ext.Msg.alert("Message", responseObj.detail);
                    Ext.getCmp('userCreateBtn').up('.window').close();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadShowrooms: function(){
            Ext.Ajax.request({
                url: '/crm/api/getAllShowrooms',
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    var dataShowroom = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataShowroom[i] = new Array();
                        dataShowroom[i]['name'] = responseObj[i].SHOWDESC;
                        dataShowroom[i]['value'] = responseObj[i].SHOWID;
                    }
                    var showroomStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataShowroom
                    });
                    Ext.getCmp('showRoomDD').clearValue();
                    Ext.getCmp('showRoomDD').bindStore(showroomStore);
                    Ext.getCmp('showRoomDD').setValue(19);
                }
            });
        },
        loadDesignations: function(){
            Ext.Ajax.request({
                url: '/crm/api/team/designation',
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    var dataDesignation = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataDesignation[i] = new Array();
                        dataDesignation[i]['name'] = responseObj[i].DESIGNATION;
                        dataDesignation[i]['value'] = responseObj[i].DESIGNATIONID;
                    }
                    var designationStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataDesignation
                    });
                    Ext.getCmp('userDesignation').clearValue();
                    Ext.getCmp('userDesignation').bindStore(designationStore);
                    Ext.getCmp('userDesignation').setValue(responseObj[0].DESIGNATIONID);
                }
            });
        }
    }
});