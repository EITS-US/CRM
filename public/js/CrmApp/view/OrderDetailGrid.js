
var gridHeight = Ext.getBody().getViewSize().height - 297;
Ext.Loader.setPath('Ext.ux', '../js/lib/ux');
Ext.require([
    'Ext.ux.grid.FiltersFeature'
]);

Ext.define('CrmApp.view.OrderDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.orderDetailGrid',
    store: 'OrderDetail',
    listeners: {
        render: function() {
            if(userObj.ROLE == 'manager'){
                Ext.getCmp('editOrderContextMenu').show();
            }
            Ext.getCmp('printAuthContextMenu').show();
            Ext.getCmp('emailAuthContextMenu').show();
            if(userObj.ROLE == 'manager'){
                Ext.getCmp('approveOrderContextMenu').show();
            }
        },
        itemcontextmenu: function(view, record, item, index, e){
            e.stopEvent();
            vGridContextMenus.showAt(e.getXY());
        }
    },
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
    selType: 'rowmodel',
    id: 'OrderDetailGridPanel',
    width: 'auto',
    height: gridHeight,
    viewConfig :
    {
        enableTextSelection: true

    },
    renderTo: 'complaintGrid',
    initComponent: function() {
        this.columns = [
            {header: "Order Date", width: 120, dataIndex: 'ORDERDATE', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            {header: "Order Ref. No.", width: 120, dataIndex: 'ORDERREF'},
            {header: "Source", width: 120, dataIndex: 'ORDERSOURCE'},
            {header: "Status", width: 120, dataIndex: 'ORDERSTATUS'},
            {header: "Dlv. Attempted", width: 120, dataIndex: 'deliveryAttempted'},
            {header: "Customer Name", width: 120, dataIndex: 'CONTNAME'},
            {header: "Dlv. State", width: 120, dataIndex: 'DELVSTATE'},
            {header: "Dlv. City", width: 120, dataIndex: 'DELVCITY'},
           /* {header: "Media", width: 120, dataIndex: 'MEDIADESC'},*/
            {header: "Language", width: 120, dataIndex: 'LANGDESC'},
            {header: "Offer", width: 120, dataIndex: 'OFFERDESC'},
            {header: "Rep", width: 120, dataIndex: 'USERDESC',filter: {type: 'string'}},
            {header: "Team", width: 120, dataIndex: 'TEAMDESC',filter: {type: 'string'}},
            {header: "Sub-Team", width: 120, dataIndex: 'SUBTEAMDESC',filter: {type: 'string'}},
            {header: "Notes", width: 120, dataIndex: 'DELIVERYREMARKS'},
            {header: "On-Hold Reason", width: 120, dataIndex: 'ONHOLDDESC',filter: {type: 'string'}},
            {header: "Authorized On", width: 120, dataIndex: 'AUTHORIZEDON', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            {header: "Prefer Date", width: 120, dataIndex: 'PREFERDATE', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            {header: "Execution Point", width: 120, dataIndex: 'EXECPOINTDESC'},
            {header: "Authorized By", width: 120, dataIndex: 'AUTHBYDESC'},
            {header: "Auth Notes", width: 120, dataIndex: 'AUTHREMARKS'},
            {header: "Total Due", width: 120, dataIndex: 'TOTALDUE'},
            {header: "UpSell Value", width: 120, dataIndex: 'ORDERLINES',

                renderer:function(value) {

                    // your logic here
                    var prod = 0 ;
                    for(var i = 0 ; i < value.length; i++){
                        if(value[i].ISUPSELL === 'Y')
                        {
                            prod = prod + (value[i].GROSS) ;

                        }

                    }

                    if(prod == 0)
                    {
                        prod = '';
                    }
                    return   prod ;
                }

            },
            {header: "Agent Upsell", width: 120, dataIndex: 'ORDERLINES',

                renderer:function(value) {

                    // your logic here
                    var prod = 0 ;
                    for(var i = 0 ; i < value.length; i++){
                        if(value[i].AGENTUPSELL === 'Y')
                        {
                            prod = prod + (value[i].GROSS) ;

                        }

                    }

                    if(prod == 0)
                    {
                        prod = '';
                    }

                    return   prod ;
                }


            },
            {header: "AMC Value", width: 120, dataIndex: 'ORDERLINES',

                renderer:function(value) {

                    // your logic here
                    var prod = 0 ;
                    for(i = 0 ; i < value.length; i++){
                        if(value[i].ISAMC === 'Y') {
                            prod = prod + (value[i].AMCVALUE);
                        }
                    }

                    if(prod == 0)
                    {
                        prod = '';
                    }


                    return   prod ;
                }

            },
            {header: "Bal. Due", width: 120, dataIndex: 'TOTALDUE'}
        ];
        this.callParent(arguments);
    }
});