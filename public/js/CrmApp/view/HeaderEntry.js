Ext.define('CrmApp.view.HeaderEntry' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.headerEntry',
    store : new Ext.data.Store({
        fields: ['PRODID', 'PRODDESC', 'SIZEID', 'SIZEDESC', 'DISCOUNTS','AGENTUPSELL', 'ISAMC', 'AMCVALUE', 'SALEPRICE', 'QNTY', 'GROSS', 'ISFREEITEM', 'USERID', 'USERDESC','FREEITEM','FREEITEMCOST','ORIGINALPRICE','ISUPSELL','UPSELLVALUE'],
        autoLoad: false
    }),
    selType: 'rowmodel',
    initComponent: function() {        
    	this.columns = [
            {
				header: 'Product',
				dataIndex: 'PRODDESC',
				flex: 1
			},
            {
                header: 'Option',
                dataIndex: 'SIZEDESC',
                width: '80'
            },
            {
            	header: 'Discount',  
            	dataIndex: 'DISCOUNTS',
            	width: '80',
                renderer:function(value) {

                    // your logic here
                    var prod = "";
                    for(i = 0 ; i < value.length; i++){
                        if(value[i].ISACTIVE === 'Y')
                        {
                            prod = prod.concat(value[i].DISCDISP) + "</br>";
                        }

                    }
                    return   prod ;
                }
            },
            {
                header: 'Unit Price',
                dataIndex: 'SALEPRICE',
                width: '80'
            },
			{
				header: 'Qty', 
				dataIndex: 'QNTY',
				width: '40'
			},
			{
				header: 'Total', 
				dataIndex: 'GROSS',
				width: '80'
			}
        ];
        this.callParent(arguments);
    }
});

