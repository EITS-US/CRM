Ext.define('CrmApp.view.ComplaintsSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.complaintsSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.ComplaintsSearchFormPanel.loadPayModes();
            CrmApp.view.ComplaintsSearchFormPanel.setComplaintForm();
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
                width: 120,
                margin: '0 0 0 0',
                height: 100,
                items: [
                    {
                        xtype: 'radio',
                        checked: true,
                        boxLabel: 'Pending',
                        name: 'complaintState',
                        inputValue: 'P'
                    },
                    {
                        xtype: 'radio',
                        boxLabel: 'Completed',
                        name: 'complaintState',
                        inputValue: 'C'
                    },
                    {
                        xtype: 'radio',
                        boxLabel: 'All',
                        name: 'complaintState',
                        inputValue: 'A'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Params',
                layout: 'vbox',
                width: 510,
                margin: '0 0 0 10',
                bodyPadding: 0,
                height: 100,
                items: [
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Complaint No.',
                                name: 'complaintNumber',
                                id: 'complaintNumber',
                                labelWidth : 91
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Order Ref. No.',
                                name: 'orderRefNumber',
                                id: 'orderRefNumber',
                                labelWidth : 91,
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
                                fieldLabel: 'Customer Name',
                                name: 'customerName',
                                id: 'customerName',
                                labelWidth : 91,
                                margins: '5 0 0 0'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Phone No.',
                                name: 'complainphoneNumber',
                                id: 'complainphoneNumber',
                                labelWidth : 91,
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
                                xtype: 'checkboxfield',
                                name: 'payModeCheck',
                                id: 'payModeCheck',
                                margins: '5 0 0 0'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Pay Mode',
                                name: 'payMode',
                                id: 'payMode',
                                labelWidth : 68,
                                margins: '5 0 0 10',
                                displayField: 'name',
                                valueField: 'PAYMODEID',
                                queryMode: 'local',
                                mode: 'local',
                                triggerAction: 'all',
                                forceSelection: true,
                                editable: false,
                                listeners: {
                                    select: function (comp, record, index) {
                                        if (comp.getValue() === -1){
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
                width: 330,
                margin: '0 0 0 10',
                height: 100,
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
                margin: '42 0 0 10',
                handler: function () {
                    complaintFormObj.complaintNumber = Ext.getCmp('complaintNumber').value;
                    complaintFormObj.orderRefNumber = Ext.getCmp('orderRefNumber').value;
                    complaintFormObj.customerName = Ext.getCmp('customerName').value;
                    complaintFormObj.complainphoneNumber = Ext.getCmp('complainphoneNumber').value;
                    complaintFormObj.payModeCheck = Ext.getCmp('payModeCheck').value;
                    complaintFormObj.payMode = Ext.getCmp('payMode').value;
                    complaintFormObj.startDate = Ext.getCmp('startDate').getValue();
                    complaintFormObj.endDate = Ext.getCmp('endDate').getValue();
                    if(complaintFormObj.startDate !== null && complaintFormObj.endDate !== null){
                        CrmApp.view.ComplaintsSearchFormPanel.searchComplainDetails();
                    }
                }
            },
            {
                xtype: 'button',
                iconCls: 'exportToExcelBtn',
                text: 'Export to Excel',
                width: 110,
                margin: '42 0 0 10',
                handler: function () {

                }
            }
        ];
    },
    statics: {
        setComplaintForm: function(){
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=complaintState]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=complaintState]')[i].inputValue == complaintFormObj.complaintState){
                    Ext.ComponentQuery.query('radio[name=complaintState]')[i].setValue(true);
                }
            }
            if(complaintFormObj.complaintNumber !== undefined){
                Ext.getCmp('complaintNumber').setValue(complaintFormObj.complaintNumber);
            }
            if(complaintFormObj.orderRefNumber !== undefined){
                Ext.getCmp('orderRefNumber').setValue(complaintFormObj.orderRefNumber);
            }
            if(complaintFormObj.customerName !== undefined){
                Ext.getCmp('customerName').setValue(complaintFormObj.customerName);
            }
            if(complaintFormObj.complainphoneNumber !== undefined){
                Ext.getCmp('complainphoneNumber').setValue(complaintFormObj.complainphoneNumber);
            }
            Ext.getCmp('payModeCheck').setValue(complaintFormObj.payModeCheck);
            if(complaintFormObj.payMode !== undefined){
                Ext.getCmp('payMode').setValue(complaintFormObj.payMode);
            }
            if(complaintFormObj.startDate !== undefined){
                Ext.getCmp('startDate').setValue(complaintFormObj.startDate);
            }
            if(complaintFormObj.endDate !== undefined){
                Ext.getCmp('endDate').setValue(complaintFormObj.endDate);
            }
        },
        searchComplainDetails: function () {
            var searchJson = '{"REPORTTYPE":"complaint",';
            var searchType = 'pending';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=complaintState]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=complaintState]')[i].getValue() == true){
                    searchType = Ext.ComponentQuery.query('radio[name=complaintState]')[i].inputValue;
                }
            }
            complaintFormObj.complaintState = searchType;
            searchJson += '"SEARCHTYPE":"'+searchType+'",';
            var searchDate = 'calldate';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=complaintSearchDate]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].getValue() == true){
                    searchDate = Ext.ComponentQuery.query('radio[name=complaintSearchDate]')[i].inputValue;
                }
            }
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
            var callerNo = Ext.ComponentQuery.query('textfield[name=complainphoneNumber]')[0].value;
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
            searchJson += '"USERNAME":"' + userObj.USERNAME+'",';
            searchJson += '"ROLE":""';
            searchJson += '}';
            console.log(searchJson);
           // alert(searchJson);
            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.ComplaintDetail',
                proxy: {
                    type: 'ajax',
                    // url: '/crm/api/call?Search={"CALLERNO": "9953008767","LINEID":"123456"}',
                    url: '/crm/api/getComplainDetails?Search='+searchJson,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('complaintDetailGridPanel').bindStore(store);
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
                }
            });
        }
    }

});