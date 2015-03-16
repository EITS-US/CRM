Ext.define('CrmApp.view.ProductDetailsTab' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.productDetailsTab',
	layout: 'auto',
	border: false,
    dockedItems:[
        {
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '0 0 3 5',
            items: [
                {
                    xtype: 'component',
                    flex: 1
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Save',
                    id:'editSaveProduct',
                    margin: '7 0 0 0',
                    iconCls: 'savebutton',
                    handler: function() {
                        CrmApp.controller.CRMController.saveEditOrderDetail();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelProduct',
                    margin: '7 5 0 5',
                    iconCls: 'cancelbutton',
                    handler: function() {
                        iosocket.emit('CLOSEPOPUP', 'close');
                        this.up('.window').close();
                    }
                }
            ]
        }
    ],
    items: [	
		{
			xtype: 'productDetailsForm'
		},
		{
			xtype: 'productDetailEntry'
		}
	]
});