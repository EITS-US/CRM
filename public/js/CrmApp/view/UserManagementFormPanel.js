Ext.define('CrmApp.view.UserManagementFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userManagementFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function(){
        return [
            {
                xtype: 'button',
                text: 'Create User',
                width: 100,
                margin: '0 0 0 10',
                handler: function(){
                    CrmApp.view.UserManagementFormPanel.showCreateUserPopup();
                }
            },
            {
                xtype: 'button',
                text: 'Change Role',
                width: 100,
                margin: '0 0 0 10',
                handler: function(){
                    CrmApp.view.UserManagementFormPanel.showAssignRolePopup();
                }
            },
            {
                xtype: 'button',
                text: 'Create Permission',
                id: 'createPermissionBtn',
                width: 100,
                margin: '0 0 0 10',
                handler: function(){
                    CrmApp.view.UserManagementFormPanel.showPermissionPopup();
                }
            },
            {
                xtype: 'button',
                text: 'Create Discount',
                id: 'createDiscountBtn',
                width: 100,
                margin: '0 0 0 10',
                handler: function(){
                    CrmApp.view.UserManagementFormPanel.showDiscountPopup();
                }
            },
            {
                xtype: 'button',
                text: 'Create Team',
                id: 'createTeamBtn',
                width: 100,
                margin: '0 0 0 10',
                handler: function(){
                    CrmApp.view.UserManagementFormPanel.showTeamPopup();
                }
            },
            {
                xtype: 'button',
                text: 'Create Sub-Team',
                id: 'createSubTeamBtn',
                width: 100,
                margin: '0 0 0 10',
                handler: function(){
                    CrmApp.view.UserManagementFormPanel.showSubTeamPopup();
                }
            }
        ];
    },
    statics: {
        showCreateUserPopup:function(){
            var createUserWindow = new Ext.Window({
                height : 230,
                width  : 600,
                title: 'Create New User',
                layout: 'fit',
                modal: true,
                closable:false,
                items  : [
                    {
                        xtype: 'createUserPanel'
                    }
                ]
            });
            createUserWindow.show();
        },
        showAssignRolePopup:function(){
            var createUserWindow = new Ext.Window({
                height : 230,
                width  : 600,
                title: 'Assign Role To User',
                layout: 'fit',
                modal: true,
                closable:false,
                items  : [
                    {
                        xtype: 'createUserPanel'
                    }
                ]
            });
            createUserWindow.show();
            Ext.getCmp('userCreateBtn').hide();
            Ext.getCmp('updateRoleBtn').show();
            Ext.getCmp('mobileNumber').disable();
            Ext.getCmp('password').disable();
            Ext.getCmp('confirmPass').disable();
            Ext.getCmp('userId').disable();
            Ext.getCmp('fullName').disable();
            Ext.getCmp('userDesignation').disable();
            Ext.getCmp('emailId').disable();
            Ext.getCmp('userTeam').disable();
            Ext.getCmp('userSubTeam').disable();
            Ext.getCmp('userDepartment').disable();
            Ext.getCmp('showRoomDD').disable();
        },
        showPermissionPopup:function(){
            var permissionWindow = new Ext.Window({
                height : 400,
                width  : 420,
                title: 'Create Permission',
                layout: 'fit',
                modal: true,
                closable:true,
                items  : [
                    {
                        xtype: 'permissionPanel'
                    }
                ]
            });
            permissionWindow.show();
        },
        showDiscountPopup:function(){
            var discountWindow = new Ext.Window({
                height : 400,
                width  : 420,
                title: 'Create Discount',
                layout: 'auto',
                modal: true,
                closable:true,
                items  : [
                    {
                        xtype: 'discountFormPanel',
                        height: 60,
                        width: 407
                    },
                    {
                        xtype: 'discountPanel'
                    }
                ]
            });
            discountWindow.show();
        },
        showTeamPopup:function(){
            var teamWindow = new Ext.Window({
                height : 400,
                width  : 420,
                title: 'Create Team',
                layout: 'auto',
                modal: true,
                closable:true,
                items  : [
                    {
                        xtype: 'teamFormPanel',
                        height: 60,
                        width: 407
                    },
                    {
                        xtype: 'teamPanel'
                    }
                ]
            });
            teamWindow.show();
        },
        showSubTeamPopup:function(){
            var subTeamWindow = new Ext.Window({
                height : 400,
                width  : 420,
                title: 'Create Sub-Team',
                layout: 'auto',
                modal: true,
                closable:true,
                items  : [
                    {
                        xtype: 'subTeamFormPanel',
                        height: 90,
                        width: 407
                    },
                    {
                        xtype: 'subTeamPanel'
                    }
                ]
            });
            subTeamWindow.show();
        }
    }
});