Ext.define('CrmApp.model.ComplaintDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'CREATIONDATE',
        'COMPLAINTREF',
        'STATUS',
        'CATEGORY',
        'TYPE',
        'DURATION',
        'SOURCE',
        'CUSTOMERNAME',
        'PHONENO',
        'ORDERREF',
        'ORDERS[0].ORDERSTATUS',
        'ORDERS[0].ORDERDATE'
    ]
});