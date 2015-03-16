Ext.define('CrmApp.view.EditOrderPopup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editOrderPopup',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    enableTabScroll:false,
    dockedItems: [
        {
            xtype: 'container',
            dock: 'left',
            layout: {
                type: 'vbox',
                align: 'middle'
            },
            padding: '0 0 0 0',
            items: [
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Customer Details',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').show();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Product Details',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').show();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Delivery Details',
                    handler: function (){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').show();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Payment Details',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').show();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Authorization',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').show();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Send SMS',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').show();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    id:'sendEmail',
                    text: 'Send Email',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').show();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Remarks',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').show();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Call History',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').show();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Phone Details',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').show();
                        Ext.getCmp('orderHistoryForm').hide();
                    }
                },
                {
                    xtype: 'button',
                    width: 150,
                    cls: "verticalTabs",
                    text: 'Order History',
                    handler: function(){
                        Ext.getCmp('customerDetailsForm').hide();
                        Ext.getCmp('productDetailsTab').hide();
                        Ext.getCmp('deliveryDetailsForm').hide();
                        Ext.getCmp('paymentDetailsTab').hide();
                        Ext.getCmp('authorizationForm').hide();
                        Ext.getCmp('sendSmsForm').hide();
                        Ext.getCmp('sendEmailForm').hide();
                        Ext.getCmp('remarksForm').hide();
                        Ext.getCmp('callHistoryForm').hide();
                        Ext.getCmp('phoneDetailsForm').hide();
                        Ext.getCmp('orderHistoryForm').show();
                    }
                }
            ]
        }
    ],
    items: [
        {
            title: 'Customer Details',
            xtype: 'customerDetailsForm',
            id: 'customerDetailsForm'
        },
        {
            title: 'Product Details',
            xtype: 'productDetailsTab',
            id: 'productDetailsTab',
            hidden: true
        },
		{
            title: 'Delivery Details',
            xtype: 'deliveryDetailsForm',
            id: 'deliveryDetailsForm',
            hidden: true
        },
        {
            title: 'Payment Details',
            xtype: 'paymentDetailsTab',
            id: 'paymentDetailsTab',
            hidden: true
        },
		{
            title: 'Authorization',
            xtype: 'authorizationForm',
            id: 'authorizationForm',
            hidden: true
        },
        {
            title: 'Send SMS',
            xtype: 'sendSmsForm',
            id: 'sendSmsForm',
            hidden: true
        },
		{
            title: 'Send Email',
            xtype: 'sendEmailForm',
            id: 'sendEmailForm',
            hidden: true
        },
        {
            title: 'Remarks',
            xtype: 'remarksForm',
            id: 'remarksForm',
            hidden: true
        },
		{
            title: 'Call History',
            xtype: 'callHistoryForm',
            id: 'callHistoryForm',
            hidden: true
        },
        {
            title: 'Phone Details',
            xtype: 'phoneDetailsForm',
            id: 'phoneDetailsForm',
            hidden: true
        },
		{
            title: 'Order History',
            xtype: 'orderHistoryForm',
            id: 'orderHistoryForm',
            hidden: true
        }
    ]
});