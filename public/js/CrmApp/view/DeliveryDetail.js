Ext.define('CrmApp.view.DeliveryDetail' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.deliveryDetail',	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.DeliveryDetail.loadDeliveryDetails();
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
							text: 'Delivery Date/Time',
							margins: '2 10 0 0',
							width: 110
						},
                        {
                            xtype: 'datefield',
                            minValue: new Date(),
                            format: 'd/m/Y',
                            allowBlank: false,
                            id: 'deliveryDate',
                            margins: '0 0 0 0',
                            listeners: {
                                change: function (t, n, o) {
                                    CrmApp.view.DeliveryDetail.toogleNextBtn();
                                }
                            }
                        },
                        {
                            xtype: 'timefield',
                            format:'H:i',
                            allowBlank: false,
                            editable: true,
                            increment: 15,
                            minValue: '07:00',
                            maxValue: '20:00',
                            id: 'deliveryTime',
                            margins: '0 0 0 0',
                            listeners: {
                                change: function (t, n, o) {


                                        CrmApp.view.DeliveryDetail.toogleNextBtn();


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
					border: true,
					items : [
						{
							xtype: 'label',
							text: 'Delivery Address',
							margins: '2 10 0 0',
							width: 110
						},
						{
							xtype: 'radiogroup',
							id:'delAddress',
							columns: 2,			
							vertical: true,
							items: [
								{
                                    boxLabel: 'Use Contact Address',
                                    name: 'rbDelivery',
                                    inputValue: '1',
                                    checked: true,
                                    width: 190,
                                    handler: function(ctl, val) {
                                        if(val){
                                            //load contact address
                                            Ext.getCmp('deliveryAddrLine1').disable();
                                            Ext.getCmp('deliveryAddrLine2').disable();
                                            Ext.getCmp('deliveryAddrLine3').disable();
                                            Ext.getCmp('deliveryCity').disable();
                                            Ext.getCmp('deliveryState').disable();
                                            Ext.getCmp('deliveryCountry').disable();
                                            Ext.getCmp('deliveryPinCode').disable();
                                        }
                                    }
                                },
								{
                                    boxLabel: 'Other Delivery Address',
                                    name: 'rbDelivery',
                                    inputValue: '2',
                                    width: 190,
                                    handler: function(ctl, val) {
                                        if(val){
                                            Ext.getCmp('deliveryAddrLine1').enable();
                                            Ext.getCmp('deliveryAddrLine2').enable();
                                            Ext.getCmp('deliveryAddrLine3').enable();
                                            Ext.getCmp('deliveryCity').enable();
                                            Ext.getCmp('deliveryState').enable();
                                            Ext.getCmp('deliveryCountry').enable();
                                            Ext.getCmp('deliveryPinCode').enable();
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
							text: 'Delivery Address',
							margins: '2 10 0 0',
							width: 110
						},
						{
                            xtype: 'textfield',
                            width : 220,
                            disabled: true,
                            name: 'deliveryAddrLine1',
                            id: 'deliveryAddrLine1'
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
                            text: '',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            disabled: true,
                            name: 'deliveryAddrLine2',
                            id: 'deliveryAddrLine2',
                            value: 'FULL ADDRESS'
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
                            text: '',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryAddrLine3',
                            id: 'deliveryAddrLine3',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
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
                            text: 'City',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width : 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryCity',
                            id: 'deliveryCity',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
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
                            text: 'State',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width : 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryState',
                            id: 'deliveryState',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
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
                            text: 'Country',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width : 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: 'India',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'deliveryCountry',
                            id: 'deliveryCountry',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
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
                            text: 'Pin Code',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            disabled: true,
                            name: 'deliveryPinCode',
                            id: 'deliveryPinCode',
                            value: 600082,
                            enableKeyEvents: true,
                            listeners:{
                                keyup:function(newValue){
                                    if(newValue.rawValue.length == 6){
                                        CrmApp.view.DeliveryDetail.updatePinCode();
                                    }
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
					border: true,
					items : [
						{
							xtype: 'label',
							text: 'Invoice Address',
							margins: '2 10 0 0',
							width: 110
						},
						{
							xtype: 'radiogroup',
							id:'invoiceAddress',
							columns: 2,			
							vertical: true,
							items: [
								{boxLabel: 'Use Contact Address', name: 'rbInvoice', inputValue: '1', checked: true, width: 190},
								{boxLabel: 'Use Delivery Address', name: 'rbInvoice', inputValue: '2', width: 190}
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
							text: 'Notes',
							margins: '2 10 0 0',
							width: 110
						},
						{
							xtype: 'textareafield',
							width: 220,
							height: 60,
							name: 'deliveryNotes',
							id: 'deliveryNotes'
						},
						{
							xtype: 'button',
							id: 'addDetailSave',
							text: 'Save',
							width: 70,
							iconCls: 'savebutton',
							margins: '40 0 0 5',
                            handler: function () {
                                //CrmApp.view.DeliveryDetail.createOrderJsonPanel2();
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
                            name: 'customAuth'
                        },
                        {
                            xtype: 'label',
                            text: 'Custom Authorization',
                            margins: '3 0 0 0',
                            width: 120
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
                            text: 'Prefer Date/Time',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'datefield',
                            name: 'preferDate',
                            id:'preferDate',
                            format: 'd/m/Y',
                            minValue:new Date(),
                            listeners: {
                                select: function (t, n, o) {

                                    if(Ext.getCmp('preferDate').value != null && Ext.getCmp('preferTime').value != null) {
                                        var validity = CrmApp.view.DeliveryDetail.checkDateValidity(Ext.getCmp('preferDate').value, Ext.Date.format(Ext.getCmp('preferTime').value, 'H:i'));
                                        if (validity) {
                                            orderJson['AUTHPREFERDATE'] = Ext.Date.format(n, 'd-m-Y');
                                        } else {
                                            Ext.Msg.alert("Warning !", "Please enter valid Date/Time");

                                            Ext.getCmp('preferDate').setValue(null);
                                        }
                                    }


                                }
                            }
                        },
                        {
                            xtype: 'timefield',
                            name: 'preferTime',
                            id:'preferTime',
                            increment: 15,
                            format:'H:i',
                            minValue: '07:00',
                            maxValue: '20:00',
                            listeners: {
                                change: function(f,new_val) {

                                    if(Ext.getCmp('preferDate').value != null && Ext.getCmp('preferTime').value != null) {
                                        var validity = CrmApp.view.DeliveryDetail.checkDateValidity(Ext.getCmp('preferDate').value, Ext.Date.format(Ext.getCmp('preferTime').value, 'H:i'));
                                        if (validity) {
                                            orderJson['AUTHPREFERTIME'] = Ext.Date.format(new_val, 'H:i');
                                        } else {
                                            Ext.Msg.alert("Warning !", "Please enter valid Date/Time");
                                            Ext.getCmp('preferTime').setValue(null);
                                        }
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
        checkDateValidity : function(validDate, validTime){

            /*var tempPrefDate = new Date();
            tempPrefDate.setDate(validDate.getDate());*/
            validDate.setHours(parseInt(validTime.split(":")[0]), parseInt(validTime.split(":")[1]));
            console.log(validDate);
            var now = new Date();
            if(now < validDate){
                return true;
            }else{
                return false;
            }

        },
        createOrderJsonPanel2: function () {
           // var deliveryDate = Ext.ComponentQuery.query('datefield[name=deliveryDate]')[0].value;
            var deliveryDate = Ext.getCmp('deliveryDate').getValue();
            orderJson['DELIVERYDATE'] = Ext.Date.format(deliveryDate, 'd-m-Y');
            orderJson['DELIVERYADDRESS'] = {};
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=rbDelivery]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=rbDelivery]')[i].getValue() == true){
                    //1 or 2 Ext.ComponentQuery.query('radio[name=rbDelivery]')[i].inputValue;
                    if(Ext.ComponentQuery.query('radio[name=rbDelivery]')[i].inputValue == 1){
                        //load delivery address from contact address object
                        orderJson['DELIVERYADDRESS']['ADDLINE1'] = Ext.getCmp('deliveryAddrLine1').value;
                        orderJson['DELIVERYADDRESS']['ADDLINE2'] = Ext.getCmp('deliveryAddrLine2').value;
                        orderJson['DELIVERYADDRESS']['ADDLINE3'] = Ext.getCmp('deliveryAddrLine3').value;
                        orderJson['DELIVERYADDRESS']['CITY'] = Ext.getCmp('deliveryCity').value;
                        orderJson['DELIVERYADDRESS']['PINCODE'] = Ext.getCmp('deliveryPinCode').value;
                        orderJson['DELIVERYADDRESS']['STATE'] = Ext.getCmp('deliveryState').value;
                        orderJson['DELIVERYADDRESS']['COUNTRY'] = Ext.getCmp('deliveryCountry').value;
                    }
                    else{
                        orderJson['DELIVERYADDRESS']['ADDLINE1'] = Ext.getCmp('deliveryAddrLine1').value;
                        orderJson['DELIVERYADDRESS']['ADDLINE2'] = Ext.getCmp('deliveryAddrLine2').value;
                        orderJson['DELIVERYADDRESS']['ADDLINE3'] = Ext.getCmp('deliveryAddrLine3').value;
                        orderJson['DELIVERYADDRESS']['CITY'] = Ext.getCmp('deliveryCity').value;
                        orderJson['DELIVERYADDRESS']['PINCODE'] = Ext.getCmp('deliveryPinCode').value;
                        orderJson['DELIVERYADDRESS']['STATE'] = Ext.getCmp('deliveryState').value;
                        orderJson['DELIVERYADDRESS']['COUNTRY'] = Ext.getCmp('deliveryCountry').value;
                    }
                }
            }
            orderJson['INVOICEADDRESS'] = {};
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=rbInvoice]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=rbInvoice]')[i].getValue() == true){
                    //1 or 2 Ext.ComponentQuery.query('radio[name=rbInvoice]')[i].inputValue;
                    if(Ext.ComponentQuery.query('radio[name=rbInvoice]')[i].inputValue == 1){
                        //load invoice address from contact address object
                        orderJson['INVOICEADDRESS']['ADDLINE1'] = Ext.getCmp('deliveryAddrLine1').value;
                        orderJson['INVOICEADDRESS']['ADDLINE2'] = Ext.getCmp('deliveryAddrLine2').value;
                        orderJson['INVOICEADDRESS']['ADDLINE3'] = Ext.getCmp('deliveryAddrLine3').value;
                        orderJson['INVOICEADDRESS']['CITY'] = Ext.getCmp('deliveryCity').value;
                        orderJson['INVOICEADDRESS']['PINCODE'] = Ext.getCmp('deliveryPinCode').value;
                        orderJson['INVOICEADDRESS']['STATE'] = Ext.getCmp('deliveryState').value;
                        orderJson['INVOICEADDRESS']['COUNTRY'] = Ext.getCmp('deliveryCountry').value;
                    }
                    else{
                        orderJson['INVOICEADDRESS']['ADDLINE1'] = Ext.getCmp('deliveryAddrLine1').value;
                        orderJson['INVOICEADDRESS']['ADDLINE2'] = Ext.getCmp('deliveryAddrLine2').value;
                        orderJson['INVOICEADDRESS']['ADDLINE3'] = Ext.getCmp('deliveryAddrLine3').value;
                        orderJson['INVOICEADDRESS']['CITY'] = Ext.getCmp('deliveryCity').value;
                        orderJson['INVOICEADDRESS']['PINCODE'] = Ext.getCmp('deliveryPinCode').value;
                        orderJson['INVOICEADDRESS']['STATE'] = Ext.getCmp('deliveryState').value;
                        orderJson['INVOICEADDRESS']['COUNTRY'] = Ext.getCmp('deliveryCountry').value;
                    }
                }
            }
            orderJson['DELIVERYREMARKS'] = Ext.getCmp('deliveryNotes').value;
        },
        loadDeliveryDetails: function(){
            Ext.getCmp('deliveryAddrLine1').setValue(Ext.getCmp('address1').value);
            Ext.getCmp('deliveryAddrLine2').setValue(Ext.getCmp('address2').value);
            var dataOffice = new Array();
            dataOffice[0] = new Array();
            dataOffice[0]['name'] = Ext.getCmp('officeCombo').value;
            dataOffice[0]['value'] = Ext.getCmp('officeCombo').value;
            var officeStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value'],
                data: dataOffice
            });
            Ext.getCmp('deliveryAddrLine3').clearValue();
            Ext.getCmp('deliveryAddrLine3').bindStore(officeStore);
            Ext.getCmp('deliveryAddrLine3').setValue(Ext.getCmp('officeCombo').value);
            var dataCity = new Array();
            dataCity[0] = new Array();
            dataCity[0]['name'] = Ext.getCmp('cityCombo').value;
            dataCity[0]['value'] = Ext.getCmp('cityCombo').value;
            dataCity[0]['cityId'] = Ext.getCmp('cityCombo').findRecordByValue(Ext.getCmp('cityCombo').value).data.cityId;
            var cityStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value', 'cityId'],
                data: dataCity
            });
            Ext.getCmp('deliveryCity').clearValue();
            Ext.getCmp('deliveryCity').bindStore(cityStore);
            Ext.getCmp('deliveryCity').setValue(Ext.getCmp('cityCombo').value);
            var dataState = new Array();
            dataState[0] = new Array();
            dataState[0]['name'] = Ext.getCmp('stateCombo').value;
            dataState[0]['value'] = Ext.getCmp('stateCombo').value;
            dataState[0]['stateId'] = Ext.getCmp('stateCombo').findRecordByValue(Ext.getCmp('stateCombo').value).data.stateId;
            var stateStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value', 'stateId'],
                data: dataState
            });
            Ext.getCmp('deliveryState').clearValue();
            Ext.getCmp('deliveryState').bindStore(stateStore);
            Ext.getCmp('deliveryState').setValue(Ext.getCmp('stateCombo').value);
            Ext.getCmp('deliveryPinCode').setValue(Ext.getCmp('pinCode').value);
            var dataCountry = new Array();
            dataCountry[0] = new Array();
            dataCountry[0]['name'] = Ext.getCmp('countryCombo').value;
            dataCountry[0]['value'] = Ext.getCmp('countryCombo').value;
            dataCountry[0]['countryId'] = Ext.getCmp('countryCombo').findRecordByValue(Ext.getCmp('countryCombo').value).data.countryId;
            var stateStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value', 'countryId'],
                data: dataCountry
            });
            Ext.getCmp('deliveryCountry').clearValue();
            Ext.getCmp('deliveryCountry').bindStore(stateStore);
            Ext.getCmp('deliveryCountry').setValue(Ext.getCmp('countryCombo').value);
        },
        updatePinCode: function () {
            var pinCode = Ext.getCmp('deliveryPinCode').getValue();
            Ext.Ajax.request({
                url: '/crm/api/pincode/'+pinCode,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var countryArr = new Array();
                    var stateArr = new Array();
                    var cityArr = new Array();
                    var officeName = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        if(responseObj[i].countryname !== undefined && responseObj[i].countryId !== undefined){
                            var tmpObj = {countryId:responseObj[i].countryId, countryName:responseObj[i].countryname};
                            if(!isObjExistInArray(tmpObj, countryArr)){
                                countryArr.push(tmpObj);
                            }
                        }
                        if(responseObj[i].statename !== undefined && responseObj[i].stateId !== undefined){
                            var tmpObj = {stateId:responseObj[i].stateId, stateName:responseObj[i].statename};
                            if(!isObjExistInArray(tmpObj, stateArr)){
                                stateArr.push(tmpObj);
                            }
                        }
                        if(responseObj[i].Districtname !== undefined && responseObj[i].cityId !== undefined){
                            var tmpObj = {cityId:responseObj[i].cityId, cityName:responseObj[i].Districtname};
                            if(!isObjExistInArray(tmpObj, cityArr)){
                                cityArr.push(tmpObj);
                            }
                        }
                        officeName[i] = responseObj[i].officename;
                    }
                    officeName = Ext.Array.unique(officeName);

                    var dataCountry = new Array();
                    for(var i=0; i<countryArr.length; i++){
                        dataCountry[i] = new Array();
                        dataCountry[i]['name'] = countryArr[i].countryName;
                        dataCountry[i]['value'] = countryArr[i].countryName;
                        dataCountry[i]['countryId'] = countryArr[i].countryId;
                    }
                    var countryStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'countryId'],
                        data: dataCountry
                    });
                    Ext.getCmp('deliveryCountry').clearValue();
                    Ext.getCmp('deliveryCountry').bindStore(countryStore);
                    Ext.getCmp('deliveryCountry').setValue(countryArr[0].countryName);

                    var dataState = new Array();
                    for(var i=0; i<stateArr.length; i++){
                        dataState[i] = new Array();
                        dataState[i]['name'] = stateArr[i].stateName;
                        dataState[i]['value'] = stateArr[i].stateName;
                        dataState[i]['stateId'] = stateArr[i].stateId;
                    }
                    var stateStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'stateId'],
                        data: dataState
                    });
                    Ext.getCmp('deliveryState').clearValue();
                    Ext.getCmp('deliveryState').bindStore(stateStore);
                    Ext.getCmp('deliveryState').setValue(stateArr[0].stateName);

                    var dataCity = new Array();
                    for(var i=0; i<cityArr.length; i++){
                        dataCity[i] = new Array();
                        dataCity[i]['name'] = cityArr[i].cityName;
                        dataCity[i]['value'] = cityArr[i].cityName;
                        dataCity[i]['cityId'] = cityArr[i].cityId;
                    }
                    var cityStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'cityId'],
                        data: dataCity
                    });
                    Ext.getCmp('deliveryCity').clearValue();
                    Ext.getCmp('deliveryCity').bindStore(cityStore);
                    Ext.getCmp('deliveryCity').setValue(cityArr[0].cityName);

                    var dataOffice = new Array();
                    for(var i=0; i<officeName.length; i++){
                        dataOffice[i] = new Array();
                        dataOffice[i]['name'] = officeName[i];
                        dataOffice[i]['value'] = officeName[i];
                    }
                    var officeStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataOffice
                    });
                    Ext.getCmp('deliveryAddrLine3').clearValue();
                    Ext.getCmp('deliveryAddrLine3').bindStore(officeStore);
                    Ext.getCmp('deliveryAddrLine3').setValue(officeName[0]);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        toogleNextBtn: function(){
            if(Ext.getCmp('deliveryDate').value != null && Ext.getCmp('deliveryTime').value != null){
                  var validity = CrmApp.view.DeliveryDetail.checkDateValidity(Ext.getCmp('deliveryDate').value, Ext.Date.format(Ext.getCmp('deliveryTime').value, 'H:i'));
                if(validity){
                    Ext.getCmp('orderNext').enable();
                }else{
                    Ext.getCmp('orderNext').disable();
                }


            }
            else{
                Ext.getCmp('orderNext').disable();
            }
        }
    }
});