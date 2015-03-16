Ext.define('CrmApp.view.BookOrderFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bookOrderFormPanel',
    renderTo: 'callFormDiv',
    autoHeight: true,
    width: 230,
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
                text: 'Book Order',
                id:'bookWarehouseOrder',
                formBind: true,
                disabled: true,
                margin: '0 0 0 10',
                handler: function (){
                    var form = this.up('form').getForm();
                    if (form.isValid() && iosocket !== '') {
                        var formValues = form.getValues();
                        iosocket.emit('OUTBOUNDCALL', formValues.phoneNumber);
                    }
                }
            }
        ];
    }
});