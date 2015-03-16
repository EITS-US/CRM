Ext.define('CrmApp.view.AdvanceBookingSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AdvanceBookingSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.AdvanceBookingSearchFormPanel.setAdvanceBookingForm();
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
                width: 210,
                margin: '0 0 0 10',
                height: 78,
                items: [
                    {
                        xtype: 'radio',
                        checked: true,
                        boxLabel: 'Call Date',
                        name: 'advancebookingSearchDate',
                        inputValue: 'callDate'
                    },
                    {
                        xtype: 'radio',
                        boxLabel: 'CallBack Date',
                        name: 'advancebookingSearchDate',
                        inputValue: 'callBackDate'
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
                       // allowBlank: false,
                        labelWidth : 30,
                        width: 290
                    }
                ]
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'Find',
               // formBind: true,
                width: 60,
                margin: '30 0 0 10',
                handler: function () {
                    advBookFormObj.startDate = Ext.getCmp('startDate').getValue();
                    advBookFormObj.endDate = Ext.getCmp('endDate').getValue();
                    if(advBookFormObj.startDate !== null && advBookFormObj.endDate !== null) {
                        CrmApp.view.AdvanceBookingSearchFormPanel.searchAdvanceBookingDetails();
                    }
                }
            }
        ];
    },
    statics: {
        setAdvanceBookingForm: function(){
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=advancebookingSearchDate]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=advancebookingSearchDate]')[i].inputValue == advBookFormObj.advancebookingSearchDate){
                    Ext.ComponentQuery.query('radio[name=advancebookingSearchDate]')[i].setValue(true);
                }
            }
            if(advBookFormObj.startDate !== undefined){
                Ext.getCmp('startDate').setValue(advBookFormObj.startDate);
            }
            if(advBookFormObj.endDate !== undefined){
                Ext.getCmp('endDate').setValue(advBookFormObj.endDate);
            }
        },
        searchAdvanceBookingDetails: function () {
            var searchJson = '{"REPORTTYPE":"advanceBooking",';

            var searchDate = 'calldate';
            for(var i=0; i<Ext.ComponentQuery.query('radio[name=advancebookingSearchDate]').length; i++){
                if(Ext.ComponentQuery.query('radio[name=advancebookingSearchDate]')[i].getValue() == true){
                    searchDate = Ext.ComponentQuery.query('radio[name=advancebookingSearchDate]')[i].inputValue;
                }
            }
            advBookFormObj.advancebookingSearchDate = searchDate;
            //  searchDate = searchDate.toISOString();
            searchJson += '"SEARCHDATE":"'+searchDate+'",';



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
            //console.log(searchJson);
            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'CrmApp.model.AdvanceBookingDetail',
                proxy: {
                    type: 'ajax',
                    // url: '/crm/api/call?Search={"CALLERNO": "9953008767","LINEID":"123456"}',
                    url: '/crm/api/call?Search='+searchJson,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('advanceBookingDetailGridPanel').bindStore(store);

        }

    }
});