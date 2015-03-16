/**
 * Created by AM015SI on 10/20/2014.
 */

Ext.Loader.setPath('Ext.ux', '../js/lib/ux');
Ext.require([
    'Ext.grid.plugin.RowExpander'
]);

Ext.define('CrmApp.view.OrderHistoryDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.orderHistoryDetailGrid',
    store : new Ext.data.ArrayStore({
        fields: ['ORDERREF', 'ORDERSTATUS', 'TOTALDUE', 'CONTNAME', 'DELVSTATE', 'DELVCITY', 'ORDERDATE', 'ORDERDESC'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    width: 720,
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<table width="100%"><tr style="font-size:13px;"><td valign="top"><b>Order Line:</b></td><td>{ORDERDESC}</td></tr></table>'
        ]
    }],
    initComponent: function() {
        this.columns = [
            {header: "Order No.", width: 100, dataIndex: 'ORDERREF'},
            {header: "Status", width: 100, dataIndex: 'ORDERSTATUS'},
            {header: "Total Due", width: 100, dataIndex: 'TOTALDUE'},
            {header: "Customer Name", width: 100, dataIndex: 'CONTNAME'},
            {header: "Dlv. State", width: 100, dataIndex: 'DELVSTATE'},
            {header: "Dlv. City", width: 100, dataIndex: 'DELVCITY'},
            {header: "Order Date", width: 100, dataIndex: 'ORDERDATE', type: 'date', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
        ];
        this.callParent(arguments);
    }
});
