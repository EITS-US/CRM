Ext.onReady( function(){
    window.localStorage.setItem('token', '');
    Ext.require([
        'Ext.menu.*',
        'Ext.layout.container.Table',
        'Ext.container.ButtonGroup'
        ,
        'Ext.form.Panel',
        'Ext.form.field.Text'
    ]);
    var mainPanel = Ext.create('Ext.form.Panel', {
        renderTo: Ext.get('main'),
        xtype: 'form',
        title: 'Sign in to continue to CRM',
        height: null,
        width: 460,
        x:200,
        y:100,
        defaultType: 'textfield',
        defaults: { anchor: '100%' },
        bodyPadding: '0 30 30 30',
        items: [
            {
                xtype: 'component',
                html: '<img src="/css/images/customer-service-icon.jpg" height="320" width="400" />',
                flex: 1
            },
            {
                allowBlank:false,
                id:'txtuser',
                name: 'user',
                emptyText: 'user id',
                height: 45,
                value: 'manager_user'
            },
            {
                allowBlank:false,
                id:'txtpass',
                name: 'pass',
                emptyText: 'password',
                inputType: 'password',
                height: 45,
                value: 'password'
            },
            {
                xtype: 'button',
                scale: 'large',
                text: 'Sign in',
                cls: 'loginBtn',
                handler:loginclick,
                margin: '8 0 0 0'
            }
        ]
    });
    function loginclick(btn){
        var form = mainPanel.getForm();
        if (form.isValid()) {
            var userget=Ext.getCmp('txtuser').value;
            var passget=Ext.getCmp('txtpass').value;
            Ext.Ajax.request({
                url: '/crm/api/authenticate',
                method:'POST',
                params: {
                    "username" : userget,
                    "password" : passget
                },
                success: function(response){
                    var tokenInfo = Ext.decode(response.responseText);
                    window.localStorage.setItem('token', JSON.stringify(tokenInfo));
                    var role = tokenInfo[1].ROLE;
                    if(role === 'warehouse')
                    {
                        window.location.href = "/crm/warehouse.html";
                    }
                    else
                    {
                        window.location.href = "/crm/home.html";
                    }


                },
                failure : function(response){
                    Ext.Msg.alert("Authentication", "Incorrect Userid/Passsword");
                }
            });
        }
    }
});