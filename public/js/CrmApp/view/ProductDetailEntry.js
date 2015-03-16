Ext.define('CrmApp.view.ProductDetailEntry' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productDetailEntry',
    store : new Ext.data.Store({
        fields: ['PRODID', 'PRODDESC', 'SIZEID', 'SIZEDESC', 'DISCOUNTS', 'ISUPSELL','AGENTUPSELL', 'ISAMC', 'AMCVALUE', 'SALEPRICE', 'QNTY', 'GROSS', 'ISFREEITEM', 'ISNEW', 'ORDERREF', 'DATETAKEN', 'USERID', 'USERDESC','ORDERLINEID','ORDERLINEREF'],
        autoLoad: false
    }),
    selType: 'rowmodel',
	id: 'myProductDetailPanel',
	height: 178,
    border: false,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Edit',
                    handler: function (){
                        var selection = Ext.getCmp('myProductDetailPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selectedProductData = selection.data;
                            var rowIndex = Ext.getCmp('myProductDetailPanel').store.indexOf(selection);
                            var isFreeItem = selectedProductData.ISFREEITEM;
                            var isnew = selectedProductData.ISNEW;
                            /*if(!isnew){
                                Ext.Msg.alert('Confirm Order','This item cannot be edited,Please add new entry to modify.');
                                Ext.getCmp('productDropDown').setValue(selectedProductData.PRODID);
                                Ext.getCmp('basicPrice').setValue(selectedProductData.SALEPRICE);
                                Ext.getCmp('basicPrice').setDisabled(true);
                               // Ext.getCmp('addDiscount').setDisabled(true);
                             //   Ext.getCmp('saveProductDetails').setDisabled(true);
                                Ext.getCmp('editProductId').setValue(rowIndex);
                                Ext.getCmp('quantityField').setValue(selectedProductData.QNTY);
                                if(selectedProductData.DISCDISP != undefined)
                                {
                                    Ext.getCmp('orderDiscount').setValue(selectedProductData.DISCDISP);
                                }
                                else
                                {
                                    Ext.getCmp('orderDiscount').setValue('No Discount');
                                }
                                Ext.getCmp('quantityField').setDisabled(true);
                            }
                            else{*/
                                if(!isFreeItem) {
                                    if (rowIndex == 0){
                                        var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                                        if(freeItemsAdded.length > 0){
                                            Ext.Msg.alert('Confirm Order','Remove free items before edting this.');
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
                                    if(selectedProductData.DISCDISP != undefined)
                                    {
                                        Ext.getCmp('orderDiscount').setValue(selectedProductData.DISCDISP);
                                    }
                                    else
                                    {
                                        Ext.getCmp('orderDiscount').setValue('No Discount');
                                    }

                                    CrmApp.view.ProductDetailsForm.updateGrossValues();
                                }
                                else{
                                    Ext.Msg.alert('Confirm Order','This cannot be edited, first remove this, then add as fresh item.');
                                }

                           // }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    handler: function (){
                        var selection = Ext.getCmp('myProductDetailPanel').getSelectionModel().getSelection()[0];
                        if(selection){
                            var selectedProductData = selection.data;
                            var rowIndex = Ext.getCmp('myProductDetailPanel').store.indexOf(selection);
                            var isFreeItem = selectedProductData.ISFREEITEM;
                            var isnew = selectedProductData.ISNEW;

                            if(!isnew){
                                selectedProductData.QNTY = 0;
                                selectedProductData.GROSS = 0;
                                Ext.getCmp('myProductDetailPanel').getView().refresh();
                               // Ext.getCmp('myProductDetailPanel').store.reload();
                                CrmApp.view.ProductDetailsForm.updateGrossValues();
                              //  Ext.Msg.alert('Confirm Order','This item cannot be removed,Please add new entry with negative quantity.');
                            }
                            else{
                                if(!isFreeItem) {
                                    if (rowIndex == 0){
                                        var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                                        if(freeItemsAdded.length > 0){
                                            Ext.Msg.alert('Confirm Order','Remove free items before removing this.');
                                            return;
                                        }
                                    }
                                }
                                else{
                                    var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                                    var prodId = '_'+Ext.getCmp('myProductDetailPanel').getSelectionModel().getSelection()[0].data.PRODID+'_';
                                    if(freeItemsAdded.length > 0 && freeItemsAdded.search(prodId) >= 0){
                                        freeItemsAdded = freeItemsAdded.replace(prodId, '');
                                        Ext.getCmp('freeItemsAdded').setValue(freeItemsAdded);
                                    }
                                    var freeItemCost = Ext.getCmp('myProductDetailPanel').getSelectionModel().getSelection()[0].data.SALEPRICE;
                                    CrmApp.view.ProductDetailsForm.adjustFreeItemCost(freeItemCost, false);
                                }
                                Ext.getCmp('myProductDetailPanel').store.remove(selection);
                                Ext.getCmp('editProductId').setValue('');
                                CrmApp.view.ProductDetailsForm.updateGrossValues();
                            }

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
    ],
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
                header: 'Discounts',
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

