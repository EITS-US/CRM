Ext.define('CrmApp.view.NotInterestedForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.notInterestedForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.controller.CRMController.loadProductDataStore('notInterestedProduct', 'product', selectedProductId);
            CrmApp.controller.CRMController.loadProductDataStore('notInterestedFreeGiftDropDown', 'freeGift', 'default');
            CrmApp.view.NotInterestedForm.loadNotInterestedReasons();
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
                            text: 'Not Interested Reasons',
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
                            name: 'notInterestedReasonDropDown',
                            id: 'notInterestedReasonDropDown',
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
                            text: 'Product',
                            margins: '2 10 0 0',
                            width: 140
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
                            name: 'notInterestedProduct',
                            id: 'notInterestedProduct',
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
                            width: 140
                        },
                        {
                            xtype: 'textfield',
                            width: 220,
                            regex: /^\d{3,6}$/i,
                            maskRe: /\d/i,
                            allowBlank: false,
                            name: 'notInterestedPriceOffer',
                            id: 'notInterestedPriceOffer'
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
                            width: 140
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'notInterestedFreeGiftDropDown',
                            id: 'notInterestedFreeGiftDropDown',
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
                            name: 'notInterestedNotes',
                            id: 'notInterestedNotes',
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
                            id: 'saveNotInterested',
                            text: 'Save',
                            formBind: true,
                            iconCls: 'savebutton',
                            handler: function () {
                                CrmApp.view.NotInterestedForm.saveNotInterested();
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeNotInterested',
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
        saveNotInterested: function(){
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            var reasonCombo = Ext.getCmp('notInterestedReasonDropDown');
            // formJson['DISPDESC'] = "Not Interested";
            formJson['HDRID'] = reasonCombo.findRecordByValue(reasonCombo.value).data.hdrId;

            formJson['LINEDESC'] = reasonCombo.value;



            formJson['DISPID'] = 15;
            formJson['LOOKID'] = 15;
            formJson['DISPDESC'] = "Not Interested";


            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 15;
            formJson['DISPO'][0]['LOOKID'] = 15;
            formJson['DISPO'][0]['DISPDESC'] = "Not Interested";
            formJson['DISPO'][0]['PRODUCTS'] = new Array();


            var productCombo = Ext.getCmp('notInterestedProduct');



            for(var i=0; i<productCombo.value.length; i++) {
                formJson['DISPO'][0]['PRODUCTS'][i] = {};
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[i]).data.name;
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODID'] = productCombo.value[i];
            }

            formJson['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[0]).data.name;
            formJson['PRODID'] = productCombo.value[0];


            formJson['DISPO'][0]['OFFERPRICE'] = (Ext.getCmp('notInterestedPriceOffer').value == undefined) ? "" : Ext.getCmp('notInterestedPriceOffer').value;
            var freeGiftCombo = Ext.getCmp('notInterestedFreeGiftDropDown');
           // formJson['PRODDESC'] = freeGiftCombo.rawValue;
            //formJson['PRODID'] = freeGiftCombo.value;

            formJson['DISPO'][0]['FREEGIFTOFFER'] = (freeGiftCombo.rawValue == "Select Product") ? "" : freeGiftCombo.rawValue;

            var selreason = reasonCombo.value;
            formJson['REMARKS'] = selreason + ': ' + ((Ext.getCmp('notInterestedNotes').value == undefined) ? "" : Ext.getCmp('notInterestedNotes').value);
            formJson['CALLSTATUS'] = "O";
            var formJsonString = JSON.stringify(formJson);
            //console.log(formJsonString);

            Ext.Ajax.request({
                url: '/crm/api/putCallUpdate',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'PUT',
                success: function(response, opts){
                                iosocket.emit('CALLDISP', '15');
                                Ext.getCmp('saveNotInterested').up('.window').close();
                                CrmApp.controller.CRMController.callCompleted();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


        },
        loadNotInterestedReasons: function(){
            Ext.Ajax.request({
                url: '/crm/api/getNotIntReasons',
                success: function(response, opts){
                    var reasonsObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<reasonsObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = reasonsObj[i].LINEDESC;
                        dataReasons[i]['value'] = reasonsObj[i].LINEDESC;
                        dataReasons[i]['hdrId'] = reasonsObj[i].HDRID;
                    }
                    var reasonStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'hdrId'],
                        data: dataReasons
                    });
                    var rec = { name: 'N/A', value: '-1' , hdrId : '-1'};
                    reasonStore.insert(0,rec);
                    Ext.getCmp('notInterestedReasonDropDown').clearValue();
                    Ext.getCmp('notInterestedReasonDropDown').bindStore(reasonStore);
                    //Ext.getCmp('notInterestedReasonDropDown').setValue(reasonsObj[0].LINEDESC);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});