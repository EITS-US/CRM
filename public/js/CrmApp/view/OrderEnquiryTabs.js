Ext.define('CrmApp.view.OrderEnquiryTabs', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.orderEnquiryTabs',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    margin: '10 0 0 0',
    items: [
        {
            title: 'Communication Details',
            xtype: 'communicationDetails'
        },
        {
            title: 'Order Remarks',
            xtype: 'orderRemarks'
        }
    ]
});