Ext.define('CrmApp.view.GeneralEnquiryForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.generalEnquiryForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.controller.CRMController.loadProductDataStore('generalEnquiryProduct', 'product', selectedProductId);
            CrmApp.controller.CRMController.loadProductDataStore('generalEnquiryFreeGiftDropDown', 'freeGift', 'default');
            CrmApp.view.GeneralEnquiryForm.loadGeneralEnquiryReasons();
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
                            text: 'General Enquiry Reasons',
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
                            name: 'reasonGeneralEnquiryDropDown',
                            id: 'reasonGeneralEnquiryDropDown',
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
                            name: 'generalEnquiryProduct',
                            id: 'generalEnquiryProduct',
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
                            name: 'generalEnquiryPriceOffer',
                            id: 'generalEnquiryPriceOffer'
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
                            name: 'generalEnquiryFreeGiftDropDown',
                            id: 'generalEnquiryFreeGiftDropDown',
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
                            name: 'generalEnquiryNotes',
                            id: 'generalEnquiryNotes',
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
                            id: 'saveGeneralEnquiry',
                            text: 'Save',
                            formBind: true,
                            iconCls: 'savebutton',
                            handler: function(){
                                CrmApp.view.GeneralEnquiryForm.saveGeneralEnquiry();
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeGeneralEnquiry',
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
        saveGeneralEnquiry: function(){
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            var reasonCombo = Ext.getCmp('reasonGeneralEnquiryDropDown');
            formJson['LINEDESC'] = reasonCombo.value;
            formJson['HDRID'] = reasonCombo.findRecordByValue(reasonCombo.value).data.hdrId;

            var productCombo = Ext.getCmp('generalEnquiryProduct');


            formJson['DISPID'] = 2;
            formJson['LOOKID'] = 2;
            formJson['DISPDESC'] = "General Enquiry";


            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 2;
            formJson['DISPO'][0]['LOOKID'] = 2;
            formJson['DISPO'][0]['DISPDESC'] = "General Enquiry";
            formJson['DISPO'][0]['PRODUCTS'] = new Array();


            //  var productCombo = Ext.getCmp('notInterestedProduct');

            for(var i=0; i<productCombo.value.length; i++) {
                formJson['DISPO'][0]['PRODUCTS'][i] = {};
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[i]).data.name;
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODID'] = productCombo.value[i];
            }

            formJson['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[0]).data.name;
            formJson['PRODID'] = productCombo.value[0];

            //formJson['PRICE'] = (Ext.getCmp('generalEnquiryPriceOffer').value == undefined) ? "" : Ext.getCmp('generalEnquiryPriceOffer').value;
            var freeGiftCombo = Ext.getCmp('generalEnquiryFreeGiftDropDown');
          //  formJson['PRODDESC'] = freeGiftCombo.rawValue; generalEnquiryPriceOffer
           // formJson['PRODID'] = freeGiftCombo.value;
            formJson['DISPO'][0]['FREEGIFTOFFER'] = (freeGiftCombo.rawValue == "Select Product") ? "" : freeGiftCombo.rawValue;
            formJson['DISPO'][0]['OFFERPRICE'] = (Ext.getCmp('generalEnquiryPriceOffer').rawValue == undefined) ? "" : Ext.getCmp('generalEnquiryPriceOffer').rawValue;
            var selreason = reasonCombo.value;
            formJson['REMARKS'] = selreason + ': ' + ((Ext.getCmp('generalEnquiryNotes').value == undefined) ? "" : Ext.getCmp('generalEnquiryNotes').value);
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
                    Ext.getCmp('saveGeneralEnquiry').up('.window').close();
                    CrmApp.controller.CRMController.callCompleted();
                    iosocket.emit('CALLDISP', '2');

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


        },
        loadGeneralEnquiryReasons: function(){
            Ext.Ajax.request({
                url: '/crm/api/getGenInqReasons',
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
                    Ext.getCmp('reasonGeneralEnquiryDropDown').clearValue();
                    Ext.getCmp('reasonGeneralEnquiryDropDown').bindStore(reasonStore);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});