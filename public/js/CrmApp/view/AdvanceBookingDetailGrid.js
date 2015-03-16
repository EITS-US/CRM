/**
 * Created by kunalkrishna on 11/3/14.
 */

var gridHeight = Ext.getBody().getViewSize().height - 244;
Ext.define('CrmApp.view.AdvanceBookingDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.advanceBookingDetailGrid',
    store: 'AdvanceBookingDetail',
    selType: 'rowmodel',
    id: 'advanceBookingDetailGridPanel',
    width: 'auto',
    height: gridHeight,
    renderTo: 'complaintGrid',
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
           // {header: "Reason", width: 120, dataIndex: 'COMPLAINTREASON'},
            {header: "Status", width: 120, dataIndex: 'CALLSTATUS',
                renderer: function(value, metaData, record, row, col, store, gridView){
                if(value ==='O')
                    return 'Open';
                    else
                return value;
            }},
            {header: "Customer Name", width: 120, dataIndex: 'CONTACTNAME'},
            {header: "Phone Number", width: 120, dataIndex: 'CALLERNO'},
            {header: "Call Time", width: 120, dataIndex: 'CALLENDTIME', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            {header: "Source", width: 120, dataIndex: 'CALLSOURCE'},
            {header: "Product", width: 120, dataIndex: 'DISPO[0].PRODUCTS',
                renderer:function(value) {

                    // your logic here
                    var prod = "";
                    for(i = 0 ; i < value.length; i++){
                        prod = prod.concat(value[i].PRODDESC) + "</br>";
                    }
                    return   '<div style="white-space:normal !important;">'+ prod +'</div>';
                }
            },
            {header: "Option", width: 120, dataIndex: 'SIZEDESC'},
            {header: "Rep", width: 120, dataIndex: 'USERDESC'},
            {header: "Team", width: 120, dataIndex: 'TEAMDESC'},
            {header: "Sub-Team", width: 120, dataIndex: 'SUBTEAMDESC'},
            /*{header: "Media", width: 120, dataIndex: 'MEDIADESC'},*/
            {header: "Language", width: 120, dataIndex: 'LANGDESC'},
            {header: "Notes", width: 120, dataIndex: 'REMARKS', renderer:function(value) {
                return   '<div style="white-space:normal !important;">'+ value +'</div>';

            }}
        ];
        this.callParent(arguments);
    }
});