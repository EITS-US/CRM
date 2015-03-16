Ext.define('CrmApp.view.CallSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.callSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
	layout: 'hbox',
	width: 'auto',
	border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.CallSearchFormPanel.setCallSearchForm();
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
                title: 'Search Date',
                layout: 'vbox',
                width: 180,
                margin: '0 0 0 0',
                height: 78,
                items: [
                    {
                        xtype: 'radio',
                        checked: true,
                        boxLabel: 'Call Date',
                        name: 'dateOption',
                        inputValue: 'current'
                    }, {
                        xtype: 'radio',
                        boxLabel: 'Adv. Booking Date',
                        name: 'dateOption',
                        inputValue: 'advance'
                    }]
            },
            {
				xtype: 'textfield',
				fieldLabel: 'Phone Number',
				name: 'searchPhoneNumber',
                id: 'callSearchPhoneNumber',
				minLength: 10,
				margin: '30 0 0 10'
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
                        fieldLabel: 'From',
                        name: 'startDate',
                        id: 'startDate',
                        margin: '0 0 5 0',
                        labelWidth: 60,
                        width: 290
                    },
                    {
                        xtype: 'xdatetime',
                        fieldLabel: 'To',
                        name: 'endDate',
                        id: 'endDate',
                        labelWidth : 60,
                        width: 290
                    }
				]
			},
			{
				xtype: 'button',
				iconCls: 'searchBtn',
				text: 'Find',
				width: 60,
                formBind: true,
				margin: '30 0 0 10',
				handler: function () {
                    callSearchFormObj.callSearchPhoneNumber = Ext.getCmp('callSearchPhoneNumber').value;
                    callSearchFormObj.startDate = Ext.getCmp('startDate').getValue();
                    callSearchFormObj.endDate = Ext.getCmp('endDate').getValue();
                    if(callSearchFormObj.startDate !== null && callSearchFormObj.endDate !== null) {
                        CrmApp.view.CallSearchFormPanel.searchCallDetails();
                    }
				}
			}
        ];
    },
    statics: {
        setCallSearchForm: function(){
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=dateOption]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=dateOption]')[i].inputValue == callSearchFormObj.dateOption){
                    Ext.ComponentQuery.query('radio[name=dateOption]')[i].setValue(true);
                }
            }
            if(callSearchFormObj.callSearchPhoneNumber !== undefined){
                Ext.getCmp('callSearchPhoneNumber').setValue(callSearchFormObj.callSearchPhoneNumber);
            }
            if(callSearchFormObj.startDate !== undefined){
                Ext.getCmp('startDate').setValue(callSearchFormObj.startDate);
            }
            if(callSearchFormObj.endDate !== undefined){
                Ext.getCmp('endDate').setValue(callSearchFormObj.endDate);
            }
        },
        searchCallDetails: function () {
            var searchJson = '{"REPORTTYPE":"calls",';
            var callType = 'current';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=dateOption]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=dateOption]')[i].getValue() == true){
                    callType = Ext.ComponentQuery.query('radio[name=dateOption]')[i].inputValue;
                }
            }
            callSearchFormObj.dateOption = callType;
            searchJson += '"CALLTYPE":"'+callType+'",';
            var callerNo = Ext.ComponentQuery.query('textfield[name=searchPhoneNumber]')[0].value;
            if(callerNo != ""){
                searchJson += '"CALLERNO":"'+callerNo+'",';
            }
            else{
                searchJson += '"CALLERNO":null,';
            }
            var startDate = Ext.getCmp('startDate').getValue();
            startDate = startDate.toISOString();
            searchJson += '"DATEFROM":"'+startDate+'",';
            var endDate = Ext.getCmp('endDate').getValue();
            endDate = endDate.toISOString();
            searchJson += '"DATETO":"'+endDate+'",';
            searchJson += '"USERNAME":"' + userObj.USERNAME+'",';
            searchJson += '"ROLE":""';
            searchJson += '}';
            //console.log(searchJson);
            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.CallDetail',
                proxy: {
                    type: 'ajax',
                   // url: '/crm/api/call?Search={"CALLERNO": "9953008767","LINEID":"123456"}',
                    url: '/crm/api/call?Search='+searchJson,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('callsDetailGridPanel').bindStore(store);
        }
    }
});