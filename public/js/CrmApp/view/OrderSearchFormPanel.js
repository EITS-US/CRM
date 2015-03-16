Ext.define('CrmApp.view.OrderSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.orderSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    listeners: {
        afterrender: function(){
            CrmApp.view.OrderSearchFormPanel.loadProductDataStore('orderSearchProduct');
            CrmApp.view.OrderSearchFormPanel.loadPayModes();
            Ext.getCmp('orderState').setValue(['P,H,C,K,A,D']);
            Ext.getCmp('endDate').timeField.setRawValue("22:00");
            Ext.getCmp('startDate').timeField.setRawValue("22:00");
            CrmApp.view.OrderSearchFormPanel.setOrderForm();
        }
    },
    buildItems : function() {
        return [
            {
                xtype: 'combo',
                fieldLabel: 'Order State',
                name: 'orderState',
                id: 'orderState',
                mode: 'local',
                value: 'all',
                multiSelect: true,
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                margin: '58 0 0 0',
                width:250,
                displayField: 'name',
                valueField: 'value',
                queryMode: 'local',
                listConfig : {
                    getInnerTpl : function() {
                        return '<div class="chkCombo"> {name} </div>';
                    }
                },
                store: Ext.create('Ext.data.Store', {
                    fields : ['name', 'value'],
                    data   : [
                        {name : 'All',  value: 'P,H,C,K,A,D'},
                        {name : 'Pending',   value: 'P'},
                        {name : 'On Hold',  value: 'H'},
                        {name : 'Temp. Cancel',  value: 'C'},
                        {name : 'Invoiced',  value: 'K'},
                        {name : 'Cancelled',  value: 'cancelled'},
                        {name : 'Authorized',  value: 'A'},
                        {name : 'Rejected',  value: 'rejected'},
                        {name : 'Delivered',  value: 'D'},
                        {name : 'Invoice Authorized',  value: 'invoiceAuthorized'},
                        {name : 'Delv. Authorized',  value: 'D'}
                    ]
                })
            },
            {
                xtype: 'fieldset',
                title: 'Params',
                layout: 'vbox',
                width: 470,
                margin: '0 0 0 10',
                bodyPadding: 0,
                height: 128,
                items: [
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Invoice',
                                name: 'invoiceNumber',
                                id: 'invoiceNumber',
                                labelWidth : 70
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Order Ref.',
                                name: 'orderRefNumber',
                                id: 'orderRefNumber',
                                labelWidth : 70,
                                margins: '0 0 0 10'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Customer',
                                name: 'customerName',
                                id: 'orderCustomerName',
                                labelWidth : 70,
                                margins: '5 0 0 0'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Phone No.',
                                name: 'phoneNumber',
                                id: 'orderPhoneNumber',
                                labelWidth : 70,
                                margins: '5 0 0 10'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Product',
                                name: 'orderSearchProduct',
                                id: 'orderSearchProduct',
                                labelWidth : 70,
                                displayField: 'name',
                                valueField: 'value',
                                queryMode: 'local',
                                mode: 'local',
                                triggerAction: 'all',
                                forceSelection: true,
                                editable: true,
                                margins: '5 0 0 0',
                                listeners: {
                                    select: function(combo){
                                        CrmApp.view.OrderSearchFormPanel.loadProductOption(combo.value);
                                    }

                                }
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Variant',
                                name: 'optionSearchDropDown',
                                id: 'optionSearchDropDown',
                                labelWidth : 70,
                                displayField: 'name',
                                valueField: 'value',
                                queryMode: 'local',
                                mode: 'local',
                                triggerAction: 'all',
                                forceSelection: true,
                                editable: false,
                                margins: '5 0 0 10',
                                listeners: {

                                    select: function (comp, record, index) {
                                        //  alert(comp.getValue());
                                        // alert(comp.getDisplayValue());
                                        if (comp.getValue() === -1)
                                        {
                                            //   alert('test');
                                            comp.setValue(null);
                                        }

                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Pay Mode',
                                name: 'payMode',
                                id:'payMode',
                                labelWidth : 70,
                                displayField: 'name',
                                valueField: 'PAYMODEID',
                                queryMode: 'local',
                                mode: 'local',
                                triggerAction: 'all',
                                forceSelection: true,
                                editable: false,
                                margins: '5 0 0 0',
                                listeners: {

                                    select: function (comp, record, index) {
                                        //  alert(comp.getValue());
                                        // alert(comp.getDisplayValue());
                                        if (comp.getValue() === -1)
                                        {
                                            //   alert('test');
                                            comp.setValue(null);
                                        }

                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Date Range',
                layout: 'vbox',
                width: 315,
                margin: '0 0 0 10',
                height: 128,
                items: [
                    {
                        xtype: 'xdatetime',
                        fieldLabel: 'From',
                        name: 'startDate',
                        timeFormat: 'H:i',
                        id: 'startDate',
                        timeConfig: {
                            altFormats: 'H:i'
                            ,allowBlank: true
                            ,editable: true

                        },
                        margin: '0 0 5 0',
                        labelWidth: 60,
                        width: 290
                    },
                    {
                        xtype: 'xdatetime',
                        fieldLabel: 'To',
                        timeFormat: 'H:i',
                        name: 'endDate',
                        id: 'endDate',
                        timeConfig: {
                            altFormats: 'H:i'
                            ,allowBlank: true
                            ,editable: true

                        },
                        labelWidth : 60,
                        width: 290
                    }
                ]
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'Find',
                width: 60,
                margin: '58 0 0 10',
                handler: function () {
                    orderFormObj.orderState = Ext.getCmp('orderState').value;
                    orderFormObj.invoiceNumber = Ext.getCmp('invoiceNumber').value;
                    orderFormObj.orderRefNumber = Ext.getCmp('orderRefNumber').value;
                    orderFormObj.orderCustomerName = Ext.getCmp('orderCustomerName').value;
                    orderFormObj.orderPhoneNumber = Ext.getCmp('orderPhoneNumber').value;
                    orderFormObj.payMode = Ext.getCmp('payMode').value;
                    orderFormObj.startDate = Ext.getCmp('startDate').getValue();
                    orderFormObj.endDate = Ext.getCmp('endDate').getValue();
                    if(orderFormObj.startDate !== null && orderFormObj.endDate !== null){
                        CrmApp.view.OrderSearchFormPanel.searchOrderDetails();
                    }
                }
            }
        ];
    },
    statics: {
        setOrderForm: function(){
            if(orderFormObj.orderState !== undefined){
                Ext.getCmp('orderState').setValue(orderFormObj.orderState);
            }
            if(orderFormObj.invoiceNumber !== undefined){
                Ext.getCmp('invoiceNumber').setValue(orderFormObj.invoiceNumber);
            }
            if(orderFormObj.orderRefNumber !== undefined){
                Ext.getCmp('orderRefNumber').setValue(orderFormObj.orderRefNumber);
            }
            if(orderFormObj.orderCustomerName !== undefined){
                Ext.getCmp('orderCustomerName').setValue(orderFormObj.orderCustomerName);
            }
            if(orderFormObj.orderPhoneNumber !== undefined){
                Ext.getCmp('orderPhoneNumber').setValue(orderFormObj.orderPhoneNumber);
            }
            if(orderFormObj.payMode !== undefined){
                Ext.getCmp('payMode').setValue(orderFormObj.payMode);
            }
            if(orderFormObj.startDate !== undefined){
                Ext.getCmp('startDate').setValue(orderFormObj.startDate);
            }
            if(orderFormObj.endDate !== undefined){
                Ext.getCmp('endDate').setValue(orderFormObj.endDate);
            }
        },
        searchOrderDetails: function () {
            var searchJson = '{';
            var prefix = '';
            var searchType = '';
            var isStatus = true;
            var statusCombo = Ext.getCmp('orderState');

            for(var i=0; i<statusCombo.value.length; i++) {
                // formJson['DISPO'][0]['PRODUCTS'][i]['PRODID'] = statusCombo.value[i];

                if(isStatus)
                {
                    searchType = searchType + statusCombo.value[i];
                    isStatus = false;
                }else
                {
                    searchType = searchType + ","+ statusCombo.value[i];
                }

            }

            /*for(var i=0; i<Ext.ComponentQuery.query('combo[name=orderState]').length; i++){
                if(Ext.ComponentQuery.query('combo[name=orderState]')[i] === true){

                    alert("Hu");
                    if(isStatus)
                    {
                        searchType = searchType + "'"+ Ext.ComponentQuery.query('combo[name=orderState]')[i].inputValue +"'";
                        isStatus = true;
                    }else
                    {
                        searchType = searchType + ",'"+ Ext.ComponentQuery.query('combo[name=orderState]')[i].inputValue +"'";
                    }
                    prefix = ',';
                   // searchType = searchType + "'"+ Ext.ComponentQuery.query('combo[name=orderState]')[i].inputValue +"'";
                }
            }*/

            if(!isStatus)
            {
                searchJson += prefix + '"ORDERSTATUS":"'+searchType+'"';
                prefix = ',';
            }


           /* var searchDate = 'calldate';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=complaintSearchDate]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].getValue() == true){
                    searchDate = Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].inputValue;
                }
            }*/
        //    searchJson += '"SEARCHDATE":"'+searchDate+'",';

            var productName = Ext.ComponentQuery.query('combo[name=orderSearchProduct]')[0].value;
            if(typeof productName === 'undefined' || productName === 'default'){

            }
            else
            {
                searchJson += prefix +'"ORDERLINES.PRODID":'+productName;
                prefix = ',';
            }



            var productVariant = Ext.ComponentQuery.query('combo[name=optionSearchDropDown]')[0].value;
            if(typeof productVariant === 'undefined' || productVariant === null){

            }
            else
            {
                searchJson += prefix +'"ORDERLINES.SIZEID":"'+productVariant+'"';
                prefix = ',';
            }

            var payModeVariant = Ext.ComponentQuery.query('combo[name=payMode]')[0].value;
            if(typeof payModeVariant === 'undefined' || payModeVariant === null){

            }
            else
            {
                searchJson += prefix +'"PAYMENTLINES.PAYMENTMODEID":'+payModeVariant;
                prefix = ',';
            }



            var customerName = Ext.ComponentQuery.query('textfield[name=customerName]')[0].value;
            if(typeof customerName === 'undefined'){

            }
            else
            {
                searchJson += prefix +'"CONTNAME":"'+customerName+'"';
                prefix = ',';
            }


            var orderRef = Ext.ComponentQuery.query('textfield[name=orderRefNumber]')[0].value;
            if(typeof orderRef === 'undefined' || orderRef ==='')
            {

            }
            else
            {
                searchJson += prefix +'"ORDERREF":"'+orderRef+'"';
                prefix = ',';
            }

            /*else{
                searchJson += '"CUSTOMERNAME":null,';
            }*/
           // var callerNo = Ext.ComponentQuery.query('textfield[name=callbackPhoneNumber]')[0].value;
           /* if(callerNo != ""){
                searchJson += '"CALLERNO":"'+callerNo+'",';
            }
            else{
                searchJson += '"CALLERNO":null,';
            }*/
             var startDate = Ext.getCmp('startDate').getValue();
            startDate = startDate.toISOString();
           searchJson += prefix + '"DATEFROM":"'+startDate+'"';
            prefix = ',';
            var endDate = Ext.getCmp('endDate').getValue();
            endDate = endDate.toISOString();
           searchJson += prefix + '"DATETO":"'+endDate+'"';
            searchJson += prefix +'"USERNAME":"' + userObj.USERNAME+'"';
           //searchJson += '"ROLE":""';
           searchJson += '}';
            //console.log(searchJson);
            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.OrderDetail',
                proxy: {
                    type: 'ajax',
                    // url: '/crm/api/call?Search={"CALLERNO": "9953008767","LINEID":"123456"}',
                    url: '/crm/api/getSearchOrder?Search='+searchJson,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('OrderDetailGridPanel').bindStore(store);
        },
        loadProductDataStore: function(comboId){
            var dataProduct = new Array();
            dataProduct[0] = new Array();
            dataProduct[0]['name'] = 'Select a Product...';
            dataProduct[0]['value'] = 'default';
            dataProduct[0]['saleValue'] = 0;
            dataProduct[0]['freeCost'] = 0;
            dataProduct[0]['isAmc'] = 'N';
            dataProduct[0]['amcValue'] = 0;
            for (var i = 1; i <= allProductResults.length; i++) {
                dataProduct[i] = new Array();
                dataProduct[i]['name'] = allProductResults[i-1].PRODDESC;
                dataProduct[i]['value'] = allProductResults[i-1].PRODID;
                dataProduct[i]['saleValue'] = allProductResults[i-1].SALEVALUE;
                dataProduct[i]['freeCost'] = allProductResults[i-1].FREECOST;
                dataProduct[i]['isAmc'] = allProductResults[i-1].ISAMC;
                dataProduct[i]['amcValue'] = allProductResults[i-1].AMCVALUE;
            }
            var productStore = Ext.create('Ext.data.Store', {
            autoDestroy: true,
            fields: ['name', 'value', 'saleValue', 'freeCost', 'isAmc', 'amcValue'],
            data: dataProduct
            });
            Ext.getCmp(comboId).clearValue();
            Ext.getCmp(comboId).bindStore(productStore);
            Ext.getCmp(comboId).setValue('default');
            var dataProduct = null;
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

                    var rec = { name: '&nbsp;',value: -1 };
                    optionStore.insert(0,rec);

                    Ext.getCmp('optionSearchDropDown').clearValue();
                    Ext.getCmp('optionSearchDropDown').bindStore(optionStore);
                    if(responseObj.length != 0){
                        Ext.getCmp('optionSearchDropDown').setValue(responseObj[0].sizeid);
                    }
                    var dataOption = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadPayModes: function() {




            Ext.Ajax.request({
                url: '/crm/api/getPaymodes',
                async: false,
                success: function (response, opts) {

                    var dataPayMode = new Array();
                    var payModes;

                    payModes = Ext.decode(response.responseText);


                    for (var j = 0; j < payModes.length; j++) {

                            dataPayMode[j] = new Array();
                            dataPayMode[j]['PAYMODEID'] = payModes[j].PAYMODEID;
                            dataPayMode[j]['name'] = payModes[j].PAYMODEDESC;


                    }

                    var payModeStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['PAYMODEID', 'name'],
                        data: dataPayMode
                    });

                    var rec = { PAYMODEID: -1, name: '&nbsp;' };
                    payModeStore.insert(0,rec);

                    Ext.getCmp('payMode').clearValue();
                    Ext.getCmp('payMode').bindStore(payModeStore);
                    // Ext.getCmp('paymentMode').setValue(payModeOptions[0].MODEDESC);
                }

            });
        }
    }
});