Ext.define('CrmApp.controller.CRMController', {
	extend : 'Ext.app.Controller',
	stores: ['OtherLanguageDetail', 'OrderDetail', 'CallBackDetail', 'CallsDetail', 'ComplaintDetail', 'Orders','Details','Payments','CallHistoryStores', 'ProductDetails', 'PaymentDetails', 'DashboardChart', 'TeamMainGrid', 'TeamGrid', 'TeamTargetGrid', 'SubteamTargetGrid', 'AgentTargetGrid', 'ComplaintReminderDetail', 'CommunicationReminderDetail', 'SearchContactDetail', 'OrderHistoryDetail','AdvanceBookingDetail'],
	views : ['UserViewPort','CallFormPanel','MainControlFormPanel','CallSearchFormPanel', 'ComplaintsSearchFormPanel', 'OrderEntry', 'Panel1' , 'HeaderEntry', 'CallHistory', 'PaymentDetailGrid', 'Panel2' ,'DetailEntry', 'Panel3', 'PaymentEntry' , 'OrderForm', 'CallBackForm', 'AdvanceBookingForm', 'NotInterestedForm', 'ComplaintRequestForm', 'GeneralEnquiryForm', 'OtherLanguageForm', 'NonSaleCallForm', 'OrderEnquiryForm', 'DeliveryDetail', 'CalPopup', 'LoginForm', 'LoginWindow', 'callPopupForm', 'CallPopupScripts', 'EditOrderPopup', 'CustomerDetailsForm', 'ProductDetailsTab', 'ProductDetailsForm', 'ProductDetailEntry', 'DeliveryDetailsForm', 'PaymentDetailsTab', 'PaymentDetailsForm', 'PaymentDetailEntry', 'AuthorizationForm', 'SendSmsForm', 'SendEmailForm', 'RemarksForm', 'CallHistoryForm', 'PhoneDetailsForm', 'OrderHistoryForm', 'CallsDetailGrid', 'ComplaintDetailGrid', 'CallBackSearchFormPanel', 'CallBackDetailGrid', 'OrderSearchFormPanel', 'OrderDetailGrid', 'OtherLanguageSearchFormPanel', 'OtherLanguageDetailGrid', 'CallQualityAnalysisSearchFormPanel', 'DndSearchFormPanel', 'DndDetailGrid', 'DashboardPanel1', 'DashboardPanel2', 'DashboardChart', 'DashboardPieChart', 'DashboardBarDiagram', 'TeamManagementFormPanel', 'TeamManagementGridPanel', 'TeamMainGrid', 'TeamGrid', 'TargetManagementFormPanel', 'TargetManagementGridPanel', 'TeamTargetGrid', 'SubteamTargetGrid', 'AgentTargetGrid', 'TargetFormPanel', 'ComplaintReminderDetailGrid', 'CommunicationReminderDetailGrid', 'SearchContactForm', 'SearchContactDetailGrid','OrderHistoryDetailGrid', 'LogoutWindow', 'LogoutForm', 'AwayWindow', 'AwayForm', 'DateTimeRange', 'DndRequestForm', 'OrderEnquiryTabs', 'CommunicationDetails', 'CommunicationDetailsGrid', 'OrderRemarks', 'OrderRemarksGrid', 'IssueHistoryGrid','AdvanceBookingSearchFormPanel','AdvanceBookingDetailGrid', 'ViewCallInfo', 'GridContextMenus', 'UserManagementFormPanel', 'UserManagementGridPanel', 'CreateUserPanel', 'PermissionPanel', 'DiscountPanel', 'DiscountFormPanel', 'OrderManagementFormPanel', 'OrderManagementGrid', 'BookOrderFormPanel', 'WarehouseControlFormPanel', 'TeamFormPanel', 'TeamPanel', 'SubTeamFormPanel', 'SubTeamPanel'],
	init : function() {
		//console.log("Controller init called");
		this.control({
			'loginForm' : {
				render : this.onLoginFormRendered
			},
			'userViewPort' : {
			    render : this.onUserViewPortRendered
			},
            'warehouseViewPort' : {
                render : this.onWarehouseViewPortRendered
            },
			'callFormPanel' :{
				render : this.onCallFormPanelRendered
			},
			'mainControlFormPanel': {
				render : this.onMainControlFormPanelRendered
			},
			'calPopup':{
				render : this.onCallPaopupPanelRendered
			},
			'callSearchFormPanel' : {
				render : this.onCallSearchFormPanelRendered
			},
			'orderEntry' : {
				render : this.onPanelRendered
			},
			'headerEntry' : {
				render : this.onHeaderRendered,
				edit: this.editHeader
			},
			'paymentDetailGrid': {
				render : this.onPaymentDetailGridRendered,
				edit: this.editPaymentDetailGrid
			},
			'deliveryDetail' : {
				render : this.onDeliveryDetailFormRendered
			},
			'orderForm' : {
				render : this.onOrderFormRendered
			},
			'orderEntry button[id=orderBack]':{
				click: this.moveToPrev
			},
			'orderEntry button[id=orderNext]':{
				click: this.moveToNext
			},
			'panel1 button[id=saveProductDetails]': {
				click: this.saveProductDetails
			},
			'panel2' : {
				render : this.onDetailRendered,
				destroy: this.onDetailDestroyed 
			},
			'calPopup button[id=takeOrder]' :{
				click: this.bookOrder
			},
            'calPopup button[id=notInterestedBtn]' :{
                click: this.notInterestedBtn
            },
            'calPopup button[id=advanceBookingBtn]' :{
                click: this.advanceBookingBtn
            },
			'calPopup button[id=callBackBtn]' :{
				click: this.callBackBtn
			},
            'calPopup button[id=complaintRequestBtn]' :{
                click: this.complaintRequestBtn
            },
            'calPopup button[id=generalEnquiryBtn]' :{
                click: this.generalEnquiryBtn
            },
            'calPopup button[id=otherLanguageBtn]' :{
                click: this.otherLanguageBtn
            },
            'calPopup button[id=nonSaleCallBtn]' :{
                click: this.nonSaleCallBtn
            },
         'calPopup button[id=setCustDND]' :{
            click: this.setCustDND
            },
            'calPopup button[id=orderEnquiryBtn]' :{
                click: this.orderEnquiryBtn
            },
            'calPopup button[id=searchContact]':{
                click: this.searchContact
            },
			'callFormPanel button[id=phoneCall]' :{
				click: this.makeNewCall
			},
			'panel3 button[id=continue3]': {
				click: this.paymentContinue 
			},
            'targetManagementFormPanel button[id=getTargetBtn]': {
                click: this.getTarget
            },
            'bookOrderFormPanel button[id=bookWarehouseOrder]' :{
                click: this.bookWarehouseOrder
            }
		});
        try{
            iosocket.on('NEWCALL', function(data) {
                console.log("In New Call");
                MsgBus.fireEvent('openPOPUP', data);
            });

            iosocket.on('EDITORDER', function(data) {
                console.log("In Edit Order");
                MsgBus1.fireEvent('openEDITPOPUP', data);
            });

            iosocket.on('LOGININFO', function(data) {

                console.log("Setting Extention ---:"  + data.extdata);
                console.log("Setting Extention ---:"  + data.sourcedata);

                Ext.get("extention").setHTML(data.extdata);
                Ext.get("source").setHTML(data.sourcedata);
            });

        }catch(e){
            console.log("socket.io not initialized");
        }


		// Start - Event for opening popup if new call comes up from dialer.
		var msgBus = Ext.extend(Ext.util.Observable, {
			events : {
				openPOPUP : false,
                openEDITPOPUP : false

			}
		});
		var MsgBus = new msgBus();

		MsgBus.on('openPOPUP', function(tcpData){
            try{

                var tcpDataStr = tcpData.livedata;
                var custInfoArr = tcpDataStr.split("|");
                console.log(custInfoArr[1]);
                console.log(custInfoArr[2]);
                var phoneNumber = custInfoArr[1];
                CrmApp.controller.CRMController.loadLanguages('languageCombo');
                CrmApp.controller.CRMController.loadCallKey(phoneNumber);

                CrmApp.controller.CRMController.loadContactDetails(phoneNumber);
                var win = Ext.widget('window', {
                    title: 'New Call Information',
                    width: 1154,
                    height: 620,
                    layout: 'fit',
                    modal: true,
                    closable:false,
                    items: [
                        {
                            xtype: 'calPopup'
                        }
                    ],
                    defaultFocus: 'firstName'
                });
                win.show();
                CrmApp.controller.CRMController.loadProductDataStore('newCallProductCombo', 'product', selectedProductId);
                callSource = Ext.get('source').getHTML() + " I";
                Ext.getCmp('popupHeader').update('INCOMING CALL - '+ custInfoArr[2]);
            }catch(ex){
                iosocket.emit("CLOSEPOPUP", "popup closed");
            }

		});
        var msgBus1 = Ext.extend(Ext.util.Observable, {
            events : {
                openEDITPOPUP : true,
                openPOPUP : false
            }
        });
        var MsgBus1 = new msgBus1();
        MsgBus1.on('openEDITPOPUP', function(tcpData){

         try {

             var tcpDataStr = tcpData.livedata;
             var custInfoArr = tcpDataStr.split("|");
             console.log(custInfoArr[1]);
             var orderref = custInfoArr[1];

             editOrderCallFlag = true;
             CrmApp.controller.CRMController.getCustomerByOrder(orderref);
             CrmApp.controller.CRMController.getOrderDetail(orderref);



             //console.log(custInfoArr[2]);
             //Ext.MessageBox.alert(custInfoArr[1], custInfoArr[2]);
             var win1 = Ext.widget('window', {
                 title: 'View / Edit Order',
                 width: 635,
                 height: 580,
                 layout: 'fit',
                 modal: true,
                 closable: false,
                 items: [
                     {
                         xtype: 'editOrderPopup'
                     }
                 ],
                 defaultFocus: 'firstName',
                 listeners:{
                     'beforehide':function(win){

                     }
                 }
             });
             win1.show();
             callSource = Ext.get('source').getHTML() + " I";
             Ext.getCmp('popupHeader').update('EDIT ORDER CALL - ' + custInfoArr[1]);

        }catch(ex){

            iosocket.emit("CLOSEPOPUP", "popup closed");

        }
        });

    },
	// End - Event for opening popup if new call comes up from dialer.
	onLoginFormRendered: function(myPanel){
		//console.log("Login Form Call");
	},	 
	onCallPaopupPanelRendered: function(myPanel){
	},
	onCallFormPanelRendered :function(myPanel) {
		//console.log('Call Form Panel was rendered');
	},
	onUserViewPortRendered : function(myPanel) {
		//console.log('The Order Entry Panel was rendered');
        CrmApp.controller.CRMController.loadAllProducts();
	},
    onWarehouseViewPortRendered : function(myPanel) {
        //console.log('The Order Entry Panel was rendered');
        CrmApp.controller.CRMController.loadAllProducts();
    },
	onMainControlFormPanelRendered : function(myPanel) {
		//console.log('The Main Control Panel was rendered');
	},
	onCallSearchFormPanelRendered : function(myPanel){
		//console.log('The Search Form Panel was rendered');
		//Ext.getCmp('west-panel').items.items[3].expand();
	},
	onDeliveryDetailFormRendered : function(myPanel) {
		//console.log('The Delivery Detail Panel was rendered');
	},
	onOrderFormRendered : function(myPanel) {
		//console.log('The Order Entry Panel was rendered');
	},
	onPanelRendered : function(myPanel) {
		//console.log('The Order Entry Panel was rendered');
	},
	onHeaderRendered : function(myPanel) {
		//console.log('The header panel was rendered');
	},
	onPaymentDetailGridRendered: function(myPanel) {
		//console.log('The payment detail panel was rendered');
	},
	editHeader : function() {
		console.log('Editing Header');
	},
	editPaymentDetailGrid: function(){
		console.log('Editing Payment Detail');
	},
	bookOrder:function(){
		var myWin = new Ext.Window({
			id: 'myWin',
			height : 536,
			width  : 500,
			title: 'Add New Order: <span id="orderFormTitle">Product Details</span>',
			layout: 'fit',
			modal: true,
			closable:false,
			items  : [
				{
				 xtype: 'orderEntry'
				}	
			]		
		});
		//Ext.getCmp('callheader').update("Outgoing Call");
        if(customerName === "" || customerName === undefined || customerName === null){
            Ext.Msg.alert("Message", "Please update customer address and name");
        }else{

            Ext.Ajax.request({
                url: '/crm/api/checkContactDetails/'+Ext.getCmp("primaryNumber").value,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    if(responseObj.message == "true"){
                        myWin.show();
                    }else{
                        Ext.Msg.alert("Message", "Please update customer address and name");
                    }

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


        }

	},
	moveToPrev: function(button){
		panel = button.up('orderEntry');
		var currentItem = panel.getLayout().activeItem.id;
		var prevItemIndex = parseInt(currentItem.split('-')[1]) - 1;
        if(prevItemIndex == 0){
            panel.getLayout().setActiveItem(prevItemIndex);
            Ext.getCmp('orderBack').disable();
            CrmApp.view.OrderForm.toogleNextBtn();
        }
        if(prevItemIndex == 1){
            panel.getLayout().setActiveItem(prevItemIndex);
            Ext.getCmp('orderBack').enable();
            CrmApp.view.DeliveryDetail.toogleNextBtn();
        }
        if(prevItemIndex == 2){
            Ext.getCmp('orderBack').enable();
            panel.getLayout().setActiveItem(prevItemIndex);
        }
		Ext.getCmp('orderNext').setText('Next');
		this.orderTitleUpdate(panel);
	},
	moveToNext: function(button){
		panel = button.up('orderEntry');
		var currentItem = panel.getLayout().activeItem.id;
		var nextItemIndex = parseInt(currentItem.split('-')[1]) + 1;
		if(nextItemIndex == 1){
			panel.getLayout().setActiveItem(nextItemIndex);
            CrmApp.view.DeliveryDetail.toogleNextBtn();
		}
		if(nextItemIndex == 2){
			button.setText('Finish');
            panel.getLayout().setActiveItem(nextItemIndex);
            CrmApp.view.PaymentEntry.toogleNextBtn();
		}
		if(nextItemIndex == 3){
            for(var i=0; i<Ext.getCmp('myGridPanel').store.data.items.length; i++){
                orderJson['ORDERLINES'][i] = Ext.getCmp('myGridPanel').store.data.items[i].data;
            }
            for(var i=0; i<Ext.getCmp('myPaymentGridPanel').store.data.items.length; i++){
                if(Ext.getCmp('myPaymentGridPanel').store.data.items[i].data.PAYMENTMODEID === 3){
                    orderJson['APPROVEFORAUTH'] = 'Y';
                }
                orderJson['PAYMENTLINES'][i] = Ext.getCmp('myPaymentGridPanel').store.data.items[i].data;
            }
            //orderJson['AUTHPREFERDATE'] = '';
            //orderJson['AUTHPREFERTIME'] = '';
            orderJson['ORDERSTATUS'] = 'P';
            orderJson['USERID'] = userObj.USERID;
            orderJson['USERDESC'] = userObj.USERNAME;
            orderJson['CONTREF'] = Ext.getCmp('contRefId').value;
            orderJson['CONTNAME'] = Ext.getCmp('customerName').value;
            orderJson['TOTALQTY'] = Ext.getCmp('totalQuantity').value;
            orderJson['NETT'] = Ext.getCmp('grossPrice').value;
            orderJson['BALANCEDUE'] = Ext.getCmp('totalDue').value;
            orderJson['TOTALDUE'] = Ext.getCmp('netDue').value;
            if(Ext.getCmp('pinCode').rawValue != "0"){
                orderJson['DLVCOUNTRYID'] = Ext.getCmp('countryCombo').findRecordByValue(Ext.getCmp('countryCombo').value).data.countryId;
                orderJson['DLVCOUNTRY'] = Ext.getCmp('countryCombo').value;
                orderJson['DLVSTATEID'] = Ext.getCmp('stateCombo').findRecordByValue(Ext.getCmp('stateCombo').value).data.stateId;
                orderJson['DLVSTATE'] = Ext.getCmp('stateCombo').value;
                orderJson['DLVCITYID'] = Ext.getCmp('cityCombo').findRecordByValue(Ext.getCmp('cityCombo').value).data.cityId;
                orderJson['DLVCITY'] = Ext.getCmp('cityCombo').value;
                orderJson['DLVPINCODE'] = Ext.getCmp('pinCode').value;
            }else if(Ext.getCmp('pinCode').rawValue == "0"){
                orderJson['DLVCOUNTRYID'] = '-1';
                orderJson['DLVCOUNTRY'] = Ext.getCmp('countryCombo').value;
                orderJson['DLVSTATEID'] = '-1';
                orderJson['DLVSTATE'] = Ext.getCmp('stateCombo').value;
                orderJson['DLVCITYID'] = '-1';
                orderJson['DLVCITY'] = Ext.getCmp('cityCombo').value;
                orderJson['DLVPINCODE'] = Ext.getCmp('pinCode').value;
            }
            orderJson['DELIVERYREMARKS'] = Ext.getCmp('deliveryNotes').value;
            orderJson['LANGID'] = Ext.getCmp('languageCombo').value;
            orderJson['LANGDESC'] = Ext.getCmp('languageCombo').rawValue;
            orderJson['TEAMID'] = userObj.TEAMID;
            orderJson['TEAMDESC'] = userObj.TEAMDESC;
            orderJson['SUBTEAMID'] = userObj.SUBTEAMID;
            orderJson['SUBTEAMDESC'] = userObj.SUBTEAMDESC;
            orderJson['ORDERSOURCE'] = callSource;
            orderJson['SHOWID'] = 19;
            orderJson['SHOWDESC'] = 'HEAD OFFICE';
            orderJson['ACTUALEXT'] = Ext.get('extention').getHTML();
            orderJson['CCAUTHID'] = '';
            orderJson['CCAUTHDESC'] = '';
            orderJson['CCCHARES'] = '';
            orderJson['DISTRICTID'] = '-1';
            orderJson['DISTRICTDESC'] = Ext.getCmp('cityCombo').value;
            orderJson['TOTALDISC'] = '';
            orderJson['DISPO']= new Array();

            orderJson['DISPO'][0]= {};
            orderJson['DISPO'][0]['DISPID'] = 5;
            orderJson['DISPO'][0]['DISPDESC'] = "Order";
            orderJson['CALLSTATUS'] = "C";
            orderJson['REMARKS'] = "Order Booked";
            orderJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            orderJson['USERDESC'] = userObj.USERNAME;
            orderJson['DISPID'] = 5;
            orderJson['DISPDESC'] = "Order";


            var deliveryAddress = Ext.getCmp('delAddress').getValue().rbDelivery;
            if(deliveryAddress == '1'){
                orderJson['DELVADD1'] = Ext.getCmp('address1').value;
                orderJson['DELVADD2'] = Ext.getCmp('address2').value;
                if(Ext.getCmp('pinCode').rawValue != "0"){
                    orderJson['DELVADD3'] = Ext.getCmp('officeCombo').value;
                    orderJson['DELVCITY'] = Ext.getCmp('cityCombo').value;
                    orderJson['DELVSTATE'] = Ext.getCmp('stateCombo').value;
                    orderJson['DELVCOUNTRYID'] = Ext.getCmp('countryCombo').findRecordByValue(Ext.getCmp('countryCombo').value).data.countryId;
                    orderJson['DELVSTATEID'] = Ext.getCmp('stateCombo').findRecordByValue(Ext.getCmp('stateCombo').value).data.stateId;
                    orderJson['DELVCITYID'] = Ext.getCmp('cityCombo').findRecordByValue(Ext.getCmp('cityCombo').value).data.cityId;

                }else if(Ext.getCmp('pinCode').rawValue == "0"){
                    orderJson['DELVADD3'] = Ext.getCmp('officeCombo').rawValue;
                    orderJson['DELVCITY'] = Ext.getCmp('cityCombo').rawValue;
                    orderJson['DELVSTATE'] = Ext.getCmp('stateCombo').rawValue;
                    orderJson['DELVCOUNTRYID'] = -1;
                    orderJson['DELVSTATEID'] = -1;
                    orderJson['DELVCITYID'] = -1;
                }
                orderJson['DELVTYPE'] = '1';
                orderJson['DELVCOUNTRY'] = Ext.getCmp('countryCombo').value;
                orderJson['DELVPINCODE'] = Ext.getCmp('pinCode').rawValue;
            }
            else {
                orderJson['DELVADD1'] = Ext.getCmp('deliveryAddrLine1').value;
                orderJson['DELVADD2'] = Ext.getCmp('deliveryAddrLine2').value;
                if(Ext.getCmp('deliveryPinCode').rawValue != "0"){
                    orderJson['DELVADD3'] = Ext.getCmp('deliveryAddrLine3').value;
                    orderJson['DELVCITY'] = Ext.getCmp('deliveryCity').value;
                    orderJson['DELVSTATE'] = Ext.getCmp('deliveryState').value;
                    orderJson['DELVCOUNTRYID'] = Ext.getCmp('deliveryCountry').findRecordByValue(Ext.getCmp('deliveryCountry').value).data.countryId;
                    orderJson['DELVSTATEID'] = Ext.getCmp('deliveryState').findRecordByValue(Ext.getCmp('deliveryState').value).data.stateId;
                    orderJson['DELVCITYID'] = Ext.getCmp('deliveryCity').findRecordByValue(Ext.getCmp('deliveryCity').value).data.cityId;

                }else if(Ext.getCmp('deliveryPinCode').rawValue == "0"){
                    orderJson['DELVADD3'] = Ext.getCmp('deliveryAddrLine3').rawValue;
                    orderJson['DELVCITY'] = Ext.getCmp('deliveryCity').rawValue;
                    orderJson['DELVSTATE'] = Ext.getCmp('deliveryState').rawValue;
                    orderJson['DELVCOUNTRYID'] = -1;
                    orderJson['DELVSTATEID'] = -1;
                    orderJson['DELVCITYID'] = -1;
                }
                orderJson['DELVTYPE'] = '2';
                orderJson['DELVPINCODE'] = Ext.getCmp('deliveryPinCode').rawValue;
                orderJson['DELVCOUNTRY'] = Ext.getCmp('deliveryCountry').value;
            }
            var invoiceAddress = Ext.getCmp('invoiceAddress').getValue().rbInvoice;
            if(invoiceAddress == '1'){
                orderJson['INVADD1'] = Ext.getCmp('address1').value;
                orderJson['INVADD2'] = Ext.getCmp('address2').value;
                if(Ext.getCmp('pinCode').rawValue != "0"){
                    orderJson['INVADD3'] = Ext.getCmp('officeCombo').value;
                    orderJson['INVCITY'] = Ext.getCmp('cityCombo').value;
                    orderJson['INVSTATE'] = Ext.getCmp('stateCombo').value;
                    orderJson['INVCOUNTRYID'] = Ext.getCmp('countryCombo').findRecordByValue(Ext.getCmp('countryCombo').value).data.countryId;
                    orderJson['INVSTATEID'] = Ext.getCmp('stateCombo').findRecordByValue(Ext.getCmp('stateCombo').value).data.stateId;
                    orderJson['INVCITYID'] = Ext.getCmp('cityCombo').findRecordByValue(Ext.getCmp('cityCombo').value).data.cityId;

                }else if(Ext.getCmp('pinCode').rawValue == "0"){
                    orderJson['INVADD3'] = Ext.getCmp('officeCombo').rawValue;
                    orderJson['INVCITY'] = Ext.getCmp('cityCombo').rawValue;
                    orderJson['INVSTATE'] = Ext.getCmp('stateCombo').rawValue;
                    orderJson['INVCOUNTRYID'] = -1;
                    orderJson['INVSTATEID'] = -1;
                    orderJson['INVCITYID'] = -1;
                }
                orderJson['INVCOUNTRY'] = Ext.getCmp('countryCombo').value;
                orderJson['INVPINCODE'] = Ext.getCmp('pinCode').rawValue;
            }
            else {
                orderJson['INVADD1'] = Ext.getCmp('deliveryAddrLine1').value;
                orderJson['INVADD2'] = Ext.getCmp('deliveryAddrLine2').value;
                if(Ext.getCmp('deliveryPinCode').rawValue != "0"){
                    orderJson['INVADD3'] = Ext.getCmp('deliveryAddrLine3').value;
                    orderJson['INVCITY'] = Ext.getCmp('deliveryCity').value;
                    orderJson['INVSTATE'] = Ext.getCmp('deliveryState').value;
                    orderJson['INVCOUNTRYID'] = Ext.getCmp('deliveryCountry').findRecordByValue(Ext.getCmp('deliveryCountry').value).data.countryId;
                    orderJson['INVSTATEID'] = Ext.getCmp('deliveryState').findRecordByValue(Ext.getCmp('deliveryState').value).data.stateId;
                    orderJson['INVCITYID'] = Ext.getCmp('deliveryCity').findRecordByValue(Ext.getCmp('deliveryCity').value).data.cityId;

                }else if(Ext.getCmp('deliveryPinCode').rawValue == "0"){
                    orderJson['INVADD3'] = Ext.getCmp('deliveryAddrLine3').rawValue;
                    orderJson['INVCITY'] = Ext.getCmp('deliveryCity').rawValue;
                    orderJson['INVSTATE'] = Ext.getCmp('deliveryState').rawValue;
                    orderJson['INVCOUNTRYID'] = -1;
                    orderJson['INVSTATEID'] = -1;
                    orderJson['INVCITYID'] = -1;
                }
                orderJson['INVPINCODE'] = Ext.getCmp('deliveryPinCode').rawValue;
                orderJson['INVCOUNTRY'] = Ext.getCmp('deliveryCountry').value;
            }

            orderJson['CALLBACKCCONTACTNO'] = Ext.getCmp('primaryNumber').value;
            orderJson['CONTACTNO']= new Array();
            orderJson['CONTACTNO'].push(Ext.getCmp("primaryContact").findRecord("name", "PRIMARY").data.value);
            if(Ext.getCmp("primaryContact").findRecord("name", "ACTIVE") != false)
            orderJson['CONTACTNO'].push(Ext.getCmp("primaryContact").findRecord("name", "ACTIVE").data.value);

            var orderJsonString = JSON.stringify(orderJson);
             /*console.log(orderJsonString);*/

			Ext.Msg.confirm("Confirmation", "Do you want to place the Order?", function(btnText){
				if(btnText === "no"){
					Ext.Msg.alert("Alert", "You have confirmed 'No'.");
				}
				else if(btnText === "yes"){
                    Ext.Ajax.request({
                        url: '/crm/api/orders',
                        method: 'POST',
                        params: {
                            "orderJson" : orderJsonString
                        },
                        success: function(response, opts) {
                            Ext.Msg.alert("Message", "Order has been booked.");
                            Ext.getCmp('myGridPanel').store.removeAll();
                            Ext.getCmp('myPaymentGridPanel').store.removeAll();
                            if (iosocket !== ''){
                                iosocket.emit('CALLDISP', '5');
                            }
                            button.up('.window').close();
                            CrmApp.controller.CRMController.callCompleted();
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
				}
			}, this);
		}
		Ext.getCmp('orderBack').enable();
		this.orderTitleUpdate(panel);
	},
	orderTitleUpdate: function(panel){
		var currentItem = panel.getLayout().activeItem.id;
		switch(currentItem) {
			case 'card-0':
				Ext.get('orderFormTitle').dom.childNodes[0].data = 'Product Details';
				break;
			case 'card-1':
				Ext.get('orderFormTitle').dom.childNodes[0].data = 'Delivery Details';
				break;
			case 'card-2':
				Ext.get('orderFormTitle').dom.childNodes[0].data = 'Payment Details';
				break;
		}
	},
	makeNewCall:function(){
		var win = Ext.widget('window', {
			title: 'New Call Information',
			width: 1154,
			height: 620,
			layout: 'fit',
			modal: true,
            closable:false,
			items: [
				{
				 xtype: 'calPopup'
				}
			],
			defaultFocus: 'firstName'
		});
		//Ext.fly('callheader').update('Incoming Call   -- Campaign '+ custInfoArr[2], true);
		win.show();
        callSource = Ext.get('source').getHTML() + " O";
        CrmApp.controller.CRMController.loadLanguages('languageCombo');
        var phoneNumber = Ext.getCmp('phoneNumber').value;
        var contactKey = Ext.getCmp('contRefId').value;
        CrmApp.controller.CRMController.loadCallKey(phoneNumber);

        CrmApp.controller.CRMController.loadContactDetails(phoneNumber);
        CrmApp.controller.CRMController.loadProductDataStore('newCallProductCombo', 'product', selectedProductId);
	},
    bookWarehouseOrder:function(){
        var win = Ext.widget('window', {
            title: 'Book New Order',
            width: 1154,
            height: 620,
            layout: 'fit',
            modal: true,
            closable:false,
            items: [
                {
                    xtype: 'calPopup'
                }
            ],
            defaultFocus: 'firstName'
        });
        win.show();
        callSource = Ext.get('source').getHTML() + " O";
        CrmApp.controller.CRMController.loadLanguages('languageCombo');
        var phoneNumber = Ext.getCmp('phoneNumber').value;
        var contactKey = Ext.getCmp('contRefId').value;
        CrmApp.controller.CRMController.loadCallKey(phoneNumber);

        CrmApp.controller.CRMController.loadContactDetails(phoneNumber);
        CrmApp.controller.CRMController.loadProductDataStore('newCallProductCombo', 'product', selectedProductId);
        //Warehouse Specific
        Ext.getCmp('setCustDND').hide();
        Ext.getCmp('notInterestedBtn').hide();
        Ext.getCmp('advanceBookingBtn').hide();
        Ext.getCmp('callBackBtn').hide();
        Ext.getCmp('complaintRequestBtn').hide();
        Ext.getCmp('generalEnquiryBtn').hide();
        Ext.getCmp('otherLanguageBtn').hide();
        Ext.getCmp('nonSaleCallBtn').hide();
        Ext.getCmp('endCallBut').hide();
        Ext.getCmp('closeCallBtn').hide();
        Ext.getCmp('closeBookOrderBtn').show();
        Ext.getCmp('popupHeader').update('Book New Order');
    },
	saveProductDetails : function(button) {

	},
	onDetailRendered : function(myPanel) {
		console.log('The detail panel was rendered');
	},
	onDetailDestroyed : function(myPanel) {
		console.log('The detail panel was destroyed');
	},  
	onPaymentRendered : function(myPanel) {
		console.log('The payment panel was rendered');
	},
	onPaymentDestroyed : function(myPanel) {
		console.log('The payment panel was destroyed');
	},
	paymentContinue : function(button) {
		Ext.MessageBox.alert('End of Order...', 'Submitted successfully!'); 
	},
	callBackBtn:function(){
		var callBackWindow = new Ext.Window({
			id: 'callBackWindow',
			height : 277,
			width  : 500,
			title: 'Add New Call Back',
			layout: 'fit',
			modal: true,
			closable:false,
			items  : [
				{
				 xtype: 'callBackForm'
				}	
			]		
		});

        if(customerName === "" || customerName === undefined || customerName === null){
            Ext.Msg.alert("Message", "Please update customer address and name");
        }else{
            callBackWindow.show();
        }

	},
    advanceBookingBtn:function(){

        var advanceBookingWindow = new Ext.Window({
            id: 'advanceBookingWindow',
            height : 250,
            width  : 500,
            title: 'Add New Advance Booking',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'advanceBookingForm'
                }
            ]
        });

        Ext.Ajax.request({
            url: '/crm/api/checkContactDetails/'+Ext.getCmp("primaryNumber").value,
            success: function(response, opts){
                var responseObj = Ext.decode(response.responseText);
                if(responseObj.message == "true"){
                    advanceBookingWindow.show();
                }else{
                    Ext.Msg.alert("Message", "Please update customer address and name");
                }

            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },
    notInterestedBtn:function(){
        var notInterestedWindow = new Ext.Window({
            id: 'notInterestedWindow',
            height : 250,
            width  : 500,
            title: 'Add New Not Interested',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'notInterestedForm'
                }
            ]
        });
        if(customerName === "" || customerName === undefined || customerName === null){
            Ext.Msg.alert("Message", "Please update customer address and name");
        }else {

            notInterestedWindow.show();
        }
    },
    complaintRequestBtn:function(){
        var complaintRequestWindow = new Ext.Window({
            id: 'complaintRequestWindow',
            height : 479,
            width  : 600,
            title: 'Complaint/Request',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'complaintRequestForm'
                }
            ]
        });
        complaintRequestWindow.show();
    },
    generalEnquiryBtn:function(){
        var generalEnquiryWindow = new Ext.Window({
            id: 'generalEnquiryWindow',
            height : 274,
            width  : 500,
            title: 'Add New General Enquiry',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'generalEnquiryForm'
                }
            ]
        });
        if(customerName === "" || customerName === undefined || customerName === null){
            Ext.Msg.alert("Message", "Please update customer address and name");
        }else{
            generalEnquiryWindow.show();
        }

    },
    otherLanguageBtn:function(){
        var otherLanguageWindow = new Ext.Window({
            id: 'otherLanguageWindow',
            height : 255,
            width  : 500,
            title: 'Add Other Language',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'otherLanguageForm'
                }
            ]
        });
        if(customerName === "" || customerName === undefined || customerName === null){
            Ext.Msg.alert("Message", "Please update customer address and name");
        }else {
            otherLanguageWindow.show();
        }
    },
    nonSaleCallBtn:function(){
        var nonSaleCallWindow = new Ext.Window({
            id: 'nonSaleCallWindow',
            height : 201,
            width  : 500,
            title: 'Non-Sale Call',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'nonSaleCallForm'
                }
            ]
        });
        if(customerName === "" || customerName === undefined || customerName === null){
            Ext.Msg.alert("Message", "Please update customer address and name");
        }else{
            nonSaleCallWindow.show();
        }

    },

    setCustDND:function(){
        var dndRequestFormWindow = new Ext.Window({
            id: 'DndRequestFormWindow',
            width:450,
            height:250,
            title: 'Set customer as DND',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'dndRequestForm'
                }
            ]
        });
        dndRequestFormWindow.show();
    },

    orderEnquiryBtn:function(){
        var orderEnquiryWindow = new Ext.Window({
            id: 'orderEnquiryWindow',
            height : 700,
            width  : 1000,
            title: 'Order Enquiry',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'orderEnquiryForm'
                }
            ]
        });
        orderEnquiryWindow.show();
    },
    getTarget:function(){
        var targetWindow = new Ext.Window({
            id: 'targetWindow',
            height : 159,
            width  : 630,
            title: 'New Target',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'targetFormPanel'
                }
            ]
        });
        targetWindow.show();
    },
    searchContact:function(){
        var searchContactWindow = new Ext.Window({
            id: 'searchContactWindow',
            height : 515,
            width  : 760,
            title: 'Search Contact',
            layout: 'fit',
            modal: true,
            closable:false,
            items  : [
                {
                    xtype: 'searchContactForm'
                }
            ]
        });
        searchContactWindow.show();
    },

    statics: {
        callCompleted: function () {
            Ext.getCmp('closeBookOrderBtn').enable();
            Ext.getCmp('closeCallBtn').enable();
            Ext.getCmp('notInterestedBtn').disable();
            Ext.getCmp('advanceBookingBtn').disable();
            Ext.getCmp('callBackBtn').disable();
            Ext.getCmp('complaintRequestBtn').disable();
            Ext.getCmp('generalEnquiryBtn').disable();
            Ext.getCmp('takeOrder').disable();
            Ext.getCmp('otherLanguageBtn').disable();
            Ext.getCmp('nonSaleCallBtn').disable();
            Ext.getCmp('orderEnquiryBtn').disable();
        },
        loadProductDataStore: function(comboId, comboType, selectedProductId){
            var dataProduct = new Array();
            if(comboType != 'freeGift') {
                for (var i = 0; i < allProductResults.length; i++) {
                    dataProduct[i] = new Array();
                    dataProduct[i]['name'] = allProductResults[i].PRODDESC;
                    dataProduct[i]['value'] = allProductResults[i].PRODID;
                    dataProduct[i]['saleValue'] = allProductResults[i].SALEVALUE;
                    dataProduct[i]['freeCost'] = allProductResults[i].FREECOST;
                    dataProduct[i]['isAmc'] = allProductResults[i].ISAMC;
                    dataProduct[i]['amcValue'] = allProductResults[i].AMCVALUE;
                }
            }
            else{
                dataProduct[0] = new Array();
                dataProduct[0]['name'] = 'N/A';
                dataProduct[0]['value'] = 'default';
                dataProduct[0]['saleValue'] = 0;
                for (var i = 1; i <= allProductResults.length; i++) {
                    dataProduct[i] = new Array();
                    dataProduct[i]['name'] = allProductResults[i-1].PRODDESC;
                    dataProduct[i]['value'] = allProductResults[i-1].PRODID;
                    dataProduct[i]['saleValue'] = allProductResults[i-1].SALEVALUE;
                    dataProduct[i]['freeCost'] = allProductResults[i-1].FREECOST;
                    dataProduct[i]['isAmc'] = allProductResults[i-1].ISAMC;
                    dataProduct[i]['amcValue'] = allProductResults[i-1].AMCVALUE;
                }
            }

            var productStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value', 'saleValue', 'freeCost', 'isAmc', 'amcValue'],
                data: dataProduct
            });
            Ext.getCmp(comboId).clearValue();
            Ext.getCmp(comboId).bindStore(productStore);
            Ext.getCmp(comboId).setValue(selectedProductId);
            var dataProduct = null;
        },
        loadCallKey: function(phoneNumber){
            Ext.Ajax.request({
                url: '/crm/api/getCallKeySeq/'+phoneNumber,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    if(editOrderCallFlag)
                    {
                        editOrderCallKey = responseObj.CALLKEY;

                    }
                    else
                    {
                        Ext.getCmp('callKeyId').setValue(responseObj.CALLKEY);
                    }


                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadCallHistory: function(contactKey){
            Ext.Ajax.request({
                url: '/crm/api/call?Search={"REPORTTYPE":"CUSTTODAYCALL", "CONTREF": "'+contactKey+'"}',
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    for(var i=0; i<responseObj.length; i++){
                        Ext.DomHelper.append(Ext.getDom('callHistoryContainer-targetEl'), {
                            tag: 'div',
                            html: '<div class="callHistoryList">'+responseObj[i].CONTACTNAME+' </br> Call Date:'+ Ext.Date.format(  new Date(responseObj[i].CALLSTARTTIME), 'm/d/Y g:i A')+ '<br/> Disposition - '+ linktoDetails(responseObj[i].DISPDESC, responseObj[i].CALLKEY)+'</div>'
                        }, true);
                        //Ext.getCmp('callHistoryContainer').add([{html: '<div class="callHistoryList">'+responseObj[i].CONTACTNAME+'<br/> Disposition - '+responseObj[i].DISPDESC+' </br> Call Date:'+ Ext.Date.format(  new Date(responseObj[i].CALLSTARTTIME), 'm/d/Y g:i A')+'<br/> Remarks: '+responseObj[i].REMARKS+'</div>'}]);
                        //Ext.getCmp('callHistoryContainer').add([{html: ''}]);
                    }
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadContactDetails: function(phoneNumber){
            Ext.Ajax.request({
                url: '/crm/api/contact/'+phoneNumber,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);

                    if(responseObj.length > 0){
                        CrmApp.controller.CRMController.loadCallHistory(responseObj[0].CONTREF);
                        customerName = responseObj[0].CONTNAME;
                        Ext.getCmp('nameTitle').setValue(responseObj[0].TITLE);
                        Ext.getCmp('customerName').setValue(responseObj[0].CONTNAME);
                        Ext.getCmp('contactGender').setValue(responseObj[0].GENDER);
                        Ext.getCmp('callPhoneNo').setValue(responseObj[0].PRIMARYCONTACT);
                        if(responseObj[0].Email.length > 0) {
                            Ext.getCmp('contactEmail').setValue(responseObj[0].Email[0]);
                        }
                        var tmpHtml = '<table id="contactContainerTbl" class="customerDeatail" cellspacing="0" cellpadding="0">';
                        tmpHtml += '<tr><td>'+responseObj[0].PRIMARYCONTACT+'</td><td class="PRIMARY">PRIMARY</td></tr>';
                        var dataContact = new Array();
                        dataContact[0] = new Array();
                        dataContact[0]['name'] = 'PRIMARY';
                        dataContact[0]['value'] = responseObj[0].PRIMARYCONTACT;
                        var contactCounter = 1;
                        var contactCount = 1;
                        for(var i=contactCount; i<(responseObj[0].ACTIVECONTACT.length+contactCount); i++){
                            dataContact[i] = new Array();
                            dataContact[i]['name'] = 'ACTIVE';
                            dataContact[i]['value'] = responseObj[0].ACTIVECONTACT[i-contactCount];
                            tmpHtml += '<tr><td>'+responseObj[0].ACTIVECONTACT[i-contactCount]+'</td><td class="ACTIVE">ACTIVE</td></tr>';
                            contactCounter++;
                        }
                        contactCount = contactCounter;
                        for(var i=contactCount; i<(responseObj[0].INACTIVE.length+contactCount); i++){
                            dataContact[i] = new Array();
                            dataContact[i]['name'] = 'INACTIVE';
                            dataContact[i]['value'] = responseObj[0].INACTIVE[i-contactCount];
                            tmpHtml += '<tr><td>'+responseObj[0].INACTIVE[i-contactCount]+'</td><td class="INACTIVE">INACTIVE</td></tr>';
                            contactCounter++;
                        }
                        contactCount = contactCounter;
                        for(var i=contactCount; i<(responseObj[0].INVALIDCONTACT.length+contactCount); i++){
                            dataContact[i] = new Array();
                            dataContact[i]['name'] = 'INVALID';
                            dataContact[i]['value'] = responseObj[0].INVALIDCONTACT[i-contactCount];
                            tmpHtml += '<tr><td>'+responseObj[0].INVALIDCONTACT[i-contactCount]+'</td><td class="INVALID">INVALID</td></tr>';
                            contactCounter++;
                        }
                        var contactStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['name', 'value'],
                            data: dataContact
                        });
                        Ext.getCmp('primaryContact').clearValue();
                        Ext.getCmp('primaryContact').bindStore(contactStore);
                        Ext.getCmp('primaryContact').setValue(responseObj[0].PRIMARYCONTACT);
                        tmpHtml += '</table>';
                        Ext.getDom('contactContainer').innerHTML = tmpHtml;
                        Ext.getCmp('contRefId').setValue(responseObj[0].CONTREF);
                        Ext.getCmp('primaryNumber').setValue(responseObj[0].PRIMARYCONTACT);
                        if(responseObj[0].ContactDetails.Address.length > 0) {
                            Ext.getCmp('pinCode').setValue(responseObj[0].ContactDetails.Address[0].PINCODE);
                            Ext.getCmp('address1').setValue(responseObj[0].ContactDetails.Address[0].ADD1);
                            Ext.getCmp('address2').setValue(responseObj[0].ContactDetails.Address[0].ADD2);
                            var dataProduct = new Array();
                            dataProduct[0] = new Array();
                            dataProduct[0]['name'] = responseObj[0].ContactDetails.Address[0].ADD3;
                            dataProduct[0]['value'] = responseObj[0].ContactDetails.Address[0].ADD3;
                            var productStore = Ext.create('Ext.data.Store', {
                                autoDestroy: true,
                                fields: ['name', 'value'],
                                data: dataProduct
                            });
                            Ext.getCmp('officeCombo').clearValue();
                            Ext.getCmp('officeCombo').bindStore(productStore);
                            Ext.getCmp('officeCombo').setValue(responseObj[0].ContactDetails.Address[0].ADD3);
                            var dataProduct = null;
                            var dataProduct = new Array();
                            dataProduct[0] = new Array();
                            dataProduct[0]['name'] = responseObj[0].ContactDetails.Address[0].STATEDESC;
                            dataProduct[0]['value'] = responseObj[0].ContactDetails.Address[0].STATEDESC;
                            dataProduct[0]['stateId'] = responseObj[0].STATEID;
                            var productStore = Ext.create('Ext.data.Store', {
                                autoDestroy: true,
                                fields: ['name', 'value', 'stateId'],
                                data: dataProduct
                            });
                            Ext.getCmp('stateCombo').clearValue();
                            Ext.getCmp('stateCombo').bindStore(productStore);
                            Ext.getCmp('stateCombo').setValue(responseObj[0].ContactDetails.Address[0].STATEDESC);
                            var dataProduct = null;

                            var dataProduct = new Array();
                            dataProduct[0] = new Array();
                            dataProduct[0]['name'] = responseObj[0].ContactDetails.Address[0].COUNTRYDESC;
                            dataProduct[0]['value'] = responseObj[0].ContactDetails.Address[0].COUNTRYDESC;
                            dataProduct[0]['countryId'] = responseObj[0].COUNTRYID;
                            var productStore = Ext.create('Ext.data.Store', {
                                autoDestroy: true,
                                fields: ['name', 'value', 'countryId'],
                                data: dataProduct
                            });
                            Ext.getCmp('countryCombo').clearValue();
                            Ext.getCmp('countryCombo').bindStore(productStore);
                            Ext.getCmp('countryCombo').setValue(responseObj[0].ContactDetails.Address[0].COUNTRYDESC);
                            var dataProduct = null;

                            var dataProduct = new Array();
                            dataProduct[0] = new Array();
                            dataProduct[0]['name'] = responseObj[0].ContactDetails.Address[0].CITYDESC;
                            dataProduct[0]['value'] = responseObj[0].ContactDetails.Address[0].CITYDESC;
                            dataProduct[0]['cityId'] = responseObj[0].CITYID;
                            var productStore = Ext.create('Ext.data.Store', {
                                autoDestroy: true,
                                fields: ['name', 'value', 'cityId'],
                                data: dataProduct
                            });
                            Ext.getCmp('cityCombo').clearValue();
                            Ext.getCmp('cityCombo').bindStore(productStore);
                            Ext.getCmp('cityCombo').setValue(responseObj[0].ContactDetails.Address[0].CITYDESC);

                            Ext.getCmp('languageCombo').setValue(responseObj[0].CONTLANGID);
                        }
                    }
                    else
                    {
                        customerName = "";
                        Ext.getCmp('primaryNumber').setValue(phoneNumber);
                        var dataContact = new Array();
                        dataContact[0] = new Array();
                        dataContact[0]['name'] = "PRIMARY";
                        dataContact[0]['value'] = phoneNumber.toString();
                        var contactStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['name', 'value'],
                            data: dataContact
                        });
                        Ext.getCmp('primaryContact').clearValue();
                        Ext.getCmp('primaryContact').bindStore(contactStore);
                        Ext.getCmp('primaryContact').setValue(phoneNumber.toString());
                        var tmpHtml = '<table id="contactContainerTbl" class="customerDeatail" cellspacing="0" cellpadding="0">';
                        tmpHtml += '<tr><td>'+phoneNumber+'</td><td class="PRIMARY">PRIMARY</td></tr>';
                        tmpHtml += '</table>';
                        Ext.getDom('contactContainer').innerHTML = tmpHtml;
                    }
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadAllProducts: function(){
            allProductResults = {};
            selectedProductId = "";
            Ext.Ajax.request({
                url: '/crm/api/product',
                success: function(response, opts){
                    allProductResults = Ext.decode(response.responseText);
                   // selectedProductId = allProductResults[0].PRODID;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadLanguages: function(comboEle){
            Ext.Ajax.request({
                url: '/crm/api/getLanguages',
                success: function (response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var dataLang = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataLang[i] = new Array();
                        dataLang[i]['name'] = responseObj[i].LANGDESC;
                        dataLang[i]['value'] = responseObj[i].LANGID;
                    }
                    var langStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataLang
                    });
                    Ext.getCmp(comboEle).clearValue();
                    Ext.getCmp(comboEle).bindStore(langStore);
                    Ext.getCmp(comboEle).setValue(responseObj[0].LANGID);
                }
            });
        },
        getCustomerByOrder: function (orderRef){
            Ext.Ajax.request({
                url: '/crm/api/getCustomerByOrder/'+orderRef,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    editOrderRef = orderRef;
                    Ext.getCmp('nameTitle').setValue(responseObj.TITLE);
                    Ext.getCmp('contactGender').setValue(responseObj.GENDER);
                    Ext.getCmp('contRefIdEdit').setValue(responseObj.CONTREF);
                    Ext.getCmp('nameEdit').setValue(responseObj.CONTNAME);
                    if(responseObj.Email.length > 0) {
                        Ext.getCmp('contactEmail').setValue(responseObj.Email[0]);
                    }
                    Ext.getCmp('primaryNumber').setValue(responseObj.PRIMARYCONTACT);

                    var dataProduct = new Array();
                    dataProduct[0] = new Array();
                    dataProduct[0]['name'] = responseObj.CONTLANGDESC;
                    dataProduct[0]['value'] = responseObj.CONTLANGID;
                    var productStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataProduct
                    });
                    Ext.getCmp('contactLanguageCombo').clearValue();
                    Ext.getCmp('contactLanguageCombo').bindStore(productStore);
                    Ext.getCmp('contactLanguageCombo').setValue(responseObj.CONTLANGID);
                    if(responseObj.ContactDetails.Address.length > 0) {
                        Ext.getCmp('pincode').setValue(responseObj.ContactDetails.Address[0].PINCODE);
                        Ext.getCmp('address1').setValue(responseObj.ContactDetails.Address[0].ADD1);
                        Ext.getCmp('address2').setValue(responseObj.ContactDetails.Address[0].ADD2);
                        var dataProduct = new Array();
                        dataProduct[0] = new Array();
                        dataProduct[0]['name'] = responseObj.ContactDetails.Address[0].ADD3;
                        dataProduct[0]['value'] = responseObj.ContactDetails.Address[0].ADD3;
                        var productStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['name', 'value'],
                            data: dataProduct
                        });
                        Ext.getCmp('address3').clearValue();
                        Ext.getCmp('address3').bindStore(productStore);
                        Ext.getCmp('address3').setValue(responseObj.ContactDetails.Address[0].ADD3);
                        var dataProduct = new Array();
                        dataProduct[0] = new Array();
                        dataProduct[0]['name'] = responseObj.ContactDetails.Address[0].COUNTRYDESC;
                        dataProduct[0]['value'] = responseObj.ContactDetails.Address[0].COUNTRYDESC;
                        dataProduct[0]['countryId'] = responseObj.COUNTRYID;
                        var productStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['name', 'value', 'countryId'],
                            data: dataProduct
                        });
                        Ext.getCmp('contactCountry').clearValue();
                        Ext.getCmp('contactCountry').bindStore(productStore);
                        Ext.getCmp('contactCountry').setValue(responseObj.ContactDetails.Address[0].COUNTRYDESC);
                        var dataProduct = new Array();
                        dataProduct[0] = new Array();
                        dataProduct[0]['name'] = responseObj.ContactDetails.Address[0].STATEDESC;
                        dataProduct[0]['value'] = responseObj.ContactDetails.Address[0].STATEDESC;
                        dataProduct[0]['stateId'] = responseObj.STATEID;
                        var productStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['name', 'value', 'stateId'],
                            data: dataProduct
                        });
                        Ext.getCmp('contactState').clearValue();
                        Ext.getCmp('contactState').bindStore(productStore);
                        Ext.getCmp('contactState').setValue(responseObj.ContactDetails.Address[0].STATEDESC);
                        var dataProduct = new Array();
                        dataProduct[0] = new Array();
                        dataProduct[0]['name'] = responseObj.ContactDetails.Address[0].CITYDESC;
                        dataProduct[0]['value'] = responseObj.ContactDetails.Address[0].CITYDESC;
                        dataProduct[0]['cityId'] = responseObj.CITYID;
                        var productStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: ['name', 'value', 'cityId'],
                            data: dataProduct
                        });
                        Ext.getCmp('contactCity').clearValue();
                        Ext.getCmp('contactCity').bindStore(productStore);
                        Ext.getCmp('contactCity').setValue(responseObj.ContactDetails.Address[0].CITYDESC);
                    }

                    var tmpHtml = '<table id="phoneDetailscontactContainerTbl" class="customerDeatail" cellspacing="0" cellpadding="0">';
                    tmpHtml += '<tr><td>'+responseObj.PRIMARYCONTACT+'</td><td class="PRIMARY">PRIMARY</td></tr>';
                    var dataContact = new Array();
                    dataContact[0] = new Array();
                    dataContact[0]['name'] = 'PRIMARY';
                    dataContact[0]['value'] = responseObj.PRIMARYCONTACT;
                    var contactCounter = 1;
                    var contactCount = 1;
                    for(var i=contactCount; i<(responseObj.ACTIVECONTACT.length+contactCount); i++){
                        dataContact[i] = new Array();
                        dataContact[i]['name'] = 'ACTIVE';
                        dataContact[i]['value'] = responseObj.ACTIVECONTACT[i-contactCount];
                        tmpHtml += '<tr><td>'+responseObj.ACTIVECONTACT[i-contactCount]+'</td><td class="ACTIVE">ACTIVE</td></tr>';
                        contactCounter++;
                    }
                    contactCount = contactCounter;
                    for(var i=contactCount; i<(responseObj.INACTIVE.length+contactCount); i++){
                        dataContact[i] = new Array();
                        dataContact[i]['name'] = 'INACTIVE';
                        dataContact[i]['value'] = responseObj.INACTIVE[i-contactCount];
                        tmpHtml += '<tr><td>'+responseObj.INACTIVE[i-contactCount]+'</td><td class="INACTIVE">INACTIVE</td></tr>';
                        contactCounter++;
                    }
                    contactCount = contactCounter;
                    for(var i=contactCount; i<(responseObj.INVALIDCONTACT.length+contactCount); i++){
                        dataContact[i] = new Array();
                        dataContact[i]['name'] = 'INVALID';
                        dataContact[i]['value'] = responseObj.INVALIDCONTACT[i-contactCount];
                        tmpHtml += '<tr><td>'+responseObj.INVALIDCONTACT[i-contactCount]+'</td><td class="INVALID">INVALID</td></tr>';
                        contactCounter++;
                    }
                    var contactStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataContact
                    });
                    Ext.getCmp('phoneDetailsprimaryContact').clearValue();
                    Ext.getCmp('phoneDetailsprimaryContact').bindStore(contactStore);
                    Ext.getCmp('phoneDetailsprimaryContact').setValue(responseObj.PRIMARYCONTACT);
                    tmpHtml += '</table>';
                    Ext.getDom('phoneDetailscontactContainer').innerHTML = tmpHtml;
                    if(editOrderCallFlag){
                        CrmApp.controller.CRMController.loadCallKey(responseObj.PRIMARYCONTACT);
                    }
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        getOrderDetail: function (orderRef){
            Ext.Ajax.request({
                url: '/crm/api/orders/'+orderRef,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    Ext.getCmp('deliveryAddrLine1').setValue(responseObj.DELVADD1);
                    Ext.getCmp('deliveryAddrLine2').setValue(responseObj.DELVADD2);
                    Ext.getCmp('deliveryAddrLine3').setValue(responseObj.DELVADD3);
                    Ext.getCmp('deliveryPinCode').setValue(responseObj.DELVPINCODE);
                    var dataProduct = null;
                    var dataProduct = new Array();
                    dataProduct[0] = new Array();
                    dataProduct[0]['name'] = responseObj.DELVSTATE;
                    dataProduct[0]['value'] = responseObj.DELVSTATE;
                    var productStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataProduct
                    });
                    Ext.getCmp('deliveryState').clearValue();
                    Ext.getCmp('deliveryState').bindStore(productStore);
                    Ext.getCmp('deliveryState').setValue(responseObj.DELVSTATE);
                    var dataProduct = null;

                    var dataProduct = new Array();
                    dataProduct[0] = new Array();
                    dataProduct[0]['name'] = responseObj.DELVCOUNTRY;
                    dataProduct[0]['value'] = responseObj.DELVCOUNTRY;
                    dataProduct[0]['countryId'] = responseObj.DELVCOUNTRY;
                    var productStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'countryId'],
                        data: dataProduct
                    });
                    Ext.getCmp('deliveryCountry').clearValue();
                    Ext.getCmp('deliveryCountry').bindStore(productStore);
                    Ext.getCmp('deliveryCountry').setValue(responseObj.DELVCOUNTRY);
                    var dataProduct = null;

                    var dataProduct = new Array();
                    dataProduct[0] = new Array();
                    dataProduct[0]['name'] = responseObj.DELVCITY;
                    dataProduct[0]['value'] = responseObj.DELVCITY;
                    var productStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataProduct
                    });
                    Ext.getCmp('deliveryCity').clearValue();
                    Ext.getCmp('deliveryCity').bindStore(productStore);
                    Ext.getCmp('deliveryCity').setValue(responseObj.DELVCITY);
                    var dataProduct = null;

                    var dataProduct = new Array();
                    dataProduct[0] = new Array();
                    dataProduct[0]['name'] = responseObj.DELVADD3;
                    dataProduct[0]['value'] = responseObj.DELVADD3;
                    var productStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataProduct
                    });
                    Ext.getCmp('deliveryAddrLine3').clearValue();
                    Ext.getCmp('deliveryAddrLine3').bindStore(productStore);
                    Ext.getCmp('deliveryAddrLine3').setValue(responseObj.DELVADD3);
                    var dataProduct = null;

                    Ext.getCmp('totalDue').setValue(responseObj.BALANCEDUE);
                    Ext.getCmp('netDue').setValue(responseObj.TOTALDUE);
                    //Ext.getCmp('repCombo').setValue(responseObj.USERID);
                    Ext.getCmp('orderStatus').setValue({rbOrderStatus:responseObj.ORDERSTATUS});
                    Ext.getCmp('isAuth').setValue(responseObj.ORDERSTATUS);
                    Ext.getCmp('authReq').setValue(responseObj.APPROVEFORAUTH);

                  //  Ext.getCmp('executionCombo').setValue(responseObj.EXECPOINTID);

                  //  var val1 = Ext.getCmp('orderStatus').getValue().rbOrderStatus;
                    if(responseObj.ORDERSTATUS === "A")
                    {
                        Ext.getCmp('executionCombo').setReadOnly(true);
                        Ext.getCmp('repCombo').setReadOnly(true);
                        Ext.getCmp('courierCombo').disable();
                        Ext.getCmp('orderStatus').disable();
                        Ext.getCmp('editSaveCustomer').disable();
                        Ext.getCmp('editSaveProduct').disable();
                        Ext.getCmp('editSaveDelivery').disable();
                        Ext.getCmp('editSavePayment').disable();
                        Ext.getCmp('editSaveAuthorization').disable();
                        Ext.getCmp('editSavePhoneDetails').disable();
                    }


                    Ext.getCmp('orderStatus').setValue({rbOrderStatus:responseObj.ORDERSTATUS});
                    if(responseObj.DELVTYPE != null)
                    {
                        Ext.getCmp('delAddress').setValue({rbDelivery:responseObj.DELVTYPE});
                    }
                    var totalPayable = 0;
                    Ext.getCmp('myPaymentDetailPanel').store.removeAll();
                    if(responseObj.PAYMENTLINES.length > 0) {
                        console.log('Inside Payment Line.');
                        for(var i=0; i<responseObj.PAYMENTLINES.length; i++){
                            responseObj.PAYMENTLINES[i]['ISNEW'] = false;
                            Ext.getCmp('myPaymentDetailPanel').store.add(responseObj.PAYMENTLINES[i]);
                            totalPayable += parseFloat(responseObj.PAYMENTLINES[i].PAYMENTAMOUNT);
                        }
                    }
                    Ext.getCmp('totalPayable').setValue(totalPayable);
                    Ext.getCmp('grossPayment').setValue(totalPayable);
                    Ext.getCmp('paymentAmount').setValue(parseFloat(responseObj.TOTALDUE)-totalPayable);
                    Ext.getCmp('authorizationRemarks').setValue(responseObj.AUTHREMARKS);
                    Ext.getCmp('deliveryNotes').setValue(responseObj.DELIVERYREMARKS);

                    Ext.getCmp('myProductDetailPanel').store.removeAll();
                    if(responseObj.ORDERLINES.length > 0) {
                        console.log('Inside Order LIne.');
                        for(var i=0; i<responseObj.ORDERLINES.length; i++){
                            responseObj.ORDERLINES[i]['ISNEW'] = false;
                            Ext.getCmp('myProductDetailPanel').store.add(responseObj.ORDERLINES[i]);
                        }
                    }


                    CrmApp.view.AuthorizationForm.loadCourierOptions();
                    CrmApp.view.AuthorizationForm.loadRepOptions();
                    CrmApp.view.AuthorizationForm.loadExecutionOptions(responseObj.EXECPOINTID);
                    CrmApp.view.AuthorizationForm.loadFranchiseOptions();
                    CrmApp.view.AuthorizationForm.loadOnHoldReasons();
                    CrmApp.view.AuthorizationForm.loadBankDetails();


                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        saveEditOrderDetail: function (){
            var editOrderJSON = {};
            var totalDues = 0;
            editOrderJSON['ORDERLINES'] = new Array();
            editOrderJSON['PAYMENTLINES'] = new Array();
            for(var i=0; i<Ext.getCmp('myProductDetailPanel').store.data.items.length; i++){
                editOrderJSON['ORDERLINES'][i] = Ext.getCmp('myProductDetailPanel').store.data.items[i].data;
                editOrderJSON['ORDERLINES'][i]['ORDERREF'] = editOrderRef;
                totalDues = totalDues + Ext.getCmp('myProductDetailPanel').store.data.items[i].data.GROSS;

            }
            for(var i=0; i<Ext.getCmp('myPaymentDetailPanel').store.data.items.length; i++){
                editOrderJSON['PAYMENTLINES'][i] = Ext.getCmp('myPaymentDetailPanel').store.data.items[i].data;
                editOrderJSON['PAYMENTLINES'][i]['ORDERREF'] = editOrderRef;
            }
            var delCombo = Ext.getCmp('deliveryTimeFrame');
            editOrderJSON['ORDERREF'] = editOrderRef;
            editOrderJSON['TOTALDUE'] = totalDues;
            editOrderJSON['ORDERSTATUS'] = Ext.getCmp('orderStatus').getValue().rbOrderStatus;
            if(Ext.getCmp('orderStatus').getValue().rbOrderStatus == 'A')
            {
                var authdate = new Date();
                authdate = authdate.toISOString();
                editOrderJSON['AUTHORIZEDON'] = authdate;
            }
            else if(Ext.getCmp('orderStatus').getValue().rbOrderStatus === 'H')
            {
                editOrderJSON['ONHOLDDESC'] = Ext.getCmp('onHoldReasons').value;
            }
            editOrderJSON['ORDERTIMEFRAME'] = Ext.getCmp('deliveryTimeFrame').value;
            editOrderJSON['ORDERTIMEFRAMEDESC'] = Ext.getCmp('deliveryTimeFrame').rawValue;
            if(delCombo.value != null){
                editOrderJSON['TIMEFRAMEVALUE'] = delCombo.findRecordByValue(delCombo.value).data.mode;
            }
            editOrderJSON['AUTHBYID'] = userObj.USERID;
            editOrderJSON['AUTHBYDESC'] = userObj.USERNAME;
            editOrderJSON['DELVTYPE'] = Ext.getCmp('deliverytype').getValue().delType;
            editOrderJSON['DELVBOYID'] = Ext.getCmp('courierCombo').value;
            editOrderJSON['DELVBOYDESC'] = Ext.getCmp('courierCombo').rawValue;
            editOrderJSON['EXECPOINTID'] = Ext.getCmp('executionCombo').value;
            editOrderJSON['EXECPOINTDESC'] = Ext.getCmp('executionCombo').rawValue;
            editOrderJSON['SUBEXECPOINTID'] = Ext.getCmp('subExecutionCombo').value;
            editOrderJSON['SUBEXECPOINTDESC'] = Ext.getCmp('subExecutionCombo').rawValue;
            editOrderJSON['AUTHREMARKS'] = Ext.getCmp('authorizationRemarks').value;
            var editJsonString = JSON.stringify(editOrderJSON);
            Ext.Msg.confirm("Confirmation", "Do you want to place the modified Order ?", function(btnText){
                if(btnText === "no"){
                    Ext.Msg.alert("Alert", "You have confirmed 'No'.");
                }
                else if(btnText === "yes"){
                    Ext.Ajax.request({
                        url: '/crm/api/order/EditOrder',
                        method: 'PUT',
                        params: {
                            "editJson" : editJsonString
                        },
                        success: function(response, opts){
                            Ext.Msg.alert("Message", "Order has been modified.");
                            editOrderRef = '';
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }, this);
            console.log(editOrderJSON);
        },
        viewCallInfo: function(phoneNumber){
            var win = Ext.widget('window', {
                title: 'View Call Information',
                width: 983,
                height: 458,
                layout: 'fit',
                modal: true,
                items: [
                    {
                        xtype: 'viewCallInfo'
                    }
                ]
            });
            win.show();
            Ext.Ajax.request({
                url: '/crm/api/contact/'+phoneNumber,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    Ext.getCmp('contRefId').setValue(responseObj[0].CONTREF);
                    CrmApp.controller.CRMController.loadCallHistory(responseObj[0].CONTREF);
                    var tmpHtml = '<table class="customerDeatail" cellspacing="0" cellpadding="0">';
                    tmpHtml += '<tr><td>Name:</td><td>'+responseObj[0].TITLE+' '+responseObj[0].CONTNAME+'</td><td>Gender:</td><td>'+responseObj[0].GENDER+'</td></tr>';
                    tmpHtml += '<tr><td>Phone No.:</td><td>'+responseObj[0].PRIMARYCONTACT+'</td><td>Email:</td><td>'+responseObj[0].Email[0]+'</td></tr>';
                    tmpHtml += '<tr><td>Address:</td><td colspan="3">'+responseObj[0].ContactDetails.Address[0].ADD1+', '+responseObj[0].ContactDetails.Address[0].ADD2+', '+responseObj[0].ContactDetails.Address[0].ADD3+'<br/>'+responseObj[0].ContactDetails.Address[0].CITYDESC+', '+responseObj[0].ContactDetails.Address[0].STATEDESC+', '+responseObj[0].ContactDetails.Address[0].COUNTRYDESC+' - '+responseObj[0].ContactDetails.Address[0].PINCODE+'</td></tr>';
                    tmpHtml += '<tr><td>Language:</td><td colspan="3">'+responseObj[0].CONTLANGDESC+'</td></tr>';
                    tmpHtml += '</table>';
                    Ext.DomHelper.append(Ext.getDom('callInfoDetails-innerCt'), {
                        tag: 'div',
                        html: tmpHtml
                    }, true);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });

        },
        saveEditCustomerDetails: function(){
            var formJson = {};
            formJson['CONTNAME'] = Ext.getCmp('nameEdit').value;
            formJson['TITLE'] = Ext.getCmp('nameTitle').value;
            formJson['GENDER'] = Ext.getCmp('contactGender').value;
            formJson['Email'] = new Array();
            if(Ext.getCmp('contactEmail').value != null) {
                formJson['Email'].push(Ext.getCmp('contactEmail').value);
            }
            formJson['ContactDetails'] = {};
            formJson['ContactDetails']['Address'] = new Array();
            formJson['ContactDetails']['Address'][0] = {};
            formJson['ContactDetails']['Address'][0]['ADD1'] = Ext.getCmp('address1').value;
            formJson['ContactDetails']['Address'][0]['ADD2'] = Ext.getCmp('address2').value;
            formJson['ContactDetails']['Address'][0]['ADD3'] = Ext.getCmp('address3').value;
            formJson['ContactDetails']['Address'][0]['PINCODE'] = Ext.getCmp('pincode').rawValue;
            formJson['ContactDetails']['Address'][0]['STATEDESC'] = Ext.getCmp('contactState').value;
            formJson['ContactDetails']['Address'][0]['COUNTRYDESC'] = Ext.getCmp('contactCountry').value;
            formJson['ContactDetails']['Address'][0]['CITYDESC'] = Ext.getCmp('contactCity').value;

            formJson['STATEID'] = Ext.getCmp('contactState').findRecordByValue(Ext.getCmp('contactState').value).data.stateId;
            formJson['COUNTRYID'] = Ext.getCmp('contactCountry').findRecordByValue(Ext.getCmp('contactCountry').value).data.countryId;
            formJson['CITYID'] = Ext.getCmp('contactCity').findRecordByValue(Ext.getCmp('contactCity').value).data.cityId;

            formJson['CONTLANGDESC'] = Ext.getCmp('contactLanguageCombo').rawValue;
            formJson['CONTLANGID'] = Ext.getCmp('contactLanguageCombo').value;

            formJson['PRIMARYCONTACT'] = Ext.getCmp('primaryNumber').value;
            formJson['ACTIVECONTACT'] = new Array();
            formJson['INVALIDCONTACT'] = new Array();
            formJson['INACTIVE'] = new Array();

            for(var i=0; i<Ext.getCmp('phoneDetailsprimaryContact').store.data.items.length; i++){
                if(Ext.getCmp('phoneDetailsprimaryContact').store.data.items[i].data.name === 'ACTIVE'){
                    formJson['ACTIVECONTACT'].push(Ext.getCmp('phoneDetailsprimaryContact').store.data.items[i].data.value);
                }
                if(Ext.getCmp('phoneDetailsprimaryContact').store.data.items[i].data.name === 'INVALID'){
                    formJson['INVALIDCONTACT'].push(Ext.getCmp('phoneDetailsprimaryContact').store.data.items[i].data.value);
                }
                if(Ext.getCmp('phoneDetailsprimaryContact').store.data.items[i].data.name === 'INACTIVE'){
                    formJson['INACTIVE'].push( Ext.getCmp('phoneDetailsprimaryContact').store.data.items[i].data.value);
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

            formJson['CONTREF'] = Ext.getCmp('contRefIdEdit').value;
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
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});

function linktoDetails(desc, callkey){
    var formatString = '<a id = "disposition_' + callkey +'" href="javascript:void(0);" onClick="javascript:loadCallDispositionDetails(this.id);">'+ desc +'</a>';
    return formatString;
}

function loadCallDispositionDetails(callKey){
    var tmpCallKey = callKey.split('disposition_')[1];
    if(Ext.getDom('details_'+callKey) == null){
        Ext.Ajax.request({
            url: '/crm/api/call/' + tmpCallKey,
            success: function (response, opts) {
                var responseObj = Ext.decode(response.responseText);
                var products = "";
                if(responseObj.DISPO[0].PRODUCTS != undefined){
                    for(var i = 0; i < responseObj.DISPO[0].PRODUCTS.length ; i++){
                        products =  products.concat(JSON.stringify(responseObj.DISPO[0].PRODUCTS) == undefined ? "" : '</br>' + responseObj.DISPO[0].PRODUCTS[i].PRODDESC);
                    }
                }
                var remarks = JSON.stringify(responseObj.REMARKS) == undefined ? "" : '</br>' + "Note:"+ responseObj.REMARKS ;
                var freeGiftOffer = JSON.stringify(responseObj.DISPO[0].FREEGIFTOFFER) == undefined ? "" : '</br>' + "Gift:"+ responseObj.DISPO[0].FREEGIFTOFFER ;
                var offerPrice = JSON.stringify(responseObj.DISPO[0].OFFERPRICE) == undefined ? "" : '</br>' + "Offer Price:"+responseObj.DISPO[0].OFFERPRICE ;

                Ext.DomHelper.append(Ext.getDom(callKey).parentNode, {
                    tag: 'div',
                    id: 'details_'+callKey,
                    html: products + '</br>' + remarks + freeGiftOffer + offerPrice
                }, true);

            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
}

Ext.apply(Ext.form.field.VTypes, {
    daterange: function(val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    }
});