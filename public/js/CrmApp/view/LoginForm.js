 var required = '<span class="requiredFld" data-qtip="Required">*</span>';
		
  Ext.define('CrmApp.view.LoginForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.loginForm',
	
			frame: true,
			width: 350,
			height: 125,
			bodyPadding: 10,
			border: true,

			fieldDefaults: {
				labelWidth: 110,
				labelAlign: 'left'
			},
			
			items: [{
				name: 'userName',
				itemId: 'userName',
				xtype: 'textfield',
				fieldLabel: 'User Name',
				afterLabelTextTpl: required,
				allowBlank: false
			}, {
				name: 'password',
				itemId: 'password',
				xtype: 'textfield',
				inputType: 'password',
				fieldLabel: 'Password',
				afterLabelTextTpl: required,
				allowBlank: false
			}],
			buttons: [
				{
					text: 'Cancel',
					handler: function() {
						Ext.MessageBox.alert('Thank you!', 'Cancel');
					}
				},
				{
					text: 'Login',
					handler: function() {
						var formValues = this.up('form').getForm().getValues();
						//iosocket.emit('LOGIN', { userId: formValues.userName });
                        emitLoginMessage(formValues.userName);
						this.up('.window').close();
						Ext.getCmp('onlineRadio').setValue(true);
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