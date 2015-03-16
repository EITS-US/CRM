Ext.define('CrmApp.model.OrderHistoryDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'ORDERDATE',
        'ORDERREF',
        'ORDERSTATUS',
        'TOTALDUE',
        'CONTNAME',
        'DELVSTATE',
        'DELVCITY'
    ]
});