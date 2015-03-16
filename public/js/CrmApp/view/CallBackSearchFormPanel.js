Ext.define('CrmApp.view.CallBackSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.callBackSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.CallBackSearchFormPanel.setCallBackForm();
        }
    },
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype: 'fieldset',
                title: 'Search',
                layout: 'vbox',
                width: 180,
                margin: '0 0 0 0',
                height: 75,
                items: [
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'radio',
                                checked: true,
                                boxLabel: 'Pending',
                                name: 'callBackState',
                                inputValue: 'pending',
                                width : 68
                            },
                            {
                                xtype: 'radio',
                                boxLabel: 'Completed',
                                name: 'callBackState',
                                inputValue: 'completed',
                                width : 100
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
                                xtype: 'radio',
                                boxLabel: 'All',
                                name: 'callBackState',
                                inputValue: 'all'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Search Date',
                layout: 'vbox',
                width: 110,
                margin: '0 0 0 10',
                height: 75,
                items: [
                    {
                        xtype: 'radio',
                        checked: true,
                        boxLabel: 'Call Date',
                        name: 'complaintSearchDate',
                        inputValue: 'callDate'
                    },
                    {
                        xtype: 'radio',
                        boxLabel: 'CallBack Date',
                        name: 'complaintSearchDate',
                        inputValue: 'callBackDate'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Params',
                layout: 'vbox',
                width: 265,
                margin: '0 0 0 10',
                height: 75,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Customer Name',
                        name: 'customerName',
                        id: 'callBackCustomerName',
                        labelWidth : 91
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Phone No.',
                        name: 'callbackPhoneNumber',
                        id: 'callbackPhoneNumber',
                        labelWidth : 91
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Date Range',
                layout: 'vbox',
                width: 330,
                margin: '0 0 0 10',
                height: 78,
                items: [
                    {
                        xtype: 'xdatetime',
                        name: 'startDate',
                        itemId: 'startDate',
                        vtype: 'daterange',
                        id: 'startDate',
                        endDateField: 'endDate', // id of the end date field
                        fieldLabel: 'From',
                        margin: '0 0 5 0',
                      //  allowBlank: false,
                        labelWidth : 30,
                        width: 290
                    },
                    {
                        xtype: 'xdatetime',
                        name: 'endDate',
                        id: 'endDate',
                        itemId: 'endDate',
                        vtype: 'daterange',
                        startDateField: 'startDate', // id of the end date field
                        fieldLabel: 'To',
                     //   allowBlank: false,
                        labelWidth : 30,
                        width: 290
                    }
                ]
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'Find',
                width: 60,
                margin: '30 0 0 10',
                formBind: true,
                handler: function () {
                    callBackFormObj.callBackCustomerName = Ext.getCmp('callBackCustomerName').value;
                    callBackFormObj.callbackPhoneNumber = Ext.getCmp('callbackPhoneNumber').value;
                    callBackFormObj.startDate = Ext.getCmp('startDate').getValue();
                    callBackFormObj.endDate = Ext.getCmp('endDate').getValue();
                    if(callBackFormObj.startDate !== null && callBackFormObj.endDate !== null) {
                        CrmApp.view.CallBackSearchFormPanel.searchCallBackDetails();
                    }
                }
            }/*,
            {
                xtype: 'button',
                iconCls: 'greenbutton',
                text: 'Make Call',
                width: 80,
                margin: '30 0 0 10',
                handler: function () {
                    alert('true');
                }
            }*/
        ];
    },
    statics: {
        setCallBackForm: function(){
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=callBackState]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=callBackState]')[i].inputValue == callBackFormObj.callBackState){
                    Ext.ComponentQuery.query('radio[name=callBackState]')[i].setValue(true);
                }
            }
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=complaintSearchDate]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].inputValue == callBackFormObj.complaintSearchDate){
                    Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].setValue(true);
                }
            }
            if(callBackFormObj.callBackCustomerName !== undefined){
                Ext.getCmp('callBackCustomerName').setValue(callBackFormObj.callBackCustomerName);
            }
            if(callBackFormObj.callbackPhoneNumber !== undefined){
                Ext.getCmp('callbackPhoneNumber').setValue(callBackFormObj.callbackPhoneNumber);
            }
            if(callBackFormObj.startDate !== undefined){
                Ext.getCmp('startDate').setValue(callBackFormObj.startDate);
            }
            if(callBackFormObj.endDate !== undefined){
                Ext.getCmp('endDate').setValue(callBackFormObj.endDate);
            }
        },
        searchCallBackDetails: function () {
            var searchJson = '{"REPORTTYPE":"callback",';
            var searchType = 'pending';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=callBackState]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=callBackState]')[i].getValue() == true){
                    searchType = Ext.ComponentQuery.query('radio[name=callBackState]')[i].inputValue;
                }
            }
            callBackFormObj.callBackState = searchType;
            searchJson += '"SEARCHTYPE":"'+searchType+'",';
            var searchDate = 'calldate';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=complaintSearchDate]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].getValue() == true){
                    searchDate = Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].inputValue;
                }
            }
            callBackFormObj.complaintSearchDate = searchDate;
          //  searchDate = searchDate.toISOString();
            searchJson += '"SEARCHDATE":"'+searchDate+'",';
            var customerName = Ext.ComponentQuery.query('textfield[name=customerName]')[0].value;
            if(customerName != ''){

                if(customerName != null )
                {
                    if(customerName != 'undefined')
                    {
                        searchJson += '"CUSTOMERNAME":"'+customerName+'",';

                    }
                }


            }
            /*else{
                searchJson += '"CUSTOMERNAME":null,';
            }*/
            var callerNo = Ext.ComponentQuery.query('textfield[name=callbackPhoneNumber]')[0].value;
            if(callerNo != ""){

                if(callerNo != null )
                {
                    if(callerNo != 'undefined')
                    {
                        searchJson += '"CALLERNO":"'+callerNo+'",';

                    }
                }

            }
            /*else{
                searchJson += '"CALLERNO":null,';
            }*/
            var startDate = Ext.getCmp('startDate').getValue();
            startDate = startDate.toISOString();
            searchJson += '"DATEFROM":"'+startDate+'",';
            var endDate = Ext.getCmp('endDate').getValue();
          //  endDate = endDate.toISOString();
            endDate = endDate.toISOString();
            searchJson += '"DATETO":"'+endDate+'",';
            searchJson += '"USERID":"",';
            searchJson += '"ROLE":""';
            searchJson += '}';
            //console.log(searchJson);
            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.CallBackDetail',
                proxy: {
                    type: 'ajax',
                   // url: '/crm/api/call?Search={"CALLERNO": "9953008767","LINEID":"123456"}',
                   url: '/crm/api/call?Search='+searchJson,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('callBackDetailGridPanel').bindStore(store);

        }
    }
});