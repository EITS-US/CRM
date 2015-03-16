Ext.define('CrmApp.view.CallBackForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.callBackForm',	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	border: false,
    listeners: {
        afterrender: function(){
            CrmApp.controller.CRMController.loadProductDataStore('callbackProduct', 'product', selectedProductId);
            CrmApp.controller.CRMController.loadProductDataStore('callBackFreeGiftDropDown', 'freeGift', 'default');
            CrmApp.view.CallBackForm.loadCallBackReasons();
        }
    },
    items: [
		{
			xtype: 'fieldset',
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
							xtype: 'label',
							text: 'Reasons',
							margins: '7 10 0 0',
							width: 100
						},
						{
							width: 220,
							xtype: 'combo',
							margins: '5 0 0 0',
							mode: 'local',
							triggerAction: 'all',
							forceSelection: true,
							editable: false,
                            allowBlank: false,
							name: 'reasonCallBackDropDown',
							id: 'reasonCallBackDropDown',
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
							text: 'Call Back On',
							margins: '2 10 0 0',
							width: 100
						},
                        {
                            xtype: 'xdatetime',
                            name: 'callBackPreferDate',
                            id: 'callBackPreferDate',
                            timeFormat: 'H:i',
                            timeConfig: {
                                altFormats: 'H:i'
                                ,allowBlank: false
                                ,editable: true
                                ,increment: 15
                                ,minValue: '07:00',
                                maxValue: '20:00'
                            },
                            dateConfig: {
                                minValue:new Date(),
                                format: 'd/m/Y'
                            },
                            allowBlank: false,
                            width: 290
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
							width: 100
						},
						{
							width: 220,
							xtype: 'combo',
							mode: 'local',
							multiSelect: true,
							triggerAction: 'all',
							forceSelection: true,
							//editable: false,
                            typeAhead: true,
                            allowBlank: false,
							name: 'callbackProduct',
							id: 'callbackProduct',
							displayField: 'name',
							valueField: 'value',
							queryMode: 'local',
                            listConfig : {
                                getInnerTpl : function() {
                                    return '<div class="chkCombo"> {name} </div>';
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
							text: 'Price Offered',
							margins: '2 10 0 0',
							width: 100
						},
						{
							xtype: 'textfield',
							width: 220,
                            regex: /^\d{3,6}$/i,
                            maskRe: /\d/i,
                            allowBlank: false,
							name: 'callBackPriceOffer',
							id: 'callBackPriceOffer'
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
							text: 'Free Gift Offered',
							margins: '2 10 0 0',
							width: 100
						},
						{
							width: 220,
							xtype: 'combo',
							mode: 'local',
							triggerAction: 'all',
							forceSelection: true,
							editable: true,
							name: 'callBackFreeGiftDropDown',
							id: 'callBackFreeGiftDropDown',
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
							width: 100
						},
						{
							xtype: 'textareafield',
							flex: 1,
                            allowBlank: false,
                            minLength: 10,
							name: 'callBackNotes',
                            id: 'callBackNotes',
							rows: 3
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
							id: 'saveCallBack',
							text: 'Save',
                            formBind: true,
							iconCls: 'savebutton',
                            handler: function(){
                                var checkTime = Ext.getCmp('callBackPreferDate').getValue();
                               // alert(checkTime);

                                var now = new Date();

                                if(checkTime < now)
                                {
                                    Ext.Msg.alert('Error','Please select a time greater than NOW');
                                }
                                else
                                {
                                    CrmApp.view.CallBackForm.saveCallBack();
                                }

                            }
						},
						{
							xtype: 'button',
							width : 70,
							id: 'closeCallBack',
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
		}
	],
    statics: {
        saveCallBack: function () {
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            var reasonCombo = Ext.getCmp('reasonCallBackDropDown');
            formJson['LINEDESC'] = reasonCombo.value;
            formJson['HDRID'] = reasonCombo.findRecordByValue(reasonCombo.value).data.hdrId;
            formJson['CALLBACKON'] = Ext.getCmp('callBackPreferDate').getValue();
            var productCombo = Ext.getCmp('callbackProduct');

            //var productCombo = Ext.getCmp('bookingProduct');
            //
            // var productCombo = Ext.getCmp('bookingProduct');

            formJson['CALLBACKTYPE'] = "Telebuy Callback";

            formJson['DISPID'] = 1;
            formJson['LOOKID'] = 1;
            formJson['DISPDESC'] = "Call Back";

            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 1;
            formJson['DISPO'][0]['LOOKID'] = 1;
            formJson['DISPO'][0]['DISPDESC'] = "Call Back";
            formJson['DISPO'][0]['PRODUCTS'] = new Array();


            //  var productCombo = Ext.getCmp('notInterestedProduct');

            for(var i=0; i<productCombo.value.length; i++) {
                formJson['DISPO'][0]['PRODUCTS'][i] = {};
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[i]).data.name;
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODID'] = productCombo.value[i];
            }

            formJson['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[0]).data.name;
            formJson['PRODID'] = productCombo.value[0];


            formJson['DISPO'][0]['OFFERPRICE'] = (Ext.getCmp('callBackPriceOffer').value == undefined) ? "" : Ext.getCmp('callBackPriceOffer').value;
            var freeGiftCombo = Ext.getCmp('callBackFreeGiftDropDown');
            formJson['DISPO'][0]['FREEGIFTOFFER'] = (freeGiftCombo.rawValue == "Select Product") ? "" : freeGiftCombo.rawValue;
          //  formJson['PRODDESC'] = freeGiftCombo.rawValue;
            //formJson['PRODID'] = freeGiftCombo.value;
            var selreason = reasonCombo.value;
            formJson['REMARKS'] = selreason + ': ' + ((Ext.getCmp('callBackNotes').value == undefined) ? "" : Ext.getCmp('callBackNotes').value);
            formJson['CALLSTATUS'] = "Open";

            var formJsonString = JSON.stringify(formJson);
            console.log(formJsonString);


            Ext.Ajax.request({
                url: '/crm/api/putCallUpdate',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'PUT',
                success: function(response, opts){
                    iosocket.emit('CALLDISP', '1');
                    Ext.getCmp('saveCallBack').up('.window').close();
                    CrmApp.controller.CRMController.callCompleted();

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


            //Ext.getCmp('saveCallBack').up('.window').close();
            //CrmApp.controller.CRMController.callCompleted();
        },
        loadCallBackReasons: function(){
            Ext.Ajax.request({
                url: '/crm/api/getCallBackReasons',
                success: function(response, opts){
                    var reasonsObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    dataReasons[0] = new Array();
                    dataReasons[0]['name'] = 'N/A';
                    dataReasons[0]['value'] = '-1';
                    dataReasons[0]['hdrId'] = -1;
                    for(var i=1; i<=reasonsObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = reasonsObj[i-1].LINEDESC;
                        dataReasons[i]['value'] = reasonsObj[i-1].LINEDESC;
                        dataReasons[i]['hdrId'] = reasonsObj[i-1].HDRID;
                    }
                    var reasonStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'hdrId'],
                        data: dataReasons
                    });
                    Ext.getCmp('reasonCallBackDropDown').clearValue();
                    Ext.getCmp('reasonCallBackDropDown').bindStore(reasonStore);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});