var gridHeight = Ext.getBody().getViewSize().height - 244;
Ext.Loader.setPath('Ext.ux', '../js/lib/ux');
Ext.require([
    'Ext.ux.grid.FiltersFeature'
]);
Ext.define('CrmApp.view.CallBackDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.callBackDetailGrid',
    store: 'CallBackDetail',
    selType: 'rowmodel',
    id: 'callBackDetailGridPanel',
    width: 'auto',
    height: gridHeight,
    renderTo: 'complaintGrid',
    features: [
        {
            ftype: 'filters',
            encode: false,
            local: true,
            filters: [
                {
                    type: 'boolean',
                    dataIndex: 'visible'
                }
            ]
        }
    ],
    listeners: {
        render: function() {
            Ext.getCmp('editOrderContextMenu').hide();
            Ext.getCmp('printAuthContextMenu').hide();
            Ext.getCmp('emailAuthContextMenu').hide();
            Ext.getCmp('approveOrderContextMenu').hide();
        },
        itemcontextmenu: function(view, record, item, index, e){
            e.stopEvent();
            vGridContextMenus.showAt(e.getXY());
        }
    },
    initComponent: function() {
        this.columns = [
            {header: "Call Back Date", width: 120, dataIndex: 'CALLBACKON', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            {header: "Call Back Type", width: 120, dataIndex: 'CALLBACKTYPE'},
            {header: "Reason", width: 120, dataIndex: 'COMPLAINTREASON'},
            {header: "Status", width: 120, dataIndex: 'CALLSTATUS',renderer: function(value, metaData, record, row, col, store, gridView){
                if(value ==='O')
                    return 'Open';
                else if(value ==='C')
                    return 'Closed';
                    return value;
            }},
            {header: "Customer Name", width: 120, dataIndex: 'CONTACTNAME'},
            {header: "Phone Number", width: 120, dataIndex: 'CALLERNO',filter: {type: 'string'}},
            {header: "Call Time", width: 120, dataIndex: 'CALLENDTIME', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            {header: "Source", width: 120, dataIndex: 'CALLSOURCE'},
            {header: "Product", width: 120, dataIndex: 'DISPO[0].PRODUCTS',
                renderer:function(value) {

                    // your logic here
                    var prod = "";
                    for(i = 0 ; i < value.length; i++){
                        prod = prod.concat(value[i].PRODDESC) + "</br>";
                    }
                    return   prod ;
                },filter: {type: 'string'}
            },
            {header: "Option", width: 120, dataIndex: 'SIZEDESC',filter: {type: 'string'}},
            {header: "Rep", width: 120, dataIndex: 'USERDESC'},
            {header: "Team", width: 120, dataIndex: 'TEAMDESC', filter: {type: 'string'}},
            {header: "Sub-Team", width: 120, dataIndex: 'SUBTEAMDESC', filter: {type: 'string'}},
            /*{header: "Media", width: 120, dataIndex: 'MEDIADESC'},*/
            {header: "Language", width: 120, dataIndex: 'LANGDESC', filter: {type: 'string'}},
            {header: "Notes", width: 120, dataIndex: 'REMARKS'},
            {header: "CallKey", width: 120, dataIndex: 'CALLKEY'}
        ];
        this.callParent(arguments);
    }
});