Ext.define('CrmApp.view.callPopupForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.callPopupForm',
	border: false,
    listeners: {
        afterrender: function(){
          console.log("Testing");
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
					html: 'OUTGOING CALL ',
					flex: 1,
					cls: 'popupHeader',
                    id: 'popupHeader'
				},
                {
                    xtype: 'hidden',
                    id: 'isCallEnded',
                    value: false
                },
                {
                    xtype: 'hidden',
                    id: 'totalOrderAmount',
                    value: '0'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    id:'endCallBut',
                    text: 'End Call',
                    width: 70,
                    handler: function () {
                        iosocket.emit('ENDCALL', { hello: 'Call Ended' });
                        CrmApp.view.callPopupForm.saveCustomerCallData();
                        Ext.getCmp('isCallEnded').setValue(true);
                        this.disable();
                    }
                },
				{
					xtype: 'button',
					iconCls: 'endCall',
					scale: 'large',
					text: 'Close Call',
                    id: 'closeCallBtn',
                    disabled: true,
                    margin: '0 0 0 5',
                    width: 100,
					handler: function () {

						if(Ext.getCmp('isCallEnded').getValue() == 'true'&& customerName.length > 0 ){
                            CrmApp.view.callPopupForm.saveCustomerData('callClosed');
                            iosocket.emit('DISCON', Ext.getCmp('callKeyId').value);
                            this.up('.window').close();
                        }
                        else{
                            Ext.MessageBox.show({
                                title: 'End call first!',
                                msg: 'Please update customer name and click update. Please End the call first, then you will be able to close this call.',
                                closable:false,
                                buttons: Ext.MessageBox.OK
                            });
                        }
					}
				},
                {
                    xtype: 'button',
                    iconCls: 'endCall',
                    scale: 'large',
                    text: 'Close Book Order',
                    id: 'closeBookOrderBtn',
                    hidden: true,
                    margin: '0 0 0 5',
                    width: 150,
                    handler: function () {
                        if (iosocket !== '') {
                            iosocket.emit('ENDCALL', { hello: 'Call Ended' });
                        }
                        CrmApp.view.callPopupForm.saveCustomerCallData();
                        Ext.getCmp('isCallEnded').setValue(true);
                        if(Ext.getCmp('isCallEnded').getValue() == 'true'&& customerName.length > 0 ) {
                            CrmApp.view.callPopupForm.saveCustomerData('orderBooking');
                            if (iosocket !== '') {
                                iosocket.emit('DISCON', Ext.getCmp('callKeyId').value);
                            }
                            this.up('.window').close();
                        }
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
            autoScroll: true,
            width: 250,
            id: 'callHistoryContainer'
        },
		{
			xtype: 'container',
			dock: 'right',
			layout: {
				type: 'vbox',
				align: 'middle'
			},
			padding: '0 10 5 10',
			items: [
                {
                    xtype: 'button',
                    width: 150,
                    id:'setCustDND',
                    scale: 'large',
                    text: 'SET CUSTOMER AS DND'
                },
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: "notInterestedBtn",
					text: 'Not Interested',
                    margin: '5 0 0 0',
					handler: function () {
							//iosocket.emit('CALLDISP', '15');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: 'advanceBookingBtn',
					text: 'Advance Booking',
					margin: '5 0 0 0',
					handler: function () {
							//iosocket.emit('CALLDISP', '16');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
					id: 'callBackBtn',
					text: 'Call Back',
					margin: '5 0 0 0',
					handler: function () {
							//iosocket.emit('CALLDISP', '1');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: "complaintRequestBtn",
					text: ' Complaint',
					margin: '5 0 0 0',
					handler: function () {
						//iosocket.emit('CALLDISP', '3');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: "generalEnquiryBtn",
					text: 'General Enquiry',
					margin: '5 0 0 0',
					handler: function () {
							//iosocket.emit('CALLDISP', '2');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
					id:'takeOrder',
					text: 'Order',
					margin: '5 0 0 0',
					handler: function () {
							//iosocket.emit('CALLDISP', '5');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: "otherLanguageBtn",
					text: 'Other Language',
					margin: '5 0 0 0',
					handler: function () {
							//iosocket.emit('CALLDISP', '6');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: "nonSaleCallBtn",
					text: 'Non-Sale Call',
					margin: '5 0 0 0',
					handler: function () {
						//iosocket.emit('CALLDISP', '14');
					}
				},
				{
					xtype: 'button',
					width: 150,
					cls: "leftAlignBtn",
                    id: "orderEnquiryBtn",
					text: 'Order Enquiry',
					margin: '5 0 0 0',
					handler: function () {
						//iosocket.emit('CALLDISP', '10');
					}
				},
                {
                    //xtype: 'component',
                    xtype: 'button',
                    //html: '"Order Count"',
                    text: '"Call History"',
                    width: 150,
                    margin: '70 0 0 0',
                    cls: 'orderCount',
                    handler: function(){
                        var callHistoryWindow = new Ext.Window({
                            id: 'callHistoryWindow',
                            height : 515,
                            width  : 760,
                            title: 'Call History',
                            layout: 'fit',
                            modal: true,
                            closable:true,
                            items  : [
                                {
                                    xtype: 'callHistory',
                                    height: 89,
                                    id: 'myCallHistoryPanel',
                                    dockedItems: [{
                                        xtype: 'toolbar',
                                        dock: 'top',
                                        items: [{
                                            xtype: 'button',
                                            text: 'Load Call History',
                                            width:150,
                                            handler: function(){
                                                CrmApp.view.CallHistory.loadCallHistory('myCallHistoryPanel', 'contRefId');
                                            }
                                        },{xtype: 'tbseparator'}, {
                                            xtype: 'numberfield',
                                            emptyText : 'Enter Contact No.',
                                            width:200,
                                            minLength:10,
                                            maxLength:10,
                                            id:'historyPhoneNo',
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false
                                        }, {
                                            xtype: 'button',
                                            text: 'Search',
                                            width:100,
                                            handler: function(){
                                                CrmApp.view.CallHistory.searchContactNumber('myCallHistoryPanel', 'historyPhoneNo');
                                            }
                                        }]
                                    }]
                                }
                            ]
                        });
                        callHistoryWindow.show();
                    }
                },
                {
                    //xtype: 'component',
                    xtype: 'button',
                    //html: '"Order Count"',
                    text: '"Order Count"',
                    width: 150,
                    margin: '20 0 0 0',
                    cls: 'orderCount',
                    handler: function(){
                        var contRef = Ext.getCmp('contRefId').value;
                        CrmApp.view.callPopupForm.loadTotalOrderOfCustomer(contRef);
                    }
                },
                {
                    xtype: 'component',
                    width: 150,
                    id: 'OrderCounter'
                }
			]
		},
		{
			xtype: 'container',
			dock: 'bottom',
			hidden: true,
			id: 'callHistoryNotesContainer',
			layout: {
				type: 'hbox',
				align: 'middle'
			},
			padding: '0 0 5 5',
			items: [
				{
					xtype: 'component',
					html: 'Notes',
					width: 50
				},
				{
					xtype: 'textareafield',
					flex: 1,
					name: 'callHistoryNotes',
					rows: 1
				}
			]
		}
	],
	items: [
		{
			xtype: 'form',

            border: false,
			layout: 'column',
			labelAlign: 'top',
			width: 720,
			defaults: {
				xtype: 'container',
				layout: 'form',
				columnWidth: 0.5
			},
			bodyPadding: 5,
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
									text: 'Name',
									margins: '5 10 0 0',
									width: 70
								},
								{
									width: 65,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									forceSelection: true,
									editable: false,
									name: 'nameTitle',
                                    id: 'nameTitle',
                                    allowBlank: false,
									displayField: 'name',
									valueField: 'value',
									queryMode: 'local',
									store: Ext.create('Ext.data.Store', {
										fields : ['name', 'value'],
										data : [
											{name : 'Mr.',   value: 'Mr.'},
											{name : 'Mrs.',  value: 'Mrs.'},
											{name : 'Ms.', value: 'Ms.'}
										]
									})
								},
								{
									xtype: 'textfield',
									flex: 1,
									name : 'name',
                                    fieldStyle: 'text-transform:uppercase',
                                    id: 'customerName',
                                    allowBlank: false,
									margins: '1 0 0 2'
								},
                                {
                                    xtype: 'hiddenfield',
                                    name : 'contRefId',
                                    id: 'contRefId'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name : 'callKeyId',
                                    id: 'callKeyId'
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
									text: 'Product',
									margins: '5 10 0 0',
									width: 70
								},
								{
									flex: 1,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									forceSelection: true,
									editable: true,
									name: 'newCallProductCombo',
                                    id: 'newCallProductCombo',
									displayField: 'name',
									valueField: 'value',
									queryMode: 'local',
                                    listeners: {
                                        select: function(combo){
                                            selectedProductId = combo.value;
                                        }
                                    }
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
									text: 'Address',
									margins: '5 10 0 0',
									width: 70
								},
								{
									xtype: 'fieldcontainer',
									items : [
										{
											xtype: 'textfield',
											width : 272,
                                            fieldStyle: 'text-transform:uppercase',
											name : 'address1',
                                            id: 'address1'
										},
										{
											xtype: 'textfield',
                                            fieldStyle: 'text-transform:uppercase',
											width : 272,
											name : 'address2',
                                            id: 'address2'
										},
										{
                                            width: 272,
                                            fieldStyle: 'text-transform:uppercase',
                                            xtype: 'combo',
                                            mode: 'local',
                                            triggerAction: 'all',
                                            forceSelection: false,
                                            editable: true,
                                            name: 'officeCombo',
                                            id: 'officeCombo',
                                            displayField: 'name',
                                            valueField: 'value',
                                            queryMode: 'local'
										}
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
									text: 'Primary No',
									margins: '5 10 0 0',
									width: 70
								},
								{
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    flex: 1,
                                    name : 'primaryNumber',
                                    id : 'primaryNumber'
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
									text: 'E-Mail',
									margins: '5 10 0 0',
									width: 70
								},
								{
									xtype: 'textfield',
									flex: 1,
									name : 'contactEmail',
                                    id : 'contactEmail',
									vtype: 'email'
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
									text: 'Countrry',
									margins: '5 10 0 0',
									width: 70
								},
								{
									flex: 1,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									editable: true,
									name: 'country',
									id: 'countryCombo',
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
							items : [
								{
									xtype: 'label',
									text: 'City',
									margins: '5 10 0 0',
									width: 70
								},
								{
									flex: 1,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									editable: true,
									name: 'city',
									id: 'cityCombo',
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
							items : [
								{
									xtype: 'label',
									text: 'State',
									margins: '5 10 0 0',
									width: 70
								},
								{
									flex: 1,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									//forceSelection: true,
									editable: true,
									name: 'state',
									id: 'stateCombo',
									displayField: 'name',
									valueField: 'value',
									queryMode: 'local'
								}
							]
						}
					]
				},
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
									text: 'Gender',
									margins: '5 10 0 10',
									width: 70
								},
								{
									flex: 1,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									forceSelection: true,
									editable: false,
									name: 'contactGender',
                                    id: 'contactGender',
									displayField: 'name',
									valueField: 'value',
									queryMode: 'local',
									store: Ext.create('Ext.data.Store', {
										fields : ['name', 'value'],
										data   : [
											{name : 'Male',   value: 'Male'},
											{name : 'Female',  value: 'Female'}
										]
									})
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
									text: 'Phone No',
									margins: '5 10 0 10',
									width: 70
								},
								{
									xtype: 'numberfield',
									hideTrigger: true,
									flex: 1,
									name : 'callPhoneNo',
                                    id: 'callPhoneNo'

								},
								{
									xtype: 'button',
									width: 30,
									cls: 'addbutton',
									margins: '1 0 0 2',
                                    handler : function(){
                                        var cellPhoneNo = Ext.getCmp("callPhoneNo").rawValue;
                                        if(cellPhoneNo.length == 10){
                                            var contactJSON = {};
                                            contactJSON["CONTACTNO"] = cellPhoneNo;
                                            contactJSON["CONTREF"] = Ext.getCmp('contRefId').value;
                                            var contactJSONString = JSON.stringify(contactJSON);
                                            var contactExists = Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo.toString());
                                            if(!contactExists){
                                                Ext.Ajax.request({
                                                    url: '/crm/api/duplicateContact',
                                                    params: {
                                                        "contactJSON": contactJSONString
                                                    },
                                                    success: function (response, opts) {
                                                        var serverMsg = Ext.decode(response.responseText);
                                                        if(serverMsg.message === "true"){
                                                            Ext.getCmp('primaryContact').getStore().add({name:"ACTIVE", value:cellPhoneNo.toString()});
                                                            var tmpHtml = '<tr><td>'+cellPhoneNo.toString()+'</td><td class="ACTIVE">ACTIVE</td></tr>';
                                                            Ext.select('table#contactContainerTbl tbody').elements[0].innerHTML += tmpHtml;
                                                            Ext.getCmp("callPhoneNo").setValue("");
                                                        }else{
                                                            Ext.Msg.alert("Phone Details","Another contact exists for this phone no.");
                                                        }
                                                    },
                                                    failure : function (response, opts){
                                                        Ext.Msg.alert("Phone Details",response);
                                                    }
                                                });
                                            }else{
                                                Ext.Msg.alert("Phone Details","Contact already exists");
                                            }
                                        }else{
                                            Ext.Msg.alert("Phone Details","Enter Proper Contact no.");
                                        }

                                    }
								},
								{
									xtype: 'button',
									width: 30,
                                    id: 'searchContact',
									cls: 'searchbutton',
									margins: '1 0 0 2'
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
									width: 342,
									xtype: 'fieldset',
									collapsible: false,
									margin: '0 0 0 10',
									items: [
										{
											xtype: 'button',
											width: 30,
											cls: 'phone1button',
											margin: '1 0 1 0'
										},
										{
											xtype: 'button',
											width: 30,
											cls: 'closebutton',
											margin: '1 0 1 5'
										},
										{
											xtype: 'button',
											width: 30,
											cls: 'crossbutton',
											margin: '1 0 1 5'
										},
										{
											xtype: 'button',
											width: 30,
											cls: 'phone2button',
											margin: '1 0 1 5'
										},
										{
											xtype: 'button',
											width: 30,
											cls: 'greenbutton',
											margin: '1 0 1 5'
										},
										{
											xtype: 'button',
											width: 30,
											cls: 'greybutton',
											margin: '1 0 1 5'
										}
									]
								}
							]
						},
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                hideLabel: true
                            },
                            items: [
                                {
                                    width: 342,
                                    margin: '0 0 0 10',
                                    xtype: 'combo',
                                    mode: 'local',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    editable: false,
                                    name: 'title',
                                    displayField: 'value',
                                    valueField: 'value',
                                    queryMode: 'local',
                                    id: 'primaryContact'
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
									width: 84,
									margin: '2 0 0 10',
									xtype: 'button',
									text: 'Primary',
                                    handler : function(){
                                        var cellPhoneNo = Ext.getCmp("primaryContact").value;
                                        if(Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                            var existingPrimary = Ext.getCmp("primaryContact").findRecord("name", "PRIMARY").data.value;
                                            for (var i = 0; i < Ext.select('table#contactContainerTbl tbody tr').elements.length; i++) {
                                                if (Ext.select('table#contactContainerTbl tbody tr').elements[i].children[0].innerHTML == cellPhoneNo.toString()) {
                                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].innerHTML = "PRIMARY";
                                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].className = "PRIMARY";
                                                }
                                                if (Ext.select('table#contactContainerTbl tbody tr').elements[i].children[0].innerHTML == existingPrimary.toString()) {
                                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].innerHTML = "ACTIVE";
                                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].className = "ACTIVE";
                                                }
                                            }
                                            Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo).data.name = "PRIMARY";
                                            Ext.getCmp("primaryContact").findRecordByValue(existingPrimary).data.name = "ACTIVE";
                                            Ext.getCmp("primaryNumber").setValue(cellPhoneNo);
                                        }
                                    }
								},
								{
									width: 84,
									margin: '2 0 0 2',
                                    xtype: 'button',
                                    text: 'Active',
                                    handler : function(){
                                        var cellPhoneNo = Ext.getCmp("primaryContact").value;
                                        if(Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                            for (var i = 0; i < Ext.select('table#contactContainerTbl tbody tr').elements.length; i++) {
                                                if (Ext.select('table#contactContainerTbl tbody tr').elements[i].children[0].innerHTML == cellPhoneNo.toString()) {
                                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].innerHTML = "ACTIVE";
                                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].className = "ACTIVE";
                                                }
                                            }
                                            Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo).data.name = "ACTIVE";
                                        }
                                    }
								},
								{
									width: 84,
									margin: '2 0 0 2',
                                    xtype: 'button',
                                    text: 'Inactive',
                                    handler : function(){
                                        var cellPhoneNo = Ext.getCmp("primaryContact").value;
                                        if(Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                            if (!passwordWin) {
                                                var managerPassform = Ext.widget('form', {
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    border: false,
                                                    bodyPadding: 10,
                                                    fieldDefaults: {
                                                        labelAlign: 'top',
                                                        labelWidth: 100,
                                                        labelStyle: 'font-weight:bold'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            inputType: 'password',
                                                            fieldLabel: 'Password',
                                                            id: 'managerPasswordInactive',
                                                            afterLabelTextTpl: required,
                                                            allowBlank: false
                                                        }
                                                    ],
                                                    buttons: [
                                                        {
                                                            text: 'Cancel',
                                                            handler: function () {
                                                                this.up('form').getForm().reset();
                                                                this.up('.window').close();


                                                            }
                                                        },
                                                        {
                                                            text: 'Proceed',
                                                            id: 'inactiveProceedBtn',
                                                            handler: function () {
                                                                CrmApp.view.callPopupForm.checkManagerCredentials(Ext.getCmp('managerPasswordInactive').value, "INACTIVE", 'inactiveProceedBtn');
                                                            }
                                                        }
                                                    ]
                                                });
                                                var passwordWin = Ext.widget('window', {
                                                    title: 'Fill Password',
                                                    closable: false,
                                                    width: 300,
                                                    height: 130,
                                                    layout: 'fit',
                                                    resizable: true,
                                                    modal: true,
                                                    items: managerPassform
                                                });
                                            }
                                            passwordWin.show();
                                        }
                                    }
								},
                                {
                                    width: 84,
                                    margin: '2 0 0 2',
                                    xtype: 'button',
                                    text: 'Invalid',
                                    handler : function(){
                                        var cellPhoneNo = Ext.getCmp("primaryContact").value;
                                        if(Ext.getCmp("primaryContact").findRecordByValue(cellPhoneNo).data.name != 'PRIMARY'){
                                            if (!passwordWin) {
                                                var managerPassform = Ext.widget('form', {
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    border: false,
                                                    bodyPadding: 10,
                                                    fieldDefaults: {
                                                        labelAlign: 'top',
                                                        labelWidth: 100,
                                                        labelStyle: 'font-weight:bold'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            inputType: 'password',
                                                            fieldLabel: 'Password',
                                                            id: 'managerPasswordInvalid',
                                                            afterLabelTextTpl: required,
                                                            allowBlank: false
                                                        }
                                                    ],
                                                    buttons: [
                                                        {
                                                            text: 'Cancel',
                                                            handler: function () {
                                                                this.up('form').getForm().reset();
                                                                this.up('.window').close();
                                                            }
                                                        },
                                                        {
                                                            text: 'Proceed',
                                                            id: 'invalidProceedBtn',
                                                            handler: function () {
                                                                CrmApp.view.callPopupForm.checkManagerCredentials(Ext.getCmp('managerPasswordInvalid').value, "INVALID", 'invalidProceedBtn');
                                                            }
                                                        }
                                                    ]
                                                });
                                                var passwordWin = Ext.widget('window', {
                                                    title: 'Fill Password',
                                                    closable: false,
                                                    width: 300,
                                                    height: 130,
                                                    layout: 'fit',
                                                    resizable: true,
                                                    modal: true,
                                                    items: managerPassform
                                                });
                                            }
                                            passwordWin.show();
                                        }
                                    }
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
                                    xtype: 'component',
                                    width: 342,
                                    height: 85,
                                    margin: '0 0 0 10',
                                    id: 'contactContainer'
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
									text: 'Pin Code',
									margins: '5 10 0 10',
									width: 70
								},
								{
									xtype: 'numberfield',
									hideTrigger: true,
									flex: 1,
                                    id: 'pinCode',
									name : 'pinCode',
                                    enableKeyEvents: true,
                                    listeners:{
                                        keyup:function(newValue){
                                            if(newValue.rawValue.length == 6){
                                                CrmApp.view.callPopupForm.updatePinCode();
                                            }
                                        }
                                    }
								},
								{
									xtype: 'button',
									width: 70,
									iconCls: 'savebutton',
									text: 'Update',
									margins: '1 0 0 5',

                                    handler: function(){
                                        if(Ext.getCmp('customerName').value === "" || Ext.getCmp('customerName').value === null || Ext.getCmp('customerName').value === undefined)
                                        {
                                            Ext.MessageBox.show({
                                                title: 'Contact Details',
                                                msg: 'Please enter customer name',
                                                width:300,
                                                buttons: Ext.MessageBox.OK

                                            });

                                        }
                                        else
                                        {
                                            CrmApp.view.callPopupForm.saveCustomerData('updateCustomer');
                                        }



                                        /*if(Ext.getCmp('pinCode').rawValue == "0" || Ext.getCmp('pinCode').value == null)
                                        {
                                            Ext.MessageBox.show({
                                                title: 'Cusotmer Data',
                                                msg: 'Please update Pincode.',
                                                closable:false,
                                                buttons: Ext.MessageBox.OK
                                            });

                                        }
                                        else
                                        {*/

                                       // }

                                    }
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
									text: 'Language',
									margins: '5 10 0 10',
									width: 70
								},
								{
									flex: 1,
									xtype: 'combo',
									mode: 'local',
									triggerAction: 'all',
									forceSelection: true,
									editable: false,
									name: 'languageCombo',
                                    id: 'languageCombo',
									displayField: 'name',
									valueField: 'value',
									queryMode: 'local'
								}
							]
						}
					]
				}
			]
		},
		{
			xtype: 'form',
            border: false,
			layout: 'column',
			labelAlign: 'top',
			width: 720,
			defaults: {
				xtype: 'container',
				layout: 'form',
				columnWidth: 1
			},
			bodyPadding: 0,
			items: [
				{
					xtype : 'fieldcontainer',
                    layout: 'hbox',
					defaults: {
						hideLabel: true
					},
					items : [
						{
							xtype: 'button',
							flex: 1,
                            text: 'Show Order History',
                            listeners: {
                                click : function(){
                                    var contRef = Ext.getCmp('contRefId').value;
                                    CrmApp.view.callPopupForm.loadOrderHistory(contRef, 'orderHistoryDetailGrid');
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
                    xtype: 'orderHistoryDetailGrid',
                    height: 200,
                    id: 'orderHistoryDetailGrid'
                }
            ]
        }
	],
    statics: {
        saveCustomerData: function(stateId){
            var formJson = {};
            formJson['CONTNAME'] = Ext.getCmp('customerName').value;
            customerName = Ext.getCmp('customerName').value;
            formJson['TITLE'] = Ext.getCmp('nameTitle').value;
            formJson['GENDER'] = Ext.getCmp('contactGender').value;
            formJson['Email'] = new Array();
            if(Ext.getCmp('contactEmail').value != null) {
                formJson['Email'].push(Ext.getCmp('contactEmail').value);
            }
            if(stateId === 'callClosed'){
                formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            }
            formJson['ContactDetails'] = {};
            formJson['ContactDetails']['Address'] = new Array();
            formJson['ContactDetails']['Address'][0] = {};
            formJson['ContactDetails']['Address'][0]['ADD1'] = Ext.getCmp('address1').value;
            formJson['ContactDetails']['Address'][0]['ADD2'] = Ext.getCmp('address2').value;
            formJson['ContactDetails']['Address'][0]['PINCODE'] = Ext.getCmp('pinCode').rawValue;
            formJson['ContactDetails']['Address'][0]['COUNTRYDESC'] = Ext.getCmp('countryCombo').value;

            if(Ext.getCmp('pinCode').rawValue != "0"){
                formJson['STATEID'] = Ext.getCmp('stateCombo').findRecordByValue(Ext.getCmp('stateCombo').value).data.stateId;
                formJson['COUNTRYID'] = Ext.getCmp('countryCombo').findRecordByValue(Ext.getCmp('countryCombo').value).data.countryId;
                formJson['CITYID'] = Ext.getCmp('cityCombo').findRecordByValue(Ext.getCmp('cityCombo').value).data.cityId;
                formJson['ContactDetails']['Address'][0]['ADD3'] = Ext.getCmp('officeCombo').value;
                formJson['ContactDetails']['Address'][0]['STATEDESC'] = Ext.getCmp('stateCombo').value;
                formJson['ContactDetails']['Address'][0]['CITYDESC'] = Ext.getCmp('cityCombo').value;

            }else if(Ext.getCmp('pinCode').rawValue == "0"){
                formJson['STATEID'] = -1;
                formJson['COUNTRYID'] = -1;
                formJson['CITYID'] = -1;
                formJson['ContactDetails']['Address'][0]['ADD3'] = Ext.getCmp('officeCombo').rawValue;
                formJson['ContactDetails']['Address'][0]['STATEDESC'] = Ext.getCmp('stateCombo').rawValue;
                formJson['ContactDetails']['Address'][0]['CITYDESC'] = Ext.getCmp('cityCombo').rawValue;
            }

            formJson['CONTLANGDESC'] = Ext.getCmp('languageCombo').rawValue;
            formJson['CONTLANGID'] = Ext.getCmp('languageCombo').value;
            formJson['PRIMARYCONTACT'] = Ext.getCmp('primaryNumber').value;
            formJson['ACTIVECONTACT'] = new Array();
            formJson['INVALIDCONTACT'] = new Array();
            formJson['INACTIVE'] = new Array();
            for(var i=0; i<Ext.getCmp('primaryContact').store.data.items.length; i++){
                if(Ext.getCmp('primaryContact').store.data.items[i].data.name === 'ACTIVE'){
                    formJson['ACTIVECONTACT'].push(Ext.getCmp('primaryContact').store.data.items[i].data.value);
                }
                if((Ext.getCmp('primaryContact').store.data.items[i].data.name === 'INVALID')){
                    formJson['INVALIDCONTACT'].push(Ext.getCmp('primaryContact').store.data.items[i].data.value);
                }
                if((Ext.getCmp('primaryContact').store.data.items[i].data.name === 'INACTIVE')){
                    formJson['INACTIVE'].push(Ext.getCmp('primaryContact').store.data.items[i].data.value);
                }
            }

            formJson['BALANCEDUE'] = 0;
            formJson['CONTSTAT'] = 'N';
            formJson['CONTTYPE'] = 'C';
            formJson['CREDITCARD'] = 'Did Not Ask';
            formJson['DNDSTATUS'] = 'N';
            formJson['MEDIADESC'] = 'NA';
            formJson['MEDIAID'] = -1;
            formJson['SYNCHED_WITH_BYD'] = 1;

            if(Ext.getCmp('contRefId').value != ""){
                formJson['CONTREF'] = Ext.getCmp('contRefId').value;
                var formJsonString = JSON.stringify(formJson);
                console.log(formJsonString);
                Ext.Ajax.request({
                    url: '/crm/api/putContactUpdate',
                    params: {
                        "customerJSON": formJsonString
                    },
                    method: 'PUT',
                    success: function (response, opts) {


                        Ext.Msg.alert("Contact", "Contact details updated");
                        Ext.Function.defer(Ext.MessageBox.hide, 1500, Ext.MessageBox);

                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
            else {
                var formJsonString = JSON.stringify(formJson);
                console.log(formJsonString);
                Ext.Ajax.request({
                    url: '/crm/api/createContact',
                    params: {
                        "customerJSON": formJsonString
                    },
                    method: 'POST',
                    success: function (response, opts) {
                        var responseObj = Ext.decode(response.responseText);
                        customerName = responseObj.CONTNAME;
                        Ext.getCmp('contRefId').setValue(responseObj.CONTREF);

                        Ext.MessageBox.show({
                            title: 'Contact Detials',
                            msg: 'Details Updated for -' + customerName,
                            width:250,
                            buttons: Ext.MessageBox.OK

                        });
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        },
        updatePinCode: function () {
            var pinCode = Ext.getCmp('pinCode').getValue();
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
                    Ext.getCmp('countryCombo').clearValue();
                    Ext.getCmp('countryCombo').bindStore(countryStore);
                    Ext.getCmp('countryCombo').setValue(countryArr[0].countryName);

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
                    Ext.getCmp('stateCombo').clearValue();
                    Ext.getCmp('stateCombo').bindStore(stateStore);
                    Ext.getCmp('stateCombo').setValue(stateArr[0].stateName);

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
                    Ext.getCmp('cityCombo').clearValue();
                    Ext.getCmp('cityCombo').bindStore(cityStore);
                    Ext.getCmp('cityCombo').setValue(cityArr[0].cityName);

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
                    Ext.getCmp('officeCombo').clearValue();
                    Ext.getCmp('officeCombo').bindStore(officeStore);
                    Ext.getCmp('officeCombo').setValue(officeName[0]);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        saveCustomerCallData: function(){
            var formJson = {};
            formJson['CONTNAME'] = Ext.getCmp('customerName').value;
            formJson['CONTACTNAME'] = Ext.getCmp('customerName').value;
            //var callend = new Date();
            formJson['GENDER'] = Ext.getCmp('contactGender').value;
            formJson['CALLENDTIME'] = "Y";
            formJson['TEAMDESC'] = userObj.TEAMDESC;
            formJson['SUBTEAMDESC'] = userObj.SUBTEAMDESC;
            formJson['TEAMID'] = userObj.TEAMID;
            formJson['SUBTEAMID'] = userObj.SUBTEAMID;
            formJson['USERID'] = userObj.USERID;
            formJson['USERDESC'] = userObj.USERNAME;
            formJson['CONTREF'] = Ext.getCmp('contRefId').getValue();
            formJson['LANGDESC'] = Ext.getCmp('languageCombo').rawValue;
            formJson['LANGID'] = Ext.getCmp('languageCombo').value;

            formJson['CALLSOURCE'] = callSource;
            formJson['ACTUALEXT'] = Ext.get('extention').getHTML();
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            formJson['CALLEDNO'] = Ext.get("extention").getHTML();
            formJson['SHOWID'] = userObj.SHOWID;
            formJson['SHOWDESC'] = userObj.SHOWDESC;
            formJson['MEDIADESC'] = 'NA';
            formJson['MEDIAID'] = -1;
            formJson['SYNCHED_WITH_BYD'] = 1;
            var formJsonString = JSON.stringify(formJson);

            Ext.Ajax.request({
                url: '/crm/api/putCallUpdate',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'PUT',
                success: function(response, opts){

                },
                failure: function(response, opts) {
                    //console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadOrderHistory: function(contRef, gridId){
            if(contRef == "" || contRef == undefined || contRef == null){

                Ext.Msg.alert("Order History", "No Order for this customer");
                return ;

            }else{

                Ext.Ajax.request({
                    url: '/crm/api/getOrderByCustomer/'+contRef,
                    contentType: 'application/json; charset=utf-8',
                    success: function(response, opts){
                        var fullDataOrderHistory = Ext.decode(response.responseText);
                        var dataOrderHistory = new Array();
                        for(var i=0; i<fullDataOrderHistory.length; i++){
                            dataOrderHistory[i] = new Array();
                            dataOrderHistory[i]['ORDERREF'] = fullDataOrderHistory[i]['ORDERREF'];
                            dataOrderHistory[i]['ORDERSTATUS'] = fullDataOrderHistory[i]['ORDERSTATUS'];
                            dataOrderHistory[i]['TOTALDUE'] = fullDataOrderHistory[i]['TOTALDUE'];
                            dataOrderHistory[i]['CONTNAME'] = fullDataOrderHistory[i]['CONTNAME'];
                            dataOrderHistory[i]['DELVSTATE'] = fullDataOrderHistory[i]['DELVSTATE'];
                            dataOrderHistory[i]['DELVCITY'] = fullDataOrderHistory[i]['DELVCITY'];
                            dataOrderHistory[i]['ORDERDATE'] = fullDataOrderHistory[i]['ORDERDATE'];
                            var tmpDesc = '';
                            for(var j=0; j<fullDataOrderHistory[i].ORDERLINES.length; j++){
                                tmpDesc += fullDataOrderHistory[i]['ORDERLINES'][j]['PRODDESC']+' with AMC '+fullDataOrderHistory[i]['ORDERLINES'][j]['AMCVALUE']+' and sale price '+fullDataOrderHistory[i]['ORDERLINES'][j]['SALEPRICE']+'<br\>';
                            }
                            dataOrderHistory[i]['ORDERDESC'] = tmpDesc;
                        }
                        var orderHistoryStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['ORDERREF', 'ORDERSTATUS', 'TOTALDUE', 'CONTNAME', 'DELVSTATE', 'DELVCITY', 'ORDERDATE', 'ORDERDESC'],
                            data: dataOrderHistory
                        });
                        Ext.getCmp(gridId).bindStore(orderHistoryStore);
                    },
                    failure: function(response, opts) {
                        //console.log('server-side failure with status code ' + response.status);
                    }
                });

            }

        },
        loadTotalOrderOfCustomer: function(contRef){
            if(contRef == "" || contRef == undefined || contRef == null){
                Ext.Msg.alert("Order Count", "No Order for this customer");
                return ;
            }else{
                Ext.Ajax.request({
                    url: '/crm/api/getTotalOrderCountByCustomer/'+contRef,
                    success: function(response, opts){
                        Ext.select('div#OrderCounter').elements[0].innerHTML = "";
                        var orderCount = Ext.decode(response.responseText);
                        var tmpHtml = '<table class="customerDeatail" cellspacing="0" cellpadding="0">';
                        for(var i in orderCount){
                            tmpHtml += '<tr><td>'+i+'</td><td>'+orderCount[i]+'</td></tr>';
                        }
                        tmpHtml += '</table>';
                        Ext.select('div#OrderCounter').elements[0].innerHTML += tmpHtml;
                    },
                    failure : function(response, opts){
                        Ext.Msg.alert("Order Count", response);
                    }
                });
            }
        },
        checkManagerCredentials : function(mgrPassword, status, btnId){
            if(mgrPassword == "" || mgrPassword == undefined || mgrPassword == null){
                Ext.Msg.alert("Password", "Please enter manager password");
                return ;
            }else{
                Ext.Ajax.request({
                    url: '/crm/api/auth/managerCredentials',
                    params: {
                        "username" : userObj.USERNAME,
                        "password" : mgrPassword
                    },
                    success: function(response, opts){
                        var serverResponse = Ext.decode(response.responseText);
                        if(serverResponse.message === true){
                            for (var i = 0; i < Ext.select('table#contactContainerTbl tbody tr').elements.length; i++) {
                                if (Ext.select('table#contactContainerTbl tbody tr').elements[i].children[0].innerHTML == Ext.getCmp("primaryContact").value.toString()) {
                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].innerHTML = status;
                                    Ext.select('table#contactContainerTbl tbody tr').elements[i].children[1].className = status;
                                }
                            }
                            Ext.getCmp("primaryContact").findRecordByValue(Ext.getCmp("primaryContact").value).data.name = status;
                            Ext.getCmp(btnId).up('.window').close();
                        }  if(serverResponse.message === false){
                            Ext.Msg.alert("Response", "Please contact your manager");
                        }
                    },
                    failure : function(response, opts){
                        Ext.Msg.alert("Error", response);
                    }

                })

            }

        }
    }
});