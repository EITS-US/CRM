Ext.define('CrmApp.model.CallDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'CALLSTARTTIME',
        'CALLENDTIME',
        'ACTUALEXT',
        'DURATION',
        'CONTACTNAME',
        'CALLERNO',
        'CALLSOURCE',
        'DISPO[0].PRODUCTS',
        'SIZEDESC',
        'DISPDESC',
        'COMPLAINTREASON',
        'USERDESC',
        'TEAMDESC',
        'SUBTEAMDESC',
        'MEDIADESC',
        'LANGDESC',
        'TRANSFERREDUSERDESC',
        'REMARKS'
    ]
});