Ext.define('CrmApp.view.OrderForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.orderForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.controller.CRMController.loadProductDataStore('productDropDown', 'product', selectedProductId);
            if(selectedProductId != ""){
                var saleValue = Ext.getCmp('productDropDown').findRecordByValue(selectedProductId).data.saleValue;
                Ext.getCmp('basicPrice').setValue(saleValue);
                CrmApp.view.OrderForm.loadProductOption(selectedProductId);
            }


            if(true){
                Ext.getCmp('quantityField').setMinValue(0);
            }
            CrmApp.view.OrderForm.loadDiscounts();
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
                                    var isAmc = combo.findRecordByValue(combo.value).data.isAmc;
                                    var amcValue = combo.findRecordByValue(combo.value).data.amcValue;
                                    var saleValue = combo.findRecordByValue(combo.value).data.saleValue;
                                    if(isAmc == 'Y'){
                                        Ext.getCmp('amcValue').enable();
                                    }
                                    else if(isAmc == 'N'){
                                        Ext.getCmp('amcValue').disable();
                                    }
                                    Ext.getCmp('basicPrice').setValue(saleValue);
                                    CrmApp.view.OrderForm.loadProductOption(combo.value);
                                    if(Ext.getCmp('myGridPanel').store.data.items.length > 0){
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
                            margins: '3 0 0 0',
                            width: 110
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
                            editable: true,
                            minValue:0

                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'saveProductDetails',
                            text: 'Save',
                            iconCls: 'savebutton',
                            margins: '0 0 0 10',
                            handler: function () {
                                if(Ext.getCmp('productDropDown').value != null){
                                    if (Ext.getCmp("quantityField").value < 1) {
                                        Ext.Msg.alert("Order", "Please enter valid quantity of product");
                                        return;
                                    } else {
                                        CrmApp.view.OrderForm.saveOrderLine();
                                    }
                                }
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
            for(var i=0; i<Ext.getCmp('myGridPanel').store.data.items.length; i++){
                if(Ext.getCmp('myGridPanel').store.data.items[i].data.PRODID == Ext.getCmp('productDropDown').value){
                    isNewItem = false;
                }
            }
            if(isNewItem){
                var storeLen = Ext.getCmp('myGridPanel').store.data.items.length;
                var isfreeItem = Ext.getCmp('freeItemCheck').value;
                if(storeLen == 0 && isfreeItem){
                    alert('You cannot add first item as free item');
                    return;
                }
                else{
                    CrmApp.view.OrderForm.saveNewOrderLine();
                }
            }
            else{
                CrmApp.view.OrderForm.updateOrderLine();
            }
            Ext.getCmp('editProductId').setValue('');
            CrmApp.view.OrderForm.updateGrossValues();
            CrmApp.view.OrderForm.toogleNextBtn();
        },
        updateGrossValues: function(){
            var grossPrice = 0;
            var totalItems = 0;
            for(var i=0; i<Ext.getCmp('myGridPanel').store.data.items.length; i++){
                grossPrice += Ext.getCmp('myGridPanel').store.data.items[i].data.GROSS;
                totalItems += Ext.getCmp('myGridPanel').store.data.items[i].data.QNTY;
            }
            Ext.getCmp('grossPrice').setValue(grossPrice);
            Ext.getCmp('netDue').setValue(grossPrice);
            Ext.getCmp('totalQuantity').setValue(totalItems);
            var totalDue = grossPrice - parseFloat(Ext.getCmp('totalPayable').value);
            Ext.getCmp('totalDue').setValue(totalDue);
            Ext.getCmp('paymentAmount').setValue(totalDue);
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
                rec['DISCOUNTS'][0]['DISCKIND'] = 'ORDER';
                rec['DISCOUNTS'][0]['ISACTIVE'] = 'Y';
            }

            rec['AGENTUPSELL'] = '';

            var isAMC = Ext.getCmp('amcValue').value;

            if(isAMC === true)
            {
                var productCombo = Ext.getCmp('productDropDown');
                var amcvalue = productCombo.findRecordByValue(productCombo.value).data.amcValue;
                rec['ISAMC'] = 'Y';
                rec['AMCVALUE'] = amcvalue;
                rec['AMCBYDESC'] = userObj.USERNAME;
                rec['AMCBYID'] = userObj.USERID;



            }
            else
            {
                rec['ISAMC'] = 'N';
                rec['AMCVALUE'] = 0;
                rec['AMCBYDESC'] = '';
                rec['AMCBYID'] = '';
            }


            rec['SALEPRICE'] = unitPrice;
            rec['QNTY'] = quantity;
            rec['GROSS'] = total;
            rec['USERDESC'] = userObj.USERNAME;
            rec['USERID'] = userObj.USERID;
            //rec['FREEITEM'] = Ext.getCmp('freeItemCheck').value;
            var isFreItemAdded = Ext.getCmp('freeItemCheck').value;
            if(isFreItemAdded == true){
                var freeItemsAdded = Ext.getCmp('freeItemsAdded').value;
                freeItemsAdded += '_'+Ext.getCmp('productDropDown').value+'_';
                Ext.getCmp('freeItemsAdded').setValue(freeItemsAdded);
                var productCombo = Ext.getCmp('productDropDown');
                var freeItemCost = productCombo.findRecordByValue(productCombo.value).data.freeCost;
                rec['FREEITEM'] = 'Y'
                rec['FREEITEMCOST'] = freeItemCost;
                rec['ORIGINALPRICE'] = unitPrice;
                CrmApp.view.OrderForm.adjustFreeItemCost(freeItemCost, isFreItemAdded);
            }
            Ext.getCmp('myGridPanel').store.add(rec);
            Ext.getCmp('freeItemCheck').setValue(false);
            Ext.getCmp('amcValue').setValue(false);
        },
        updateOrderLine: function(){
            var rowIndex = Ext.getCmp('editProductId').value;
            if(rowIndex != '') {
                var selection = Ext.getCmp('myGridPanel').store.getAt(rowIndex);
                var selectedProductData = selection.data;
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
                selectedProductData.SIZEID = Ext.getCmp('optionDropDown').value;
                selectedProductData.SIZEDESC = Ext.getCmp('optionDropDown').rawValue;
                selectedProductData.DISCTYPE = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.name;
                selectedProductData.DISCDISP = Ext.getCmp('orderDiscount').value;
                selectedProductData.DISPVAL = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.dispVal;
                selectedProductData.DISCID = Ext.getCmp('orderDiscount').findRecordByValue(Ext.getCmp('orderDiscount').value).data.discId;
                selectedProductData.AGENTUPSELL = '';
                selectedProductData.ISAMC = 'N';
                selectedProductData.AMCVALUE = 0;
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
                    CrmApp.view.OrderForm.adjustFreeItemCost(freeItemCost, isFreItemAdded);
                }
                Ext.getCmp('myGridPanel').getView().refresh();
            }
            else{
                alert('select a product and click edit.');
            }
        },
        adjustFreeItemCost: function(freeItemCost, isFreItemAdded){
            var selection = Ext.getCmp('myGridPanel').store.getAt(0);
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
                Ext.getCmp('myGridPanel').getView().refresh();
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
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        toogleNextBtn: function(){
            if(Ext.getCmp('myGridPanel').store.data.items.length){
                if(parseInt(Ext.getCmp('totalOrderAmount').value) != 0){
                    if(parseInt(Ext.getCmp('grossPrice').value) >= parseInt(Ext.getCmp('totalOrderAmount').value)){
                        Ext.getCmp('orderNext').enable();
                    }
                    else{
                        Ext.getCmp('orderNext').disable();
                    }
                }
                else{
                    Ext.getCmp('orderNext').enable();
                }
            }
            else{
                Ext.getCmp('orderNext').disable();
            }
        }
    }
});