Ext.define('CrmApp.view.ComplaintRequestForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.complaintRequestForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.ComplaintRequestForm.loadOrderForComplaint();
            CrmApp.view.ComplaintRequestForm.loadComplaintsByCustomer();
        }
    },
    dockedItems: [
        {
            xtype: 'container',
            dock: 'top',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '5 5 5 5',
            items: [
                {
                    xtype: 'radiogroup',
                    width: 220,
                    items: [
                        {
                            boxLabel: 'New',
                            name: 'complaintRequestChoice',
                            checked: true,
                            inputValue: 1,
                            handler: function(ctl, val){
                                if(val) {
                                    Ext.getCmp('complaintFieldSet').show();
                                    Ext.getCmp('reminderFieldSet').hide();
                                }
                            }
                        },
                        {
                            boxLabel: 'Reminder',
                            name: 'complaintRequestChoice',
                            margins: '0 0 0 5',
                            inputValue: 2,
                            handler: function(ctl, val){
                                if(val) {
                                    Ext.getCmp('reminderFieldSet').show();
                                    Ext.getCmp('complaintFieldSet').hide();
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'fieldset',
            collapsible: false,
            id: 'complaintFieldSet',
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
                            text: 'OrderRef',
                            margins: '7 10 0 0',
                            width: 140
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'orderRefCombo',
                            id: 'orderRefCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '5 0 0 0',
                            listeners: {
                                select: function(combo){
                                    var prodIds = combo.findRecordByValue(combo.value).data.prodIds;
                                    var orderstatus = combo.findRecordByValue(combo.value).data.status;
                                    console.log(orderstatus);
                                    prodIds = prodIds.split(',').map(Number);
                                    CrmApp.view.ComplaintRequestForm.loadProductByOrderLines(prodIds);
                                }
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
                            xtype: 'label',
                            text: 'Complaint Category',
                            margins: '2 10 0 0',
                            width: 140
                        },
                        {
                            xtype: 'radiogroup',
                            width: 220,
                            id: 'complaintTypeCategory',
                            items: [
                                {
                                    boxLabel: 'Pre-Sales',
                                    name: 'complaintCategory',
                                    inputValue: 'Pre-Sales',
                                    handler: function(ctl, val){
                                        if(val) {
                                            CrmApp.view.ComplaintRequestForm.loadComplaintReasons(5);
                                        }
                                    }

                                },
                                {
                                    boxLabel: 'Post-Sales',
                                    name: 'complaintCategory',
                                    margins: '0 0 0 5',
                                    inputValue: 'Post-Sales',
                                    handler: function(ctl, val){
                                        if(val) {
                                            CrmApp.view.ComplaintRequestForm.loadComplaintReasons(7);
                                        }
                                    }
                                }
                            ]
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
                            text: 'Complaint Type',
                            margins: '2 10 0 0',
                            width: 140
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'complaintTypeDropDown',
                            id: 'complaintTypeDropDown',
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
                            xtype: 'label',
                            text: 'Product',
                            margins: '2 10 0 0',
                            width: 140
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'complaintProduct',
                            id: 'complaintProduct',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            listeners: {
                                select: function(combo){
                                    CrmApp.view.ComplaintRequestForm.loadProductVariants(combo.value);
                                }
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
                            xtype: 'label',
                            text: 'Variant Issued',
                            margins: '2 10 0 0',
                            width: 140
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'variantIssuedDropDown',
                            id: 'variantIssuedDropDown',
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
                            xtype: 'label',
                            text: 'Required Product/Variant',
                            margins: '2 10 0 0',
                            width: 140
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'requiredVariantDropDown',
                            id: 'requiredVariantDropDown',
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
                            xtype: 'label',
                            text: 'Notes',
                            margins: '2 10 0 0',
                            width: 140
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            allowBlank: false,
                            minLength: 10,
                            name: 'callBackNotes',
                            id: 'callBackNotes',
                            rows: 5
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
                            xtype: 'component',
                            flex : 1
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'saveComplaintRequest',
                            text: 'Save',
                            formBind: true,
                            iconCls: 'savebutton',
                            handler: function(){
                                CrmApp.view.ComplaintRequestForm.saveComplaintRequest();
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeComplaint',
                            text: 'Close',
                            iconCls: 'endCall',
                            margins: '0 0 0 10',
                            handler: function () {
                                this.up('.window').close();
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            id: 'reminderFieldSet',
            hidden: true,
            collapsible: false,
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
                            xtype: 'textfield',
                            width: 120,
                            name: 'complaintId',
                            id: 'complaintId',
                            emptyText:'Enter Complaint no.',
                            margins: '5 0 0 0',
                            enableKeyEvents: true,
                            listeners : {
                                keyup : function(textfield, e, options) {
                                    if (Ext.getCmp('complaintId').getValue().length == 13) {

                                        CrmApp.view.ComplaintRequestForm.loadComplaintById(Ext.getCmp('complaintId').getValue());

                                    }
                                }
                            }
                        },


                        {
                            xtype: 'button',
                            text: 'Order Detail',
                            tooltip: 'Select complaint and view order detail',
                            margins: '5 0 0 5',
                            width: 80,
                            handler: function () {
                                var gridSelection = Ext.getCmp('ComplaintReminderDetailGridPanel').getSelectionModel().getSelection()[0];
                                if(gridSelection == undefined){
                                    Ext.Msg.alert("Complaint","Please select complain in grid");
                                    return;
                                }
                                var orderref = gridSelection.get('ORDERREF');
                                //Ext.Msg.alert("Message", "Show complete order of " + orderref);
                                var orderHistory = Ext.widget('window', {
                                    id: 'orderHistoryWindow',
                                    height : 200,
                                    width  : 760,
                                    title: 'Order History',
                                    layout: 'fit',
                                    modal: true,
                                    items  : [
                                        {
                                            xtype: 'orderHistoryDetailGrid',
                                            height: 190,
                                            id: 'orderHistoryDetailGrid2'
                                        }
                                    ]
                                });
                                orderHistory.show();
                                CrmApp.view.ComplaintRequestForm.loadOrderHistory(orderref);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Close Complaint',
                            margins: '5 0 0 5',
                            id:'closecomp',
                            tooltip: 'Select complaint and close it',
                            handler: function () {

                                var gridSelection = Ext.getCmp('ComplaintReminderDetailGridPanel').getSelectionModel().getSelection()[0];
                                var orderref = gridSelection.get('ORDERREF');

                                if(gridSelection == undefined){
                                    Ext.Msg.alert("Complaint","Please select complain in grid");
                                    return;
                                }

                                var status = gridSelection.get('STATUS');
                                if(status.toUpperCase() != "CLOSED"){

                                    Ext.MessageBox.show({
                                        title: 'Close Complaint',
                                        msg: 'Please enter reason:',
                                        width:300,
                                        buttons: Ext.MessageBox.OKCANCEL,
                                        multiline: true,
                                        fn: function(btn, text){
                                            if(btn == "ok"){

                                                var complaintref = Ext.getCmp('ComplaintReminderDetailGridPanel').getSelectionModel().getSelection()[0].get('COMPLAINTREF');
                                                var REMARK = text;
                                                var formJson = {};
                                                formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
                                                formJson['DISPO']= new Array();
                                                formJson['DISPO'][0]= {};
                                                formJson['DISPO'][0]['DISPID'] = 3;
                                                formJson['DISPO'][0]['DISPDESC'] = "Complaint";
                                                formJson['DISPDESC'] = "Complaint";
                                                formJson['DISPID'] = 3;

                                                formJson['DISPO'][0]['ORDERREF'] = orderref;
                                                var formJsonString = JSON.stringify(formJson);

                                                Ext.Ajax.request({
                                                    url: '/crm/api/complaint/',
                                                    params: {
                                                        REMARKS: REMARK,
                                                        STATUS : "Closed",
                                                        COMPLAINTREF : complaintref,
                                                        "calldetails" : formJsonString
                                                    },
                                                    method: "PUT",
                                                    success: function(response, opts){
                                                        Ext.Msg.alert("Complaint", "Complaint closed");
                                                        //Ext.getCmp('ComplaintReminderDetailGridPanel').getStore().reload();
                                                        CrmApp.controller.CRMController.callCompleted();
                                                        Ext.get('closeComplaint').el.dom.click();
                                                    },
                                                    failure : function (
                                                        response, opts){
                                                        Ext.Msg.alert("Error", "Server encounered error");
                                                    }
                                                });

                                            }

                                        }

                                    });

                                }else {

                                    Ext.Msg.alert("Message", "Complaint is closed, Please open new");
                                }


                            }

                        },
                        {
                            xtype: 'button',
                            text: 'Add Reminder',
                            id:'addremind',
                            tooltip: 'Select complaint and add reminder',
                            margins: '5 0 0 5',
                            handler: function () {

                                var gridSelection = Ext.getCmp('ComplaintReminderDetailGridPanel').getSelectionModel().getSelection()[0];
                                var orderref = gridSelection.get('ORDERREF');

                                if(gridSelection == undefined){
                                    Ext.Msg.alert("Complaint","Please select complain in grid");
                                    return;
                                }

                                var status = gridSelection.get('STATUS');
                                if (status.toUpperCase() != "CLOSED") {

                                    Ext.MessageBox.show({
                                        title: 'Add Reminder',
                                        msg: 'Please enter reminder:',
                                        width: 300,
                                        buttons: Ext.MessageBox.OKCANCEL,
                                        multiline: true,
                                        fn: function (btn, text) {
                                            if (btn == "ok") {

                                                var complaintref = Ext.getCmp('ComplaintReminderDetailGridPanel').getSelectionModel().getSelection()[0].get('COMPLAINTREF');
                                                var REMARK = text;
                                                var formJson = {};
                                                formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
                                                formJson['DISPO']= new Array();
                                                formJson['DISPO'][0]= {};
                                                formJson['DISPO'][0]['DISPID'] = 3;
                                                formJson['DISPO'][0]['DISPDESC'] = "Complaint";
                                                formJson['DISPID'] = 3;
                                                formJson['DISPDESC'] = "Complaint";
                                                formJson['DISPO'][0]['ORDERREF'] = orderref;
                                                var formJsonString = JSON.stringify(formJson);

                                                Ext.Ajax.request({
                                                    url: '/crm/api/complaint/',
                                                    params: {
                                                        REMARKS: REMARK,
                                                        COMPLAINTREF: complaintref,
                                                        "calldetails" : formJsonString
                                                    },
                                                    method: "PUT",
                                                    success: function (response, opts) {
                                                        Ext.Msg.alert("Complaint", "Reminder updated");
                                                        //Ext.getCmp('ComplaintReminderDetailGridPanel').getStore().reload();
                                                        CrmApp.controller.CRMController.callCompleted();
                                                        Ext.get('closeComplaint').el.dom.click();

                                                    },
                                                    failure: function (response, opts) {
                                                        Ext.Msg.alert("Error", "Server encounered error");
                                                    }
                                                });

                                            }

                                        }

                                    });
                                } else{ Ext.Msg.alert("Message", "Complaint is closed, Can not add reminder to closed complain");}
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
                            xtype: 'label',
                            text: 'Complaint Details:',
                            margins: '7 10 0 0',
                            flex: 1
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
                            xtype: 'complaintReminderDetailGrid'
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
                            text: 'Communication Details With Customer:',
                            margins: '7 10 0 0',
                            flex: 1
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
                            xtype: 'communicationReminderDetailGrid'
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
                            xtype: 'component',
                            flex : 1
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeRequest',
                            text: 'Close',
                            iconCls: 'endCall',
                            margins: '0 0 0 10',
                            handler: function () {
                                Ext.getCmp('CommunicationReminderDetailGridPanel').store.removeAll();
                                this.up('.window').close();
                            }
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        saveComplaintRequest: function(){
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            formJson['CONTREF'] = Ext.getCmp('contRefId').value;

            formJson['ASSIGNEDTO'] = userObj.USERNAME;
            var complaintCombo = Ext.getCmp('orderRefCombo');
            formJson['ORDERREF'] = complaintCombo.getRawValue();
            formJson['ORDERS'] = complaintCombo.value;
            //formJson['SHOWID'] = complaintCombo.findRecordByValue(complaintCombo.value).data.showId;
            //formJson['SHOWDESC'] = complaintCombo.findRecordByValue(complaintCombo.value).data.showDesc;

            formJson['CATEGORY'] = Ext.getCmp('complaintTypeCategory').getValue().complaintCategory;
            var reasonCombo = Ext.getCmp('complaintTypeDropDown');
            formJson['HDRID'] = reasonCombo.findRecordByValue(reasonCombo.value).data.hdrId;
            formJson['TYPE'] = reasonCombo.value;
            formJson['STATUS'] = 'Open';
            formJson['CALLSTATUS'] = "O";
            formJson['PHONENO'] = Ext.getCmp('primaryNumber').value;
            formJson['CUSTOMERNAME'] = Ext.getCmp('customerName').value;

            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 3;
            formJson['DISPO'][0]['DISPDESC'] = "Complaint";
            formJson['DISPO'][0]['ORDERREF'] = complaintCombo.getRawValue();
            formJson['DISPID'] = 3;
            formJson['DISPDESC'] = "Complaint";

            formJson['TEAMID'] = userObj.TEAMID;
            formJson['TEAMDESC'] = userObj.TEAMDESC;
            formJson['USERID'] = userObj.USERID;
            formJson['SUBTEAMID'] = userObj.SUBTEAMID;
            formJson['SUBTEAMDESC'] = userObj.SUBTEAMDESC;


            var productCombo = Ext.getCmp('complaintProduct');
            formJson['DISPO'][0]['PRODDESC'] = productCombo.rawValue;
            formJson['DISPO'][0]['PRODID'] = productCombo.value;
            formJson['PRODDESC'] = productCombo.rawValue;
            formJson['PRODID'] = productCombo.value;

            var variantCombo = Ext.getCmp('variantIssuedDropDown');
            if(variantCombo.rawValue != ''){
                formJson['DISPO'][0]['VARIANT'] = variantCombo.rawValue;
                formJson['DISPO'][0]['VARIANTID'] = variantCombo.value;

                formJson['VARIANTID'] = variantCombo.value;
                formJson['VARIANT'] = variantCombo.rawValue;
            }
            var reqVariantCombo = Ext.getCmp('requiredVariantDropDown');
            if(reqVariantCombo.rawValue != ''){
                formJson['DISPO'][0]['REQVARIANT'] = reqVariantCombo.rawValue;
                formJson['DISPO'][0]['REQVARIANTID'] = reqVariantCombo.value;

                formJson['REQVARIANTID'] = reqVariantCombo.value;
                formJson['REQVARIANT'] = reqVariantCombo.rawValue;
            }
            formJson['REMARKS'] = (Ext.getCmp('callBackNotes').value == undefined) ? "" : Ext.getCmp('callBackNotes').value;
            var formJsonString = JSON.stringify(formJson);
            console.log(formJsonString);

            Ext.Ajax.request({
                url: '/crm/api/complaint',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'POST',
                success: function(response, opts){
                    Ext.Msg.alert("Complaint logged.", "Your complaint id is "+ Ext.decode(response.responseText).complaintid);
                    iosocket.emit('CALLDISP', '3');
                    Ext.getCmp('saveComplaintRequest').up('.window').close();
                    CrmApp.controller.CRMController.callCompleted();

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });

        },
        loadOrderForComplaint: function(){
            Ext.Ajax.request({
                url: '/crm/api/getOrderSumByCust/'+Ext.getCmp('contRefId').value,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var dataOrderRef = new Array();
                    for (var i = 0; i < responseObj.length; i++) {
                        dataOrderRef[i] = new Array();
                        dataOrderRef[i]['name'] = responseObj[i].ORDERREF;
                        dataOrderRef[i]['value'] = responseObj[i]._id;
                        dataOrderRef[i]['status'] = responseObj[i].ORDERSTATUS;
                        var prodIds = new Array();
                        for(var j=0; j<responseObj[i].ORDERLINES.length; j++){
                            prodIds[j] = responseObj[i].ORDERLINES[j].PRODID;
                        }
                        if(i==0){
                            CrmApp.view.ComplaintRequestForm.loadProductByOrderLines(prodIds);
                            if(responseObj[i].ORDERSTATUS == 'P'){
                                Ext.getCmp('complaintTypeCategory').items.items[0].setValue(true);
                                Ext.getCmp('complaintTypeCategory').items.items[1].setValue(false);
                                Ext.getCmp('complaintTypeCategory').items.items[1].disable();
                            }
                            else{
                                Ext.getCmp('complaintTypeCategory').items.items[0].setValue(false);
                                Ext.getCmp('complaintTypeCategory').items.items[0].disable();
                                Ext.getCmp('complaintTypeCategory').items.items[1].setValue(true);
                            }
                        }
                        dataOrderRef[i]['prodIds'] = prodIds.toString();
                    }
                    var OrderRefStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'prodIds', 'status'],
                        data: dataOrderRef
                    });
                    Ext.getCmp('orderRefCombo').clearValue();
                    Ext.getCmp('orderRefCombo').bindStore(OrderRefStore);
                    Ext.getCmp('orderRefCombo').setValue(responseObj[0]._id);
                    var dataOrderRef = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadComplaintReasons: function(type){

            Ext.Ajax.request({
                url: '/crm/api/getComplaintReasons/' + type,
                success: function(response, opts){
                    var reasonsObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<reasonsObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = reasonsObj[i].LINEDESC;
                        dataReasons[i]['value'] = reasonsObj[i].LINEDESC;
                        dataReasons[i]['hdrId'] = reasonsObj[i].HDRID;
                    }
                    var reasonStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'hdrId'],
                        data: dataReasons
                    });
                    Ext.getCmp('complaintTypeDropDown').clearValue();
                    Ext.getCmp('complaintTypeDropDown').bindStore(reasonStore);
                    Ext.getCmp('complaintTypeDropDown').setValue(reasonsObj[0].LINEDESC);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadProductByOrderLines: function(prodIdArr){
            var dataProduct = new Array();
            for (var i = 0; i < allProductResults.length; i++){
                if(prodIdArr.indexOf(allProductResults[i].PRODID) >= 0){
                    var tmpdataProduct = new Array();
                    tmpdataProduct['name'] = allProductResults[i].PRODDESC;
                    tmpdataProduct['value'] = allProductResults[i].PRODID;
                    tmpdataProduct['saleValue'] = allProductResults[i].SALEVALUE;
                    tmpdataProduct['freeCost'] = allProductResults[i].FREECOST;
                    tmpdataProduct['isAmc'] = allProductResults[i].ISAMC;
                    tmpdataProduct['amcValue'] = allProductResults[i].AMCVALUE;
                    dataProduct.push(tmpdataProduct);
                }
            }
            var productStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value', 'saleValue', 'freeCost', 'isAmc', 'amcValue'],
                data: dataProduct
            });
            Ext.getCmp('complaintProduct').clearValue();
            Ext.getCmp('complaintProduct').bindStore(productStore);
            Ext.getCmp('complaintProduct').setValue(prodIdArr[0]);
            CrmApp.view.ComplaintRequestForm.loadProductVariants(prodIdArr[0]);
            var dataProduct = null;
        },
        loadProductVariants: function(productId){
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
                    });//
                    Ext.getCmp('variantIssuedDropDown').clearValue();
                    Ext.getCmp('variantIssuedDropDown').bindStore(optionStore);
                    if(responseObj.length != 0){
                        Ext.getCmp('variantIssuedDropDown').setValue(responseObj[0].sizeid);
                    }
                    Ext.getCmp('requiredVariantDropDown').clearValue();
                    Ext.getCmp('requiredVariantDropDown').bindStore(optionStore);
                    if(responseObj.length != 0){
                        Ext.getCmp('requiredVariantDropDown').setValue(responseObj[0].sizeid);
                    }
                    var dataOption = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },

        loadComplaintsByCustomer : function(){

            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.ComplaintReminderDetail',
                proxy: {
                    type: 'ajax',
                    url: '/crm/api/getComplaintByCustomer/' + Ext.getCmp('contRefId').value,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('ComplaintReminderDetailGridPanel').bindStore(store);

        },
        loadComplaintById : function(complaintId){

            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.ComplaintReminderDetail',
                proxy: {
                    type: 'ajax',
                    url: '/crm/api/complaint/' + complaintId,
                    method : "GET",
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('ComplaintReminderDetailGridPanel').bindStore(store);

        },
        disableForm : function(){

        },
        loadOrderHistory: function(orderRef) {
            Ext.Ajax.request({
                url: '/crm/api/orders/'+orderRef,
                contentType: 'application/json; charset=utf-8',
                success: function (response, opts) {
                    var fullDataOrderHistory = Ext.decode(response.responseText);
                    var dataOrderHistory = new Array();
                    //for (var i = 0; i < fullDataOrderHistory.length; i++) {
                        dataOrderHistory[0] = new Array();
                        dataOrderHistory[0]['ORDERREF'] = fullDataOrderHistory['ORDERREF'];
                        dataOrderHistory[0]['ORDERSTATUS'] = fullDataOrderHistory['ORDERSTATUS'];
                        dataOrderHistory[0]['TOTALDUE'] = fullDataOrderHistory['TOTALDUE'];
                        dataOrderHistory[0]['CONTNAME'] = fullDataOrderHistory['CONTNAME'];
                        dataOrderHistory[0]['DELVSTATE'] = fullDataOrderHistory['DELVSTATE'];
                        dataOrderHistory[0]['DELVCITY'] = fullDataOrderHistory['DELVCITY'];
                        dataOrderHistory[0]['ORDERDATE'] = fullDataOrderHistory['ORDERDATE'];
                        var tmpDesc = '';
                        for (var j = 0; j < fullDataOrderHistory.ORDERLINES.length; j++) {
                            tmpDesc += fullDataOrderHistory['ORDERLINES'][j]['PRODDESC'] + ' with AMC ' + fullDataOrderHistory['ORDERLINES'][j]['AMCVALUE'] + ' and sale price ' + fullDataOrderHistory['ORDERLINES'][j]['SALEPRICE'] + '<br\>';
                        }
                        dataOrderHistory[0]['ORDERDESC'] = tmpDesc;
                    //}
                    var orderHistoryStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['ORDERREF', 'ORDERSTATUS', 'TOTALDUE', 'CONTNAME', 'DELVSTATE', 'DELVCITY', 'ORDERDATE', 'ORDERDESC'],
                        data: dataOrderHistory
                    });
                    Ext.getCmp('orderHistoryDetailGrid2').bindStore(orderHistoryStore);
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});
