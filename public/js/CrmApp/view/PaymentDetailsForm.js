Ext.define('CrmApp.view.PaymentDetailsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.paymentDetailsForm',
    border: false,
    layout: 'column',
    labelAlign: 'top',
    height: 240,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 1
    },
    bodyPadding: 5,
    listeners: {
        afterrender: function(){
            CrmApp.view.PaymentDetailsForm.loadAllBanks();
            CrmApp.view.PaymentEntry.loadPayModes();
            Ext.getCmp('editPaymentId').setValue('');
        }
    },
    items: [
        {
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Payment Mode',
                            margins: '5 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'paymentMode',
                            id: 'paymentMode',
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
                            },
                            listeners: {
                            change: function (cb, nv, ov) {
                                if (nv){
                                    var paymentCombo = Ext.getCmp('paymentMode');
                                    var sel = paymentCombo.findRecordByValue(paymentCombo.value).data.PAYMODEID;
                                    if(sel== 1 || sel == 2){
                                        Ext.getCmp('paymentBank').disable();
                                        Ext.getCmp('cardType').setValue({rbCardType:'Cash'})
                                        Ext.getCmp('cardType').disable();
                                        Ext.getCmp('nameOnCard').disable();
                                        Ext.getCmp('authCode').disable();
                                    }
                                    else{
                                        Ext.getCmp('paymentBank').enable();
                                        Ext.getCmp('cardType').enable();
                                        Ext.getCmp('nameOnCard').enable();
                                        Ext.getCmp('authCode').enable();
                                    }
                                }
                            }
                          }
                        },
                        {
                            xtype: 'hidden',
                            width : 50,
                            id: 'editPaymentId'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Amount',
                            margins: '5 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            width : 220,
                            id: 'paymentAmount',
                            minValue: 0,
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Bank',
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
                            name: 'paymentBank',
                            id: 'paymentBank',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
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
                            xtype: 'label',
                            text: 'Card Type',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'radiogroup',
                            id:'cardType',
                            columns: 3,
                            vertical: true,
                            items: [
                                {boxLabel: 'Visa', name: 'rbCardType', inputValue: 'Visa', checked: true, width: 100},
                                {boxLabel: 'Master', name: 'rbCardType', inputValue: 'Master', width: 100},
                                {boxLabel: 'Amex', name: 'rbCardType', inputValue: 'Amex', width: 100}
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Name on Card',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            id: 'nameOnCard'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Auth. Code',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            id: 'authCode'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Notes',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            height: 60,
                            name: 'paymentNotes',
                            id: 'paymentNotes'
                        },
                        {
                            xtype: 'button',
                            id: 'paymentDetailSave',
                            text: 'Save',
                            width: 70,
                            iconCls: 'savebutton',
                            margins: '40 0 0 5',
                            formBind: true,
                            handler: function () {
                                CrmApp.view.PaymentDetailsForm.savePaymentLine();
                            }
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        loadAllBanks: function(){
            Ext.Ajax.request({
                url: '/crm/api/banks',
                success: function(response, opts){
                    var banksResponse = Ext.decode(response.responseText);
                    var dataBanks = new Array();
                    for (var i = 0; i < banksResponse.length; i++) {
                        dataBanks[i] = new Array();
                        dataBanks[i]['name'] = banksResponse[i].BANKDESC;
                        dataBanks[i]['value'] = banksResponse[i].BANKID;
                    }
                    var bankStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataBanks
                    });
                    Ext.getCmp('paymentBank').clearValue();
                    Ext.getCmp('paymentBank').bindStore(bankStore);
                    Ext.getCmp('paymentBank').setValue(banksResponse[0].BANKID);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadPayModes: function(){
            var payModes;
            var payModeOptions;
            var dataPayMode = new Array();
            Ext.Ajax.request({url: '/crm/api/getPaymodes', callback: myCallback, success: handleResponsePaymodes});
            Ext.Ajax.request({url: '/crm/api/getPayOptions', callback: myCallback, success: handleResponsePaymodeOption});
            function myCallback(response, opts) {
                if (++myCallback.counter < 2) {
                    return;
                }
                for (var i = 0; i < payModeOptions.length; i++) {
                    if (payModeOptions[i].PARENTID == -1) {
                        dataPayMode[i] = new Array();
                        dataPayMode[i]['PAYMODEID'] = -1;
                        dataPayMode[i]['name'] = 'Others';
                        dataPayMode[i]['MODEID'] = payModeOptions[i].MODEID;
                        dataPayMode[i]['value'] = payModeOptions[i].MODEDESC;
                    }
                    else {
                        for (var j = 0; j < payModes.length; j++) {
                            if (payModeOptions[i].PARENTID == payModes[j].PAYMODEID) {
                                dataPayMode[i] = new Array();
                                dataPayMode[i]['PAYMODEID'] = payModes[j].PAYMODEID;
                                dataPayMode[i]['name'] = payModes[j].PAYMODEDESC;
                                dataPayMode[i]['MODEID'] = payModeOptions[i].MODEID;
                                dataPayMode[i]['value'] = payModeOptions[i].MODEDESC;
                            }
                        }
                    }
                }
                var payModeStore = Ext.create('Ext.data.Store', {
                    autoDestroy: true,
                    fields: ['PAYMODEID', 'name', 'MODEID', 'value'],
                    data: dataPayMode
                });
                Ext.getCmp('paymentMode').clearValue();
                Ext.getCmp('paymentMode').bindStore(payModeStore);
                Ext.getCmp('paymentMode').setValue(payModeOptions[0].MODEDESC);
            }
            myCallback.counter = 0;
            function handleResponsePaymodes(response, opts){
                payModes = Ext.decode(response.responseText);
            }
            function handleResponsePaymodeOption(response, opts){
                payModeOptions = Ext.decode(response.responseText);
            }
        },
        savePaymentLine: function(){
            var isNewItem = true;
            for (var i = 0; i < Ext.getCmp('myPaymentDetailPanel').store.data.items.length; i++) {
                if (Ext.getCmp('myPaymentDetailPanel').store.data.items[i].data.PAYMENTMODE == Ext.getCmp('paymentMode').findRecordByValue(Ext.getCmp('paymentMode').value).data.MODEID) {
                    isNewItem = false;
                }
            }
            if (isNewItem) {
                CrmApp.view.PaymentDetailsForm.saveNewPaymentLine();
            }
            else {
                CrmApp.view.PaymentDetailsForm.updatePaymentLine();
            }
            Ext.getCmp('editPaymentId').setValue('');
            var paymentAmount = parseFloat(Ext.getCmp('paymentAmount').value);
            var remainedAmount = parseFloat(Ext.getCmp('netDue').value) - parseFloat(Ext.getCmp('totalPayable').value);
            Ext.getCmp('paymentAmount').setValue(remainedAmount);
        },
        saveNewPaymentLine: function(){
            var paymentAmount = parseFloat(Ext.getCmp('paymentAmount').value);
            var remainedAmount = parseFloat(Ext.getCmp('netDue').value) - parseFloat(Ext.getCmp('totalPayable').value);
            if(paymentAmount <= remainedAmount){
                var currentDue = parseFloat(Ext.getCmp('totalDue').value);
                currentDue = currentDue-paymentAmount;
                Ext.getCmp('totalDue').setValue(currentDue);

                var rec = {};
                var paymentCombo = Ext.getCmp('paymentMode');
                rec['PAYMENTMODEID'] = paymentCombo.findRecordByValue(paymentCombo.value).data.PAYMODEID;
                rec['PAYMENTMODE'] = paymentCombo.findRecordByValue(paymentCombo.value).data.MODEID;
                rec['PAYMENTMODEDESC'] = paymentCombo.findRecordByValue(paymentCombo.value).data.value;
                rec['PAYMENTMODEIDDESC'] = paymentCombo.findRecordByValue(paymentCombo.value).data.name;
                rec['PAYMENTAMOUNT'] = paymentAmount;
                rec['PAYMENTBANKID'] = Ext.getCmp('paymentBank').value;
                rec['PAYMENTBANKNAME'] = Ext.getCmp('paymentBank').rawValue;
                rec['CARDTYPE'] = Ext.getCmp('cardType').getValue().rbCardType;
                rec['NAMEONCARD'] = Ext.getCmp('nameOnCard').value;
                rec['AUTHCODE'] = Ext.getCmp('authCode').value;
                rec['PAYMENTREMARKS'] = Ext.getCmp('paymentNotes').value;
                rec['ISNEW'] = true;
                rec['USERDESC'] = userObj.USERNAME;
                rec['USERID'] = userObj.USERID;
                Ext.getCmp('myPaymentDetailPanel').store.add(rec);
                var grossPayment = 0;
                for(var i=0; i<Ext.getCmp('myPaymentDetailPanel').store.data.items.length; i++){
                    grossPayment += Ext.getCmp('myPaymentDetailPanel').store.data.items[i].data.PAYMENTAMOUNT;
                }
                Ext.getCmp('grossPayment').setValue(grossPayment);
                Ext.getCmp('totalPayable').setValue(grossPayment);
            }
            else{
                alert('Payment amount is higher than balance due (='+remainedAmount+').');
            }
        },
        updatePaymentLine: function(){
            var rowIndex = Ext.getCmp('editPaymentId').value;
            if(rowIndex != ''){
                var paymentAmount = parseFloat(Ext.getCmp('paymentAmount').value);
                var selection = Ext.getCmp('myPaymentDetailPanel').store.getAt(rowIndex);
                var selectedPayData = selection.data;
                var remainedAmount = parseFloat(Ext.getCmp('netDue').value) - parseFloat(Ext.getCmp('totalPayable').value) + parseFloat(selectedPayData.PAYMENTAMOUNT);
                if(paymentAmount <= remainedAmount){
                    var paymentCombo = Ext.getCmp('paymentMode');
                    selectedPayData.PAYMENTMODEID = paymentCombo.findRecordByValue(paymentCombo.value).data.PAYMODEID;
                    selectedPayData.PAYMENTMODE = paymentCombo.findRecordByValue(paymentCombo.value).data.MODEID;
                    selectedPayData.PAYMENTMODEDESC = paymentCombo.findRecordByValue(paymentCombo.value).data.value;
                    selectedPayData.PAYMENTMODEIDDESC = paymentCombo.findRecordByValue(paymentCombo.value).data.name;

                    var currentDue = parseFloat(Ext.getCmp('totalDue').value);
                    currentDue = currentDue+parseFloat(selectedPayData.PAYMENTAMOUNT);
                    currentDue = currentDue-paymentAmount;
                    Ext.getCmp('totalDue').setValue(currentDue);

                    selectedPayData.PAYMENTAMOUNT = paymentAmount;
                    selectedPayData.PAYMENTBANKID = Ext.getCmp('paymentBank').value;
                    selectedPayData.PAYMENTBANKNAME = Ext.getCmp('paymentBank').rawValue;
                    selectedPayData.CARDTYPE = Ext.getCmp('cardType').getValue().rbCardType;
                    selectedPayData.NAMEONCARD = Ext.getCmp('nameOnCard').value;
                    selectedPayData.AUTHCODE = Ext.getCmp('authCode').value;
                    selectedPayData.PAYMENTREMARKS = Ext.getCmp('paymentNotes').value;
                    Ext.getCmp('myPaymentDetailPanel').getView().refresh();
                    var grossPayment = 0;
                    for(var i=0; i<Ext.getCmp('myPaymentDetailPanel').store.data.items.length; i++){
                        grossPayment += Ext.getCmp('myPaymentDetailPanel').store.data.items[i].data.PAYMENTAMOUNT;
                    }
                    Ext.getCmp('grossPayment').setValue(grossPayment);
                    Ext.getCmp('totalPayable').setValue(grossPayment);
                }
                else{
                    alert('Payment amount should not be higher than '+remainedAmount+'.');
                }
            }
            else{
                alert('select a pay mode and click edit.');
            }
            Ext.getCmp('editPaymentId').setValue('');
        }
    }
});