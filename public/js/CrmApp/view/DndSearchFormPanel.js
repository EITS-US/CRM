Ext.define('CrmApp.view.DndSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dndSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.DndSearchFormPanel.setDndSearchForm();
        }
    },
    initComponent : function() {
        this.items = this.buildItems();
        this.callParent();
    },
    buildItems : function() {
        return [
            {
                xtype: 'textfield',
                fieldLabel: 'Phone Number',
                name: 'dndSearchPhoneNumber',
                id: 'dndSearchPhoneNumber',
                minLength: 10,
                margin: '30 0 0 0'
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
                        labelWidth : 60,
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
                margin: '30 0 0 10',
                handler: function () {
                    CrmApp.view.DndSearchFormPanel.searchDNDDetails();
                }
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'Approve',
                width: 70,
                margin: '30 0 0 10',
                handler: function () {
                    CrmApp.view.DndSearchFormPanel.updateDNDDetails('A');
                }
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'Reject',
                width: 65,
                margin: '30 0 0 10',
                handler: function () {
                    CrmApp.view.DndSearchFormPanel.updateDNDDetails('R');
                }
            },
            {
                xtype: 'button',
                iconCls: 'searchBtn',
                text: 'View',
                width: 60,
                margin: '30 0 0 10',
                handler: function () {
                    dndSearchFormObj.dndSearchPhoneNumber = Ext.getCmp('dndSearchPhoneNumber').value;
                    dndSearchFormObj.startDate = Ext.getCmp('startDate').getValue();
                    dndSearchFormObj.endDate = Ext.getCmp('endDate').getValue();
                    CrmApp.view.DndSearchFormPanel.viewCallDetails();
                }
            }
        ];
    },
    statics: {
        setDndSearchForm: function(){
            if (dndSearchFormObj.dndSearchPhoneNumber !== undefined) {
                Ext.getCmp('dndSearchPhoneNumber').setValue(dndSearchFormObj.dndSearchPhoneNumber);
            }
            if (dndSearchFormObj.startDate !== undefined) {
                Ext.getCmp('startDate').setValue(dndSearchFormObj.startDate);
            }
            if (dndSearchFormObj.endDate !== undefined) {
                Ext.getCmp('endDate').setValue(dndSearchFormObj.endDate);
            }
        },
        searchDNDDetails: function(){
            var apiUrl = '/crm/api/dndRequests';
            if(Ext.getCmp('dndSearchPhoneNumber').value != '' && Ext.getCmp('dndSearchPhoneNumber').value != undefined){
                apiUrl += '/'+Ext.getCmp('dndSearchPhoneNumber').value;
            }
            var store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                fields: ['CONTREF', 'USERID', 'LANGID', 'TEAMID', 'SUBTEAMID', 'USERNAME', 'TEAMNAME', 'SUBTEAMNAME', 'CONTNAME', 'PHONENO', 'LANGDESC', 'DNDREASON', 'DNDREMARKS', 'REQUESTDATE', 'REQUESTSTATUS'],
                proxy: {
                    type: 'ajax',
                    url: apiUrl,
                    reader: {
                        type: 'json'
                    }
                }
            });
            Ext.getCmp('DndDetailGridPanel').bindStore(store);
        },
        updateDNDDetails: function(status){
            var selection = Ext.getCmp('DndDetailGridPanel').getSelectionModel().getSelection()[0];
            if(selection){
                var selectedDNDData = selection.data;
                var dndJSON = {};
                dndJSON['PHONENO'] = selectedDNDData.PHONENO;
                dndJSON['REQUESTSTATUS'] = status;
                dndJSON['CONTREF'] = selectedDNDData.CONTREF;
                dndJSON['REQUESTDATE'] = selectedDNDData.REQUESTDATE;
                var dndJSONString = JSON.stringify(dndJSON);

                Ext.Ajax.request({
                    url: '/crm/api/dndRequests',
                    method: 'PUT',
                    params: {
                        "editJson": dndJSONString
                    },
                    success: function (response, opts) {
                        selectedDNDData.REQUESTSTATUS = status;
                        Ext.getCmp('DndDetailGridPanel').getView().refresh();
                        var msg = Ext.decode(response.responseText);
                        Ext.Msg.alert("DND Information", msg.message);
                    },
                    failure: function (response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
            else{
                Ext.Msg.alert("Message", "No Item selected.");
            }
        },
        viewCallDetails: function(){
            var selection = Ext.getCmp('DndDetailGridPanel').getSelectionModel().getSelection()[0];
            if(selection){
                var selectedDNDData = selection.data;
                CrmApp.controller.CRMController.viewCallInfo(selectedDNDData.PHONENO);
            }
            else{
                Ext.Msg.alert("Message", "No Item selected.");
            }
        }
    }
});