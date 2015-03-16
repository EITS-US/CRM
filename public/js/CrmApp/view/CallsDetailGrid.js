var gridHeight = Ext.getBody().getViewSize().height - 247;
Ext.Loader.setPath('Ext.ux', '../js/lib/ux');
Ext.require([
    'Ext.ux.grid.FiltersFeature'
]);
Ext.define('CrmApp.view.CallsDetailGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.callsDetailGrid',
    store : 'CallsDetail',
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
    selType: 'rowmodel',
    id: 'callsDetailGridPanel',
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
    initComponent: function() {
        this.columns = [
            {
                header: "Call Start Time",
                width: 120,
                dataIndex: 'CALLSTARTTIME',
                type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                header: "Call End Time",
                width: 120,
                dataIndex: 'CALLENDTIME',
                type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                header: "Extension",
                width: 120,
                dataIndex: 'ACTUALEXT',
                filter: {type: 'string'}
            },
            {
                header: "Duration",
                width: 120,
                dataIndex: 'DURATION'
            },
            {
                header: "Customer",
                width: 120,
                dataIndex: 'CONTACTNAME',
                filter: {type: 'string'}
            },
            {
                header: "Phone Number",
                width: 120,
                dataIndex: 'CALLERNO',
                filter: {type: 'string'}
            },
            {
                header: "Source",
                width: 120,
                dataIndex: 'CALLSOURCE',
                filter: {type: 'string'}
            },
            {
                header: "Product",
                width: 120,
                dataIndex: 'DISPO[0].PRODUCTS',
                filter: {type: 'string'},
                renderer:function(value) {

                    // your logic here
                    var prod = "";
                    for(i = 0 ; i < value.length; i++){
                        prod = prod.concat(value[i].PRODDESC) + "</br>";
                    }
                    return   prod ;
                }
            },
            /*{
                header: "Option",
                width: 120,
                dataIndex: 'SIZEDESC'
            },*/
            {
                header: "Disposition",
                width: 120,
                dataIndex: 'DISPDESC',
                filter: {type: 'string'}
            },
            {
                header: "Reasons",
                width: 120,
                dataIndex: 'COMPLAINTREASON',
                filter: {type: 'string'}
            },
            {
                header: "Rep",
                width: 120,
                dataIndex: 'USERDESC',
                filter: {type: 'string'}
            },
            {
                header: "Team",
                width: 120,
                dataIndex: 'TEAMDESC',
                filter: {type: 'string'}
            },
            {
                header: "Sub-Team",
                width: 120,
                dataIndex: 'SUBTEAMDESC',
                filter: {type: 'string'}
            },
           /* {
                header: "Media",
                width: 120,
                dataIndex: 'MEDIADESC'
            },*/
            {
                header: "Language",
                width: 120,
                dataIndex: 'LANGDESC',
                filter: {type: 'string'}
            },
            {
                header: "Transferred",
                width: 120,
                dataIndex: 'TRANSFERREDUSERDESC'
            },
            {
                header: "Notes",
                width: 120,
                dataIndex: 'REMARKS'
            }
        ];
        this.callParent(arguments);
    }
});