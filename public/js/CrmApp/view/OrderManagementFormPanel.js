Ext.define('CrmApp.view.OrderManagementFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.orderManagementFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype: 'textfield',
                fieldLabel: 'Order Ref. No.',
                name: 'orderRefNumber',
                id: 'orderRefNumber',
                margin: '20 0 0 0'
            },
            {
                xtype: 'button',
                text: 'Refund',
                width: 60,
                margin: '20 0 0 10',
                handler: function () {
                    CrmApp.view.OrderManagementFormPanel.refundOrder();
                }
            }
        ];
    },
    statics: {
        refundOrder: function() {
            var orderRef = Ext.getCmp('orderRefNumber').value;
            if(orderRef != undefined){
                Ext.Ajax.request({
                    url: '/crm/api/orders/'+orderRef,
                    success: function (response, opts) {
                        var orderResponse = Ext.decode(response.responseText);
                        var win = Ext.widget('window', {
                            title: 'Book New Order',
                            width: 1154,
                            height: 620,
                            layout: 'fit',
                            modal: true,
                            closable:false,
                            items: [
                                {
                                    xtype: 'calPopup'
                                }
                            ],
                            defaultFocus: 'firstName'
                        });
                        win.show();
                        callSource = Ext.get('source').getHTML() + " O";
                        CrmApp.controller.CRMController.loadLanguages('languageCombo');
                        var phoneNumber = orderResponse.CALLBACKCCONTACTNO;//Ext.getCmp('phoneNumber').value;
                        var contactKey = Ext.getCmp('contRefId').value;
                        CrmApp.controller.CRMController.loadCallKey(phoneNumber);

                        CrmApp.controller.CRMController.loadContactDetails(phoneNumber);
                        CrmApp.controller.CRMController.loadProductDataStore('newCallProductCombo', 'product', selectedProductId);
                        //Warehouse Specific
                        Ext.getCmp('setCustDND').hide();
                        Ext.getCmp('notInterestedBtn').hide();
                        Ext.getCmp('advanceBookingBtn').hide();
                        Ext.getCmp('callBackBtn').hide();
                        Ext.getCmp('complaintRequestBtn').hide();
                        Ext.getCmp('generalEnquiryBtn').hide();
                        Ext.getCmp('otherLanguageBtn').hide();
                        Ext.getCmp('nonSaleCallBtn').hide();
                        Ext.getCmp('endCallBut').hide();
                        Ext.getCmp('closeCallBtn').hide();
                        Ext.getCmp('closeBookOrderBtn').show();
                        Ext.getCmp('popupHeader').update('Refund Order - '+orderResponse.ORDERREF+', Total Amount'+orderResponse.TOTALDUE);
                        Ext.getCmp('totalOrderAmount').setValue(orderResponse.TOTALDUE);
                    }
                });
            }
        }
    }
});