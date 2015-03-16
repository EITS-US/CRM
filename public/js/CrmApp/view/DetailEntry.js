Ext.define('CrmApp.view.DetailEntry' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.detailEntry',
    store : 'Details',
    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    
    initComponent: function() {
        
    	this.columns = [
            {header: 'Line No.',  dataIndex: 'lineNo',  flex: 1},
            {header: 'Item No.',  dataIndex: 'itemNo',  flex: 1,
            	editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }},
            {header: 'Description',  dataIndex: 'desc',  flex: 1,
            	editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }},
            {header: 'Quantity',  dataIndex: 'quantity',  flex: 1,
            	editor: {
                    xtype: 'numberfield',
                    allowBlank: false
                }},
            {header: 'Price',  dataIndex: 'price',  flex: 1,
                	editor: {
                        xtype: 'numberfield',
                        allowBlank: false
                }}
        ];

        this.callParent(arguments);
    }
    
   
});

