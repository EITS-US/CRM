Ext.define('CrmApp.view.NonSaleCallForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.nonSaleCallForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.NonSaleCallForm.loadNonSaleCallReasons();
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
                            text: 'Non-Sale Call Reasons',
                            margins: '7 10 0 0',
                            width: 140
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
                            name: 'nonSaleCallReasonDropDown',
                            id: 'nonSaleCallReasonDropDown',
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
                            width: 140
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            allowBlank: false,
                            minLength: 10,
                            name: 'nonSaleCallNotes',
                            id: 'nonSaleCallNotes',
                            rows: 5
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
                            id: 'saveNonSaleCall',
                            text: 'Save',
                            formBind: true,
                            iconCls: 'savebutton',
                            handler: function(){
                                CrmApp.view.NonSaleCallForm.saveNonSaleCall();
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeNonSaleCall',
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
        saveNonSaleCall: function(){
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            var reasonCombo = Ext.getCmp('nonSaleCallReasonDropDown');

            formJson['LINEDESC'] = reasonCombo.value;


            formJson['DISPID'] = 14;
            formJson['LOOKID'] = 14;
            formJson['DISPDESC'] = "Non Sale Call";


            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 14;
            formJson['DISPO'][0]['LOOKID'] = 14;
            formJson['DISPO'][0]['DISPDESC'] = "Non Sale Call";
            formJson['HDRID'] = reasonCombo.findRecordByValue(reasonCombo.value).data.hdrId;


            //formJson['REMARKS'] = (Ext.getCmp('nonSaleCallNotes').value == undefined) ? "" : Ext.getCmp('nonSaleCallNotes').value;

            var selreason = reasonCombo.value;
            formJson['REMARKS'] = selreason + ': ' + ((Ext.getCmp('nonSaleCallNotes').value == undefined) ? "" : Ext.getCmp('nonSaleCallNotes').value);
            formJson['CALLSTATUS'] = "O";


            var formJsonString = JSON.stringify(formJson);
            console.log(formJsonString);

            Ext.Ajax.request({
                url: '/crm/api/putCallUpdate',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'PUT',
                success: function(response, opts){
                    iosocket.emit('CALLDISP', '14');
                    Ext.getCmp('saveNonSaleCall').up('.window').close();
                    CrmApp.controller.CRMController.callCompleted();

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });

          //  Ext.getCmp('saveNonSaleCall').up('.window').close();
            //CrmApp.controller.CRMController.callCompleted();
        },
        loadNonSaleCallReasons: function(){
            Ext.Ajax.request({
                url: '/crm/api/getNonSaleRes',
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
                    Ext.getCmp('nonSaleCallReasonDropDown').clearValue();
                    Ext.getCmp('nonSaleCallReasonDropDown').bindStore(reasonStore);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});