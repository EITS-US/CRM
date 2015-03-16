/**
 * Created by kunalkrishna on 11/3/14.
 */

Ext.define('CrmApp.model.AdvanceBookingDetail', {
    extend: 'Ext.data.Model',
    fields: [
        'CALLBACKON',
        'CALLBACKTYPE',
        'COMPLAINTREASON',
        'CALLSTATUS',
        'CONTACTNAME',
        'CALLERNO',
        'CALLENDTIME',
        'CALLSOURCE',
        'DISPO[0].PRODUCTS',
        'SIZEDESC',
        'USERDESC',
        'TEAMDESC',
        'SUBTEAMDESC',
        'MEDIADESC',
        'LANGDESC',
        'REMARKS'
    ]
});
