Ext.define('CrmApp.view.ProductDetailsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.productDetailsForm',
    border: false,
    layout: 'column',
    labelAlign: 'top',
    height: 313,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 1
    },
    listeners: {
        afterrender: function(){
            selectedProductId = allProductResults[0].PRODID;
            CrmApp.controller.CRMController.loadProductDataStore('productDropDown', 'product', selectedProductId);
            Ext.getCmp('editProductId').setValue('');
            var saleValue = Ext.getCmp('productDropDown').findRecordByValue(selectedProductId).data.saleValue;
            Ext.getCmp('basicPrice').setValue(saleValue);
            Ext.getCmp('basicPrice').setValue(3395);
            CrmApp.view.ProductDetailsForm.loadProductOption(selectedProductId);
            CrmApp.view.ProductDetailsForm.loadDiscounts();
           // Ext.getCmp('addDiscount').setDisabled(true);

        }
    },
    items: [
        {
            xtype: 'fieldset',
            collapsible: false,
            border: false,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 0, bottom: 0, left: 0}
                },
                hideLabel: true
            },
            items: [
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Product',
                            margins: '4 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'productDropDown',
                            id: 'productDropDown',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '2 10 0 0',
                            listeners: {
                                select: function(combo){
                                    Ext.getCmp('quantityField').setDisabled(false);
                                    Ext.getCmp('saveProductDetails').setDisabled(false);
                                    var isAmc = combo.findRecordByValue(combo.value).data.isAmc;
                                    var amcValue = combo.findRecordByValue(combo.value).data.amcValue;
                                    var saleValue = combo.findRecordByValue(combo.value).data.saleValue;
                                    if(isAmc == 'Y'){
                                        Ext.getCmp('amcValue').enable();
                                       // Ext.getCmp('amcValue').setValue(true);
                                        //saleValue = parseFloat(saleValue)+parseFloat(amcValue);
                                    }
                                    else if(isAmc == 'N'){
                                        Ext.getCmp('amcValue').disable();
                                        Ext.getCmp('amcValue').setValue(false);
                                    }
                                    Ext.getCmp('basicPrice').setValue(saleValue);
                                    CrmApp.view.ProductDetailsForm.loadProductOption(combo.value);
                                    if(Ext.getCmp('myProductDetailPanel').store.data.items.length > 0){
                                        Ext.getCmp('freeItemCheck').enable();
                                        Ext.getCmp('freeItemCheck').setValue(false);
                                        Ext.getCmp('editProductId').setValue('');
                                    }
                                }
                            }
                        },
                        {
                            width: 20,
                            xtype: 'checkboxfield',
                            name: 'amcValue',
                            disabled: true,
                            id: 'amcValue',
                            listeners: {
                                change: function(ctl, val){
                                    if(!val){
                                        var combo = Ext.getCmp('productDropDown');
                                        var amcValue = combo.findRecordByValue(combo.value).data.amcValue;
                                        var saleValue = combo.findRecordByValue(combo.value).data.saleValue;
                                        Ext.getCmp('basicPrice').setValue(saleValue);
                                    }
                                    else{
                                        var combo = Ext.getCmp('productDropDown');
                                        var isAmc = combo.findRecordByValue(combo.value).data.isAmc;
                                        var amcValue = combo.findRecordByValue(combo.value).data.amcValue;
                                        var saleValue = combo.findRecordByValue(combo.value).data.saleValue;
                                        saleValue = parseFloat(saleValue)+parseFloat(amcValue);
                                        Ext.getCmp('basicPrice').setValue(saleValue);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'AMC',
                            margins: '3 0 0 0',
                            width: 90
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Option',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'optionDropDown',
                            id: 'optionDropDown',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            width: 20,
                            xtype: 'checkboxfield',
                            name: 'offer',
                            disabled: true,
                            listeners: {
                                change: function(ctl, val){
                                    if(!val){
                                        Ext.getCmp('offerDropDown').setValue('');
                                        Ext.getCmp('offerDropDown').disable();
                                        Ext.getCmp('offerDetails').setValue('');
                                        Ext.getCmp('offerDetails').disable();
                                    }
                                    else{
                                        Ext.getCmp('offerDropDown').enable();
                                        Ext.getCmp('offerDropDown').setValue('offer1');
                                        Ext.getCmp('offerDetails').enable();
                                        Ext.getCmp('offerDetails').setValue('Blah blah blah');
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Offer',
                            margins: '3 0 0 0',
                            width: 90
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            disabled: true,
                            name: 'offerDropDown',
                            id: 'offerDropDown',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
                                    {name : 'Offer 1', value: 'Offer 1'},
                                    {name : 'Offer 2', value: 'Offer 1'},
                                    {name : 'Offer 3', value: 'Offer 1'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Offer Description',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            name: 'offerDetails',
                            rows:2,
                            id: 'offerDetails',
                            disabled: true
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Discount',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'orderDiscount',
                            id: 'orderDiscount',
                            displayField: 'value',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '2 10 0 0',
                            listConfig: {
                                tpl: Ext.create('Ext.XTemplate',
                                    '<ul style="list-style:none;margin:2px;padding:0px;"><tpl for=".">',
                                    '<tpl if="xindex == 1 || this.getGroupStr(parent[xindex - 2]) != this.getGroupStr(values)">',
                                    '<li class="x-combo-list-group"><b>{[this.getGroupStr(values)]}</b></li>',
                                    '</tpl>',
                                    '<li role="option" class="x-boundlist-item" style="padding-left:10px;">{value}</li>',
                                        '</tpl>' +
                                        '</ul>',
                                    {
                                        getGroupStr: function (values) {
                                            return values.name
                                        }
                                    }
                                )
                            }
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            width: 20,
                            xtype: 'checkboxfield',
                            name: 'freeItemCheck',
                            disabled: true,
                            id: 'freeItemCheck',
                            scope: this,
                            handler: function(field, value){
                                scope: this,
                                    this.checkValue = field.getValue();
                                if(this.checkValue == true){
                                    var productCombo = Ext.getCmp('productDropDown');
                                    var freeCost = productCombo.findRecordByValue(productCombo.value).data.freeCost;
                                    Ext.getCmp('basicPrice').setValue(freeCost);
                                    Ext.getCmp('quantityField').disable();
                                    Ext.getCmp('quantityField').setValue(1);
                                }
                                else if(this.checkValue == false){
                                    var productCombo = Ext.getCmp('productDropDown');
                                    var saleValue = productCombo.findRecordByValue(productCombo.value).data.saleValue;
                                    Ext.getCmp('basicPrice').setValue(saleValue);
                                    Ext.getCmp('quantityField').enable();
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Free Item',
                            margins: '3 0 0 0',
                            width: 90
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            id: 'basicPrice'
                        },
                        {
                            xtype: 'hidden',
                            width : 50,
                            id: 'freeItemsAdded',
                            value: ''
                        },
                        {
                            xtype: 'hidden',
                            width : 50,
                            id: 'editProductId'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    border: true,
                    items : [
                        {
                            width: 20,
                            xtype: 'checkboxfield',
                            name: 'upsell',
                            id: 'upsell',
                            handler: function(field, value){
                                scope: this,
                                    this.checkValue = field.getValue();
                                if(this.checkValue == true){
                                    var productCombo = Ext.getCmp('productDropDown');
                                    var saleValue = productCombo.findRecordByValue(productCombo.value).data.saleValue;
                                    Ext.getCmp('upsellValue').setValue(saleValue);

                                }
                                else if(this.checkValue == false){
                                    Ext.getCmp('upsellValue').setValue(null);
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'UpSell Value',
                            margins: '3 0 0 0',
                            width: 90
                        },
                        {
                            xtype: 'textfield',
                            name: 'upsellValue',
                            id: 'upsellValue',
                            width : 220
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Quantity',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'numberfield',
                            value: 1,
                            width : 220,
                            id: 'quantityField',
                            editable: false
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'saveProductDetails',
                            text: 'Save',
                            iconCls: 'savebutton',
                            margins: '0 0 0 10',
                            handler: function () {
                                CrmApp.view.ProductDetailsForm.saveOrderLine();
                            }
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        saveOrderLine: function(){
            var isNewItem = true;
            for(var i=0; i<Ext.getCmp('myProductDetailPanel').store.data.items.length; i++){
                if(Ext.getCmp('myProductDetailPanel').store.data.items[i].data.PRODID == Ext.getCmp('productDropDown').value){
                    if(Ext.getCmp('myProductDetailPanel').store.data.items[i].data.ISNEW == false){
                        var rowIndex = Ext.getCmp('editProductId').value;
                        if(rowIndex != ''){
                            var selection = Ext.getCmp('myProductDetailPanel').store.getAt(rowIndex);
                            var selectedProductData = selection.data;
                            if(selectedProductData.PRODID == Ext.getCmp('productDropDown').value){
                                isNewItem = false;
                                break;
                            }
                        }
                        isNewItem = true;
                    }
                    else{
                        isNewItem = false;
                    }
                }
            }
            if(isNewItem){
                var totalQty = Ext.getCmp('totalQuantity').value;
                var isfreeItem = Ext.getCmp('freeItemCheck').value;
                if(totalQty == 0 && isfreeItem){
                    alert('You cannot add first item as free item');
                    return;
                }
                else{
                   // alert('latest');
                    CrmApp.view.ProductDetailsForm.saveNewOrderLine();
                }
            }
            else{
                var rowIndex = Ext.getCmp('editProductId').value;
                if(rowIndex != ''){
                    var selection = Ext.getCmp('myProductDetailPanel').store.getAt(rowIndex);
                    var selectedProductData = selection.data;
                    if(selectedProductData.ISNEW  == false)
                    {
                      //  alert('OLd');
                       CrmApp.view.ProductDetailsForm.addDiscountOrderLine();
                    }
                    else
                    {
                        //alert('New');
                        CrmApp.view.ProductDetailsForm.updateOrderLine();
                    }
                }

            }
            Ext.getCmp('editProductId').setValue('');
            CrmApp.view.ProductDetailsForm.updateGrossValues();
        },
        updateGrossValues: function(){
            var grossPrice = 0;
            var totalItems = 0;
            for(var i=0; i<Ext.getCmp('myProductDetailPanel').store.data.items.length; i++){
                grossPrice += Ext.getCmp('myProductDetailPanel').store.data.items[i].data.GROSS;
                totalItems += Ext.getCmp('myProductDetailPanel').store.data.items[i].data.QNTY;
            }
            Ext.getCmp('grossPrice').setValue(grossPrice);
            Ext.getCmp('totalQuantity').setValue(totalItems);
            Ext.getCmp('totalDue').setValue(grossPrice);
            Ext.getCmp('paymentAmount').setValue(grossPrice);
        },
        saveNewOrderLine: function(){
            var rec = {};
            var quantity = Ext.getCmp('quantityField').value;
            var unitPrice = Ext.getCmp('basicPrice').value;
            var total = quantity * unitPrice;
            if(Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name == 'CASH'){
                var discount = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                total = total - discount;
            }
            else if(Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name == 'PERCENTAGE'){
                var discount = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                total = total - (discount*total)/100;
            }
            rec['PRODID'] = Ext.getCmp('productDropDown').value;
            rec['PRODDESC'] = Ext.getCmp('productDropDown').rawValue;
            if(Ext.getCmp('optionDropDown').value == null){
                rec['SIZEID'] = -1;
            }else{
                rec['SIZEID'] = Ext.getCmp('optionDropDown').value;
            }
            rec['SIZEDESC'] = Ext.getCmp('optionDropDown').rawValue;



            rec['DISCOUNTS'] = new Array();

            var checkDisc = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
            if(checkDisc != '000')
            {
                rec['DISCOUNTS'][0] = {};
                rec['DISCOUNTS'][0]['DISCTYPE'] = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name;
                rec['DISCOUNTS'][0]['DISCDISP'] = Ext.getCmp('orderDiscount').value;
                rec['DISCOUNTS'][0]['DISPVAL'] = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                rec['DISCOUNTS'][0]['DISCID'] = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
                rec['DISCOUNTS'][0]['DISCKIND'] = 'AUTH';
                rec['DISCOUNTS'][0]['ISACTIVE'] = 'Y';
            }

           // rec['DISCTYPE'] = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name;
            //rec['DISCDISP'] = Ext.getCmp('orderDiscount').value;
            //rec['DISPVAL'] = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
            //rec['DISCID'] = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;

            var isupSell = Ext.getCmp('upsell').getValue();
            if(isupSell)
            {
                rec['ISUPSELL'] = 'Y';
            }
            else
            {
                rec['ISUPSELL'] = 'Y';
            }

            var isAMC = Ext.getCmp('amcValue').getValue();
            if(isAMC)
            {
                rec['ISAMC'] = 'Y';
                var combo = Ext.getCmp('productDropDown');
                var amcValue = combo.findRecordByValue(combo.value).data.amcValue;
                rec['AMCVALUE'] = amcValue;
            }
            else
            {
                rec['ISAMC'] = 'N';
                rec['AMCVALUE'] = 0;
            }

            rec['SALEPRICE'] = unitPrice;
            rec['QNTY'] = quantity;
            rec['GROSS'] = total;
            rec['ISNEW'] = true;
            rec['USERDESC'] = userObj.USERNAME;
            rec['USERID'] = userObj.USERID;
            rec['ISFREEITEM'] = Ext.getCmp('freeItemCheck').value;
            var isFreItemAdded = Ext.getCmp('freeItemCheck').value;
            if(isFreItemAdded == true){
                var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                freeItemsAdded += '_'+Ext.getCmp('productDropDown').value+'_';
                Ext.getCmp('freeItemsAdded').setValue(freeItemsAdded);
                var productCombo = Ext.getCmp('productDropDown');
                var freeItemCost = productCombo.findRecordByValue(productCombo.value).data.freeCost;
                CrmApp.view.ProductDetailsForm.adjustFreeItemCost(freeItemCost, isFreItemAdded);
            }
            Ext.getCmp('myProductDetailPanel').store.add(rec);
        },
        updateOrderLine: function(){
            var rowIndex = Ext.getCmp('editProductId').value;
            if(rowIndex != '') {
                var selection = Ext.getCmp('myProductDetailPanel').store.getAt(rowIndex);
                var selectedProductData = selection.data;
                var quantity = Ext.getCmp('quantityField').value;
                var unitPrice = Ext.getCmp('basicPrice').value;
                var total = quantity * unitPrice;
                var discCount = selection.data.DISCOUNTS.length;

                var checkDisc = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
                if(checkDisc != '000')
                {
                    if(Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name == 'CASH'){
                        var discount = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                        total = total - discount;
                        //selectedProductData.GROSS = total;

                    }
                    else if(Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name == 'PERCENTAGE'){
                        var discount = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;

                        total = total - (discount*total)/100;
                        //selectedProductData.GROSS = total;

                    }

                }
                else
                {

                }
                selectedProductData.DISCOUNTS[discCount] ={};
                selectedProductData.DISCOUNTS[discCount].DISCTYPE = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name;
                selectedProductData.DISCOUNTS[discCount].DISCDISP = Ext.getCmp('orderDiscount').value;
                selectedProductData.DISCOUNTS[discCount].DISPVAL = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                selectedProductData.DISCOUNTS[discCount].DISCID = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
                selectedProductData.DISCOUNTS[discCount].DISCKIND = 'AUTH';
                selectedProductData.DISCOUNTS[discCount].ISACTIVE = 'Y';


                if(discCount > 0)
                {
                    selectedProductData.DISCOUNTS[discCount-1].ISACTIVE = 'N';

                }
                else
                {




                }



                selectedProductData.SIZEID = Ext.getCmp('optionDropDown').value;
                selectedProductData.SIZEDESC = Ext.getCmp('optionDropDown').rawValue;

                var isupSell = Ext.getCmp('upsell').getValue();
                if(isupSell)
                {
                    selectedProductData.AGENTUPSELL = 'N';
                }
                else
                {
                    selectedProductData.AGENTUPSELL = 'N';
                }


                var isAMC = Ext.getCmp('amcValue').getValue();
                if(isAMC)
                {
                    selectedProductData.ISAMC = 'Y';
                    var combo = Ext.getCmp('productDropDown');
                    var amcValue = combo.findRecordByValue(combo.value).data.amcValue;
                    selectedProductData.AMCVALUE = amcValue;
                }
                else
                {
                    selectedProductData.ISAMC = 'N';
                    selectedProductData.AMCVALUE = 0;
                }
                selectedProductData.SALEPRICE = unitPrice;
                selectedProductData.QNTY = quantity;
                selectedProductData.GROSS = total;
                selectedProductData.ISFREEITEM = Ext.getCmp('freeItemCheck').value;
                var isFreItemAdded = Ext.getCmp('freeItemCheck').value;
                if(isFreItemAdded == true){
                    var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                    freeItemsAdded += '_'+Ext.getCmp('productDropDown').value+'_';
                    Ext.getCmp('freeItemsAdded').setValue(freeItemsAdded);
                    var productCombo = Ext.getCmp('productDropDown');
                    var freeItemCost = productCombo.findRecordByValue(productCombo.value).data.freeCost;
                    CrmApp.view.ProductDetailsForm.adjustFreeItemCost(freeItemCost, isFreItemAdded);
                }
                Ext.getCmp('myProductDetailPanel').getView().refresh();
            }
            else{
                alert('Product Already Added..Select Product and Click Edit.');
            }
        },
        addDiscountOrderLine: function(){
            var rowIndex = Ext.getCmp('editProductId').value;
            if(rowIndex != '') {
                var selection = Ext.getCmp('myProductDetailPanel').store.getAt(rowIndex);
                var discCount = selection.data.DISCOUNTS.length;
                var selectedProductData = selection.data;
                var quantity = Ext.getCmp('quantityField').value;
                var unitPrice = Ext.getCmp('basicPrice').value;
                var total = quantity * unitPrice;
                var checkDisc = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
                if(checkDisc != '000')
                {
                    if(Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name == 'CASH'){
                        var discount = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                        total = total - discount;
                        //selectedProductData.GROSS = total;

                    }
                    else if(Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name == 'PERCENTAGE'){
                        var discount = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;

                        total = total - (discount*total)/100;
                        //selectedProductData.GROSS = total;

                    }

                }
                else
                {

                }
                selectedProductData.DISCOUNTS[discCount] ={};
                selectedProductData.DISCOUNTS[discCount].DISCTYPE = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name;
                selectedProductData.DISCOUNTS[discCount].DISCDISP = Ext.getCmp('orderDiscount').value;
                selectedProductData.DISCOUNTS[discCount].DISPVAL = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                selectedProductData.DISCOUNTS[discCount].DISCID = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
                selectedProductData.DISCOUNTS[discCount].DISCKIND = 'AUTH';
                selectedProductData.DISCOUNTS[discCount].ISACTIVE = 'Y';


                if(discCount > 0)
                {
                    selectedProductData.DISCOUNTS[discCount-1].ISACTIVE = 'N';

                }
                else
                {

                }

                var isupSell = Ext.getCmp('upsell').getValue();
                if(isupSell)
                {
                    selectedProductData.AGENTUPSELL = 'Y';
                }
                else
                {
                    selectedProductData.AGENTUPSELL = 'N';
                }

                selectedProductData.SALEPRICE = unitPrice;
                selectedProductData.QNTY = quantity;
                selectedProductData.GROSS = total;



                Ext.getCmp('myProductDetailPanel').getView().refresh();

                //alert(selection.data);
            }
            else{
                alert('Product Already Added..Select Product and Click Edit.');
            }
        },
        adjustFreeItemCost: function(freeItemCost, isFreItemAdded){
            var selection = Ext.getCmp('myProductDetailPanel').store.getAt(0);
            if(selection) {
                var selectedProductData = selection.data;
                var quantity = selectedProductData.QNTY;
                /*var productCombo = Ext.getCmp('productDropDown');
                 var freeItemCost = productCombo.findRecordByValue(productCombo.value).data.freeCost;*/
                var total = selectedProductData.GROSS;
                if (isFreItemAdded) {
                    total = parseFloat(total) - parseFloat(freeItemCost);
                }
                else{
                    total = parseFloat(total) + parseFloat(freeItemCost);
                }
                var unitPrice = total / quantity;
                selectedProductData.GROSS = total;
                selectedProductData.SALEPRICE = unitPrice;
                Ext.getCmp('myProductDetailPanel').getView().refresh();
            }
        },
        loadProductOption: function(productId){
            Ext.Ajax.request({
                url: '/crm/api/productsize/'+productId,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var dataOption = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataOption[i] = new Array();
                        dataOption[i]['name'] = responseObj[i].sizedesc;
                        dataOption[i]['value'] = responseObj[i].sizeid;
                    }
                    var optionStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataOption
                    });
                    Ext.getCmp('optionDropDown').clearValue();
                    Ext.getCmp('optionDropDown').bindStore(optionStore);
                    if(responseObj.length != 0){
                        Ext.getCmp('optionDropDown').setValue(responseObj[0].sizeid);
                    }
                    var dataOption = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadDiscounts: function(){
            Ext.Ajax.request({
                url: '/crm/api/order/discount',
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var dataOption = new Array();
                    dataOption[0] = new Array();
                    dataOption[0]['name'] = '';
                    dataOption[0]['value'] = 'No Discount';
                    dataOption[0]['dispVal'] = 0;
                    dataOption[0]['discId'] = '000';
                    for(var i=1; i<=responseObj.length; i++){
                        dataOption[i] = new Array();
                        dataOption[i]['name'] = responseObj[i-1].DISCTYPE;
                        dataOption[i]['value'] = responseObj[i-1].DISCDISP;
                        dataOption[i]['dispVal'] = responseObj[i-1].DISPVAL;
                        dataOption[i]['discId'] = responseObj[i-1].DISCID;
                    }
                    var optionStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'dispVal', 'discId'],
                        data: dataOption
                    });
                    Ext.getCmp('orderDiscount').clearValue();
                    Ext.getCmp('orderDiscount').bindStore(optionStore);
                    Ext.getCmp('orderDiscount').setValue('No Discount');
                    var dataOption = null;

                    CrmApp.view.ProductDetailsForm.updateGrossValues();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});