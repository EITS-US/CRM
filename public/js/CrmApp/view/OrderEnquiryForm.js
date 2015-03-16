
Ext.define('CrmApp.view.OrderEnquiryForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.orderEnquiryForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.OrderEnquiryForm.loadOrderForEnquiry();
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
                    xtype: 'component',
                    flex: 1
                },
                {
                    width: 220,
                    fieldLabel: 'Order Ref. No.',
                    xtype: 'combo',
                    mode: 'local',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: true,
                    name: 'orderRefOrderEnquiry',
                    id: 'orderRefOrderEnquiry',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local',
                    margins: '5 0 0 0'
                },
                {
                    xtype: 'button',
                    text: 'Track Order',
                    margin: '0 0 0 5',
                    handler: function(){
                        CrmApp.view.OrderEnquiryForm.cleanAllStores();
                        Ext.Ajax.request({
                            url: '/crm/api/orders/' +  Ext.getCmp("orderRefOrderEnquiry").getRawValue(),
                            success: function(response, opts){
                                var callResponse = Ext.decode(response.responseText);
                                var OrderLineData = callResponse["ORDERLINES"];
                                var PayLineData = callResponse["PAYMENTLINES"];

                                Ext.getCmp("myGridPanelEnquiry").store.add(OrderLineData);
                                Ext.getCmp("myPaymentGridPanelEnquiry").store.add(PayLineData);

                            },
                            failure: function(response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                            }
                        })

                        CrmApp.view.OrderEnquiryForm.loadOrderEvents(Ext.getCmp("orderRefOrderEnquiry").getRawValue());

                    }
                }
            ]
        },
        {
            xtype: 'container',
            dock: 'left',
            layout: {
                type: 'vbox'
            },
            width: 250,
            id: 'customerDeatailContainer'
        }
    ],
    items: [
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'label',
                    width: 390,
                    text: 'Product Details'
                },
                {
                    xtype: 'label',
                    width: 340,
                    margin: '0 0 0 5',
                    text: 'Payment Details'
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'headerEntry',
                    id: 'myGridPanelEnquiry',
                    width: 390,
                    height: 150,
                    dockedItems: [
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
                                    id: 'totalQuantityEnquiry',
                                    value: 0
                                },
                                ' - ',
                                {
                                    xtype: 'textfield',
                                    width : 50,
                                    editable: false,
                                    id: 'grossPriceEnquiry',
                                    value: 0
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'paymentDetailGrid',
                    id: 'myPaymentGridPanelEnquiry',
                    width: 340,
                    height: 150,
                    margin: '0 0 0 5',
                    dockedItems: [
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
                                    id: 'grossPaymentEnquiry',
                                    value: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'orderEnquiryTabs'
        },
        {
            xtype: 'fieldcontainer',
            items: [
                {
                    xtype: 'label',
                    text: 'Issue History:',
                    margin: '10 0 0 0'
                }
            ]
        },
        {
            xtype: 'issueHistoryGrid',
            height: 150
        },
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            padding: '5 5 5 5',
            items: [
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    labelWidth: 85,
                    width: 330,
                    name: 'orderEnquiryNotes',
                    id: 'orderEnquiryNotes',
                    rows: 4
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Send SMS To',
                    labelWidth: 85,
                    width: 300,
                    name: 'orderEnquirySMS',
                    id: 'orderEnquirySMS',
                    margin: '0 0 0 10',
                    rows: 4
                },
                {
                    xtype: 'fieldcontainer',
                    width: 70,
                    margin: '0 0 0 10',
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'saveOrderEnquiry',
                            text: 'Save',
                            iconCls: 'savebutton',
                            handler: function(){
                                //this.up('.window').close();
                               var orderref =  Ext.getCmp("orderRefOrderEnquiry").getRawValue();
                               var contactnosms =  Ext.getCmp("orderEnquirySMS").value;
                               var remarks =  Ext.getCmp("orderEnquiryNotes").value;

                                remarks = contactnosms + " : " + remarks;

                                var smsparmas = {};
                                smsparmas['DISPO']= new Array();
                                smsparmas['CONTREF'] = Ext.getCmp('contRefId').getValue();
                                smsparmas['DISPO'][0]= {};
                                smsparmas['DISPO'][0]['DISPID'] = 10;
                                smsparmas['DISPO'][0]['DISPDESC'] = "Order Enquiry";
                                smsparmas['CALLSTATUS'] = "C";
                                smsparmas["REMARKS"] = remarks;
                                smsparmas["DISPDESC"] = "Order Enquiry";
                                smsparmas["ORDERREF"] = orderref;
                                smsparmas["DISPID"] = 10;
                                smsparmas['CALLKEY'] = Ext.getCmp('callKeyId').value;

                                var orderEnquiryJsonString = JSON.stringify(smsparmas);

                                Ext.Ajax.request({
                                    url: '/crm/api/sendSMSForOrder',
                                    method : 'POST',
                                    params: {
                                        "orderSmsJson" : orderEnquiryJsonString
                                    },
                                    success: function (response, opts) {
                                        var responseObj = Ext.decode(response.responseText);
                                        CrmApp.view.OrderEnquiryForm.cleanAllStores();
                                        Ext.Msg.alert("SMS Sent", responseObj.message);
                                        Ext.getCmp("saveOrderEnquiry").up('.window').close();
                                        if (iosocket !== '') {
                                            iosocket.emit('CALLDISP', '10');
                                        }
                                       /* CrmApp.controller.CRMController.callCompleted();
                                        setTimeout(function(){ Ext.get('endCallBut').el.dom.click()}, 3000);
                                        setTimeout(function(){ Ext.get('closeCallBtn').el.dom.click()}, 5000);*/

                                    },
                                    failure : function(response, opts){

                                    }

                                })


                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeOrderEnquiry',
                            text: 'Close',
                            iconCls: 'endCall',
                            margin: '5 0 0 0',
                            handler: function () {
                                CrmApp.view.OrderEnquiryForm.cleanAllStores();
                                this.up('.window').close();

                            }
                        }
                    ]
                }
            ]
        }
    ],
    statics:{
        loadOrderForEnquiry: function(){

            if(Ext.getCmp('contRefId').value === "" || Ext.getCmp('contRefId').value === undefined ||  Ext.getCmp('contRefId').value == null)
            {
                Ext.Msg.alert("Order Enquiry", "Save User details");
                return;
            }
            else{
                Ext.Ajax.request({
                    url: '/crm/api/getOrderSumByCust/'+Ext.getCmp('contRefId').value,
                    success: function(response, opts){
                        var responseObj = Ext.decode(response.responseText);
                        if(responseObj.length > 0){
                            var dataOrderRef = new Array();
                            for (var i = 0; i < responseObj.length; i++) {
                                dataOrderRef[i] = new Array();
                                dataOrderRef[i]['name'] = responseObj[i].ORDERREF;
                                dataOrderRef[i]['value'] = responseObj[i]._id;
                                var prodIds = new Array();
                                for(var j=0; j<responseObj[i].ORDERLINES.length; j++){
                                    prodIds[j] = responseObj[i].ORDERLINES[j].PRODID;
                                }
                                dataOrderRef[i]['prodIds'] = prodIds.toString();
                            }
                            var OrderRefStore = Ext.create('Ext.data.Store', {
                                autoDestroy: true,
                                fields: ['name', 'value', 'prodIds'],
                                data: dataOrderRef
                            });
                            Ext.getCmp('orderRefOrderEnquiry').clearValue();
                            Ext.getCmp('orderRefOrderEnquiry').bindStore(OrderRefStore);
                            Ext.getCmp('orderRefOrderEnquiry').setValue(responseObj[0]._id);
                            CrmApp.view.OrderEnquiryForm.trackOrderEnquiry();


                        }
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }

        },
        trackOrderEnquiry: function(orderRefId){
            var tmpHtml = '<table class="customerDeatail" cellpadding="0" cellspacing="0">';
           /* for(var i=0; i<17; i++){
                tmpHtml += '<tr><td>Date</td><td>3/15/2013 9:28:26 AM</td></tr>';
            }*/

            tmpHtml += '<tr><td>Name</td><td>' + Ext.getCmp("customerName").value+ '</td></tr>';
            tmpHtml += '<tr><td>Contact No</td><td>' + Ext.getCmp("primaryNumber").value.toString() +'</td></tr>';


            tmpHtml += '</table>';
            Ext.DomHelper.append(Ext.getDom('customerDeatailContainer-targetEl'), {
                tag: 'div',
                html: tmpHtml
            }, true);


        },
        loadOrderEvents : function(orderRefId){

            Ext.Ajax.request({
                url: '/crm/api/getOrderHistoryById/' + orderRefId,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    Ext.getCmp("orderRemarksDetailGrid").store.add(responseObj);

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            })

        },
        cleanAllStores : function(){
            Ext.getCmp('orderRemarksDetailGrid').store.removeAll();
            Ext.getCmp('myPaymentGridPanelEnquiry').store.removeAll();
            Ext.getCmp('myGridPanelEnquiry').store.removeAll();
        }
    }
});