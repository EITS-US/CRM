Ext.define('CrmApp.view.PaymentEntry', {
    extend: 'Ext.form.Panel',
    alias : 'widget.paymentEntry',
    layout: {
		type: 'vbox',
		align: 'stretch'
	},
	border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.PaymentEntry.loadAllBanks();
            CrmApp.view.PaymentEntry.loadPayModes();
            CrmApp.view.AuthorizationForm.loadCourierOptions();
            Ext.getCmp('courierCombo').disable();
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
							text: 'Payment Mode',
							margins: '4 10 0 0',
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
                                        Ext.getCmp('courierCombo').disable();
                                        Ext.getCmp('courierCombo').setValue(null);
                                        var paymentCombo = Ext.getCmp('paymentMode');
                                        var sel = paymentCombo.findRecordByValue(paymentCombo.value).data.PAYMODEID;
                                        var type = paymentCombo.findRecordByValue(paymentCombo.value).data.MODEID;
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
                                        if(type == 7)
                                        {
                                            Ext.getCmp('courierCombo').enable();

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
                    name: 'courierComboArea',
                    id: 'courierComboArea',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Courier Service',
                            name: 'courierComboLabel',
                            id: 'courierComboLabel',
                            margins: '5 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            allowBlank: true,
                            editable: true,
                            name: 'courierCombo',
                            id: 'courierCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
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
                            /*                            store: Ext.create('Ext.data.Store', {
                             fields : ['name', 'value'],
                             data   : [
                             ]
                             })*/
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
							text: 'Amount',
							margins: '2 10 0 0',
							width: 100
						},
						{
							xtype: 'numberfield',
                            hideTrigger: true,
							width : 220,
							id: 'paymentAmount',
                            minValue: 1,
                            allowBlank: false
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
							columns: 4,
							vertical: true,
							items: [
								{boxLabel: 'Visa', name: 'rbCardType', inputValue: 'Visa', checked: true, width: 100},
								{boxLabel: 'Master', name: 'rbCardType', inputValue: 'Master', width: 100},
								{boxLabel: 'Amex', name: 'rbCardType', inputValue: 'Amex', width: 100},
                                {boxLabel: 'Cash', name: 'rbCardType', inputValue: 'Cash', width: 1, hidden:true}
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
                                CrmApp.view.PaymentEntry.savePaymentLine();
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
                var count = 0;
                for (var i = 0; i < payModes.length; i++) {


                        for (var j = 0; j < payModeOptions.length; j++) {
                            if (payModeOptions[j].PARENTID == payModes[i].PAYMODEID) {
                                dataPayMode[count] = new Array();
                                dataPayMode[count]['PAYMODEID'] = payModes[i].PAYMODEID;
                                dataPayMode[count]['name'] = payModes[i].PAYMODEDESC;
                                dataPayMode[count]['MODEID'] = payModeOptions[j].MODEID;
                                dataPayMode[count]['value'] = payModeOptions[j].MODEDESC;
                                count++;
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
                for (var i = 0; i < Ext.getCmp('myPaymentGridPanel').store.data.items.length; i++) {
                    if (Ext.getCmp('myPaymentGridPanel').store.data.items[i].data.PAYMENTMODE == Ext.getCmp('paymentMode').findRecordByValue(Ext.getCmp('paymentMode').value).data.MODEID) {
                        isNewItem = false;
                    }
                }
                if (isNewItem) {
                    CrmApp.view.PaymentEntry.saveNewPaymentLine();
                }
                else {
                    CrmApp.view.PaymentEntry.updatePaymentLine();
                }
                Ext.getCmp('editPaymentId').setValue('');
                CrmApp.view.PaymentEntry.toogleNextBtn();
                var paymentAmount = parseFloat(Ext.getCmp('paymentAmount').value);
                var remainedAmount = parseFloat(Ext.getCmp('netDue').value) - parseFloat(Ext.getCmp('totalPayable').value);
                Ext.getCmp('paymentAmount').setValue(remainedAmount);

        },
        saveNewPaymentLine: function(){
            var paymentAmount = parseFloat(Ext.getCmp('paymentAmount').value);
            var remainedAmount = parseFloat(Ext.getCmp('netDue').value) - parseFloat(Ext.getCmp('totalPayable').value);
            if(paymentAmount <= remainedAmount){
                var currentDue = parseFloat(Ext.getCmp('totalDue').value);
                currentDue = currentDue - paymentAmount;
                Ext.getCmp('totalDue').setValue(currentDue);

                var rec = {};
                var paymentCombo = Ext.getCmp('paymentMode');
                rec['PAYMENTMODEID'] = paymentCombo.findRecordByValue(paymentCombo.value).data.PAYMODEID;
                rec['PAYMENTMODE'] = paymentCombo.findRecordByValue(paymentCombo.value).data.MODEID;
                rec['PAYMENTMODEDESC'] = paymentCombo.findRecordByValue(paymentCombo.value).data.value;
                rec['PAYMENTMODEIDDESC'] = paymentCombo.findRecordByValue(paymentCombo.value).data.name;
                rec['PAYMENTAMOUNT'] = paymentAmount;
                rec['PAYMENTBANKID'] = Ext.getCmp('paymentBank').value;
                if(Ext.getCmp('courierCombo').getValue() != null)
                {
                    var courierExec = Ext.getCmp('courierCombo');
                    rec['PAYMENTCOURIEREXECID'] = courierExec.findRecordByValue(courierExec.value).data.value;
                    rec['PAYMENTCOURIEREXECDESC'] = courierExec.findRecordByValue(courierExec.value).data.name;
                }

                rec['PAYMENTBANKNAME'] = Ext.getCmp('paymentBank').rawValue;
                rec['CARDTYPE'] = Ext.getCmp('cardType').getValue().rbCardType;
                rec['NAMEONCARD'] = Ext.getCmp('nameOnCard').value;
                rec['AUTHCODE'] = Ext.getCmp('authCode').value;
                rec['PAYMENTREMARKS'] = Ext.getCmp('paymentNotes').value;
                rec['USERDESC'] = userObj.USERNAME;
                rec['USERID'] = userObj.USERID;
                Ext.getCmp('myPaymentGridPanel').store.add(rec);
                var grossPayment = 0;
                for (var i = 0; i < Ext.getCmp('myPaymentGridPanel').store.data.items.length; i++) {
                    grossPayment += Ext.getCmp('myPaymentGridPanel').store.data.items[i].data.PAYMENTAMOUNT;
                }
                Ext.getCmp('grossPayment').setValue(grossPayment);
                Ext.getCmp('totalPayable').setValue(grossPayment);
            }
            else{
                alert('Payment amount should not be higher than '+remainedAmount+'.');
            }
        },
        updatePaymentLine: function(){
            var rowIndex = Ext.getCmp('editPaymentId').value;
            if(rowIndex != ''){
                var paymentAmount = parseFloat(Ext.getCmp('paymentAmount').value);
                var selection = Ext.getCmp('myPaymentGridPanel').store.getAt(rowIndex);
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
                    Ext.getCmp('myPaymentGridPanel').getView().refresh();
                    var grossPayment = 0;
                    for(var i=0; i<Ext.getCmp('myPaymentGridPanel').store.data.items.length; i++){
                        grossPayment += Ext.getCmp('myPaymentGridPanel').store.data.items[i].data.PAYMENTAMOUNT;
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
        },
        toogleNextBtn: function(){
            if(Ext.getCmp('myPaymentGridPanel').store.data.items.length){
                Ext.getCmp('orderNext').enable();
            }
            else{
                Ext.getCmp('orderNext').disable();
            }
        }
    }
});