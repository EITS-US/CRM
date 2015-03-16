Ext.define('CrmApp.view.CallFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.callFormPanel',
    renderTo: 'callFormDiv',
	autoHeight: true,
	width: 215,
	bodyPadding: 5,
	margin: '8 0 0 0',
	layout: 'hbox',
	initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype: 'numberfield',
                hideTrigger: true,
				name: 'phoneNumber',
                id: 'phoneNumber',
				allowBlank: false,
				minLength: 10,
				maxLength: 11,
				width: 120,
				value: 9650541511
            },
            {
                xtype: 'button',
				iconCls: 'phoneCall',
				text: 'Call',
				id:'phoneCall',
				formBind: true,
				disabled: true,
				hidden: true,
				width: 60,
				margin: '0 0 0 10',
				handler: function () {
                    /*Ext.Ajax.request({

                        url: '/crm/dummyCall',
                        method: 'GET',
                        failure:function(){
                            window.location.href = "/crm";
                        }

                    });*/

                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        //showNewCallPopup();
                        var formValues = form.getValues();
                        iosocket.emit('OUTBOUNDCALL', formValues.phoneNumber);
                    }
				}
            }
        ];
    }
});