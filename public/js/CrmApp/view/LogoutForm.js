Ext.define('CrmApp.view.LogoutForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.logoutForm',
    frame: true,
    width: 350,
    height: 125,
    bodyPadding: 10,
    border: true,
    fieldDefaults: {
        labelWidth: 110,
        labelAlign: 'left'
    },
    items: [
        {
            name: 'reasons',
            itemId: 'reasons',
            xtype: 'combo',
            fieldLabel: 'Reasons',
            mode: 'local',
            value: 'interFloorMovement',
            triggerAction: 'all',
            forceSelection: true,
            editable: false,
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            store: Ext.create('Ext.data.Store', {
                fields : ['name', 'value'],
                data   : [
                    {name : 'Inter Floor Movement', value: 'interFloorMovement'},
                    {name : 'Maintenance (System Issue)', value: 'maintenance'},
                    {name : 'Shift Close', value: 'shiftClose'}
                ]
            })
        }
    ],
    buttons: [
        {
            text: 'Cancel',
            handler: function() {
                Ext.getCmp('onlineRadio').setValue(true);
                this.up('.window').close();
            }
        },
        {
            text: 'Proceed',
            handler: function() {

                var logoutReason = Ext.ComponentQuery.query('combo[name=reasons]')[0].displayTplData[0].name;
                console.log(logoutReason);
                if (iosocket !== '') {
                    iosocket.emit('LOGOUT', logoutReason);
                }
                gracefullLogout = true;
               // var loginWin = Ext.create('CrmApp.view.LoginWindow');
               //loginWin.show();

                this.up('.window').close();

                Ext.Ajax.request({

                    url: '/crm/api/logout',
                    method: 'GET',
                    failure:function(){
                        window.location.href = "/crm/login.html";
                    },
                    success:function(){
                        window.location.href = "/crm/login.html";
                    }

                });

            }
        }
    ]
});

function emitLoginMessage(userName){

    try{
        iosocket.emit('LOGIN', { userId: userName });
    }catch(ex){
        console.log("No iosocket connection");
    }
}