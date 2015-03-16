Ext.define('CrmApp.view.DiscountPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.discountPanel',
    selType: 'rowmodel',
    id: 'discountGridPanel',
    store: Ext.create('Ext.data.Store', {
        autoDestroy: false,
        fields: ['DISCTYPE', 'DISPVAL', 'DISCID']
    }),
    width: 408,
    height: 308,
    listeners: {
        'afterrender': function () {
            Ext.Ajax.request({
                url: '/crm/api/order/discount',
                method: 'GET',
                success: function(response, opts){
                    var discountData = Ext.decode(response.responseText);

                    var discountStore = Ext.create('Ext.data.Store', {
                        autoDestroy: false,
                        fields: ['DISCTYPE', 'DISPVAL', 'DISCID'],
                        data: discountData
                    });
                    Ext.getCmp('discountGridPanel').bindStore(discountStore);
                }
            })

        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'prevbutton',
                    handler: function(){
                        var selection = Ext.getCmp('discountGridPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selection = Ext.getCmp('discountGridPanel').getSelectionModel().getSelection()[0];
                            if(selection) {
                                var discount = {};
                                if (selection.data.DISCTYPE != '' && selection.data.DISPVAL != '') {
                                    discount['id'] = selection.data.DISCID;
                                    discount['type'] = selection.data.DISCTYPE;
                                    discount['value'] = selection.data.DISPVAL;
                                }
                            }
                            var discountJson = JSON.stringify(discount);
                            Ext.Ajax.request({
                                     url: '/crm/api/order/discount/' + discount['id'],
                                     method: 'DELETE',
                                     success: function(response, opts){
                                         var respObj = Ext.decode(response.responseText);
                                                 Ext.Msg.alert('Message', respObj.message);
                                     },
                                     failure: function(response, opts) {
                                           console.log('server-side failure with status code ' + response.status);
                                     }
                             });
                            Ext.getCmp('discountGridPanel').store.remove(selection);
                        }
                    }
                }
            ]
        }
    ],
    initComponent: function() {
        this.columns = [
            {
                header: "Type",
                flex: 1,
                dataIndex: "DISCTYPE"
            },
            {
                header: "Value",
                width: 200,
                dataIndex: "DISPVAL"
            }
        ];
        this.callParent(arguments);
    }
});