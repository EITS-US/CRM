Ext.define('CrmApp.view.DiscountFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.discountFormPanel',
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
                            text: 'Discount Type',
                            margins: '5 10 0 0',
                            width: 80
                        },
                        {
                            xtype: "combo",
                            width: 150,
                            value: "CASH",
                            queryMode: "local",
                            displayField: "name",
                            valueField: "name",
                            id: 'discType',
                            store:{
                                fields: ['name'],
                                data : [
                                    {"name":"CASH"},
                                    {"name":"PERCENTAGE"}
                                ]
                            }
                        },
                        {
                            xtype: 'hidden',
                            width : 50,
                            id: 'editDiscountId'
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
                            text: 'Value',
                            margins: '5 10 0 0',
                            width: 80
                        },
                        {
                            xtype: "numberfield",
                            id: 'discValue',
                            width: 150,
                            hideTrigger: true,
                            minLength: 1,
                            maxLength: 3,
                            minValue: 0
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'saveDiscount',
                            text: 'Update',
                            iconCls: 'savebutton',
                            margins: '0 0 0 10',
                            handler: function () {
                                var discount = {};
                                if (Ext.getCmp('discValue').value !== '' && Ext.getCmp('discValue').value !== null){
                                    discount['type'] = Ext.getCmp('discType').value;
                                    discount['value'] = Ext.getCmp('discValue').value;

                                    var discountJson = JSON.stringify(discount);
                                    Ext.Ajax.request({
                                        url: '/crm/api/order/discount',
                                        method: 'POST',
                                        params: {
                                            data : discountJson
                                        },
                                        success: function(response, opts){
                                            var respObj = Ext.decode(response.responseText);
                                            var rec = {};
                                            rec['DISCTYPE'] = Ext.getCmp('discType').value;
                                            rec['DISPVAL'] = Ext.getCmp('discValue').value;
                                            rec['DISCID'] = respObj.discountid;
                                            Ext.getCmp('discountGridPanel').store.insert(0, rec);
                                            Ext.Msg.alert('Message', 'Discount Created');
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