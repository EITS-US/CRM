Ext.define('CrmApp.view.Panel1' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.panel1',
	layout: 'auto',
	border: false,
    items: [	
		{
			xtype: 'orderForm'
		},
		{
			xtype: 'headerEntry',
            id: 'myGridPanel',
            width: 486,
            height: 197,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Edit',
                            handler: function (){
                                var selection = Ext.getCmp('myGridPanel').getSelectionModel().getSelection()[0];
                                if(selection){
                                    var selectedProductData = selection.data;
                                    var rowIndex = Ext.getCmp('myGridPanel').store.indexOf(selection);
                                    var isFreeItem = selectedProductData.ISFREEITEM;
                                    if(!isFreeItem) {
                                        if (rowIndex == 0){
                                            var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                                            if(freeItemsAdded.length > 0){
                                                alert('Remove free items before edting this.');
                                                return;
                                            }
                                            else {
                                                Ext.getCmp('freeItemCheck').disable();
                                            }
                                        }
                                        else {
                                            Ext.getCmp('freeItemCheck').enable();
                                        }
                                        Ext.getCmp('quantityField').setDisabled(false);
                                        Ext.getCmp('freeItemCheck').setValue(false);
                                        Ext.getCmp('editProductId').setValue(rowIndex);
                                        Ext.getCmp('productDropDown').setValue(selectedProductData.PRODID);
                                        Ext.getCmp('basicPrice').setValue(selectedProductData.SALEPRICE);
                                        Ext.getCmp('optionDropDown').setValue(selectedProductData.SIZEID);
                                        Ext.getCmp('quantityField').setValue(selectedProductData.QNTY);
                                        Ext.getCmp('orderDiscount').setValue(selectedProductData.DISCDISP);
                                        CrmApp.view.OrderForm.updateGrossValues();
                                    }
                                    else{
                                        alert('This cannot be edited, first remove this, then add as fresh item.');
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            handler: function (){
                                var selection = Ext.getCmp('myGridPanel').getSelectionModel().getSelection()[0];
                                if(selection){
                                    var selectedProductData = selection.data;
                                    var rowIndex = Ext.getCmp('myGridPanel').store.indexOf(selection);
                                    var isFreeItem = selectedProductData.ISFREEITEM;
                                    if(!isFreeItem) {
                                        if (rowIndex == 0){
                                            var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                                            if(freeItemsAdded.length > 0){
                                                alert('Remove free items before removing this.');
                                                return;
                                            }
                                        }
                                    }
                                    else{
                                        var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                                        var prodId = '_'+Ext.getCmp('myGridPanel').getSelectionModel().getSelection()[0].data.PRODID+'_';
                                        if(freeItemsAdded.length > 0 && freeItemsAdded.search(prodId) >= 0){
                                            freeItemsAdded = freeItemsAdded.replace(prodId, '');
                                            Ext.getCmp('freeItemsAdded').setValue(freeItemsAdded);
                                        }
                                        var freeItemCost = Ext.getCmp('myGridPanel').getSelectionModel().getSelection()[0].data.SALEPRICE;
                                        CrmApp.view.OrderForm.adjustFreeItemCost(freeItemCost, false);
                                    }
                                    Ext.getCmp('myGridPanel').store.remove(selection);
                                    Ext.getCmp('editProductId').setValue('');
                                    CrmApp.view.OrderForm.updateGrossValues();
                                    CrmApp.view.OrderForm.toogleNextBtn();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Total',
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            width : 50,
                            editable: false,
                            id: 'totalQuantity',
                            value: 0
                        },
                        ' - ',
                        {
                            xtype: 'textfield',
                            width : 50,
                            editable: false,
                            id: 'grossPrice',
                            value: 0
                        }
                    ]
                }
            ]
		}
	]
});