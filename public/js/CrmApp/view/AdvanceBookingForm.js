Ext.define('CrmApp.view.AdvanceBookingForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.advanceBookingForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.controller.CRMController.loadProductDataStore('bookingProduct', 'product', selectedProductId);
            CrmApp.controller.CRMController.loadProductDataStore('bookingfreeGiftDropDown', 'freeGift', 'default');
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
                            text: 'Booking Date',
                            margins: '7 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'xdatetime',
                            name: 'bookingpreferDate',
                            id: 'bookingpreferDate',
                            xtype: 'xdatetime',
                            timeFormat: 'H:i',
                            timeConfig: {
                                altFormats: 'H:i'
                                ,allowBlank: false
                                ,editable: true
                                ,increment: 15
                                ,minValue: '07:00',
                                maxValue: '20:00'
                            },
                            dateConfig: {
                                minValue:new Date(),
                                format: 'd/m/Y'
                            },
                            allowBlank: false,
                            margin: '5 0 0 0',
                            width: 290
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
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            multiSelect: true,
                            triggerAction: 'all',
                            forceSelection: true,
                           // editable: false,
                            typeAhead: true,
                            allowBlank: false,
                            name: 'bookingProduct',
                            id: 'bookingProduct',
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
                            width: 100
                        },
                        {
                            xtype: 'textfield',
                            width: 220,
                            allowBlank: false,
                            regex: /^\d{3,6}$/i,
                            maskRe: /\d/i,
                            name: 'bookingpriceOffer',
                            id: 'bookingpriceOffer'
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
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'bookingfreeGiftDropDown',
                            id: 'bookingfreeGiftDropDown',
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
                            width: 100
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            allowBlank: false,
                            minLength: 10,
                            name: 'bookingNotes',
                            id: 'bookingNotes',
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
                            id: 'savebooking',
                            text: 'Save',
                            formBind: true,
                            iconCls: 'savebutton',
                            handler: function(){
                                CrmApp.view.AdvanceBookingForm.saveAdvanceBooking();
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closebooking',
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
        saveAdvanceBooking: function () {
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            formJson['CALLBACKON'] = Ext.getCmp('bookingpreferDate').getValue();

            formJson['DISPID'] = 16;
            formJson['LOOKID'] = 16;
            formJson['DISPDESC'] = "Advance Booking";
            formJson['CALLBACKTYPE'] = "Advance Booking";


            var productCombo = Ext.getCmp('bookingProduct');
            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 16
            formJson['DISPO'][0]['LOOKID'] = 16;
            formJson['DISPO'][0]['DISPDESC'] = "Advance Booking";
            formJson['DISPO'][0]['PRODUCTS'] = new Array();


          //  var productCombo = Ext.getCmp('notInterestedProduct');

            for(var i=0; i<productCombo.value.length; i++) {
                formJson['DISPO'][0]['PRODUCTS'][i] = {};
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[i]).data.name;
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODID'] = productCombo.value[i];
            }

            formJson['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[0]).data.name;
            formJson['PRODID'] = productCombo.value[0];

            formJson['DISPO'][0]['OFFERPRICE'] = (Ext.getCmp('bookingpriceOffer').value == undefined) ? "" : Ext.getCmp('bookingpriceOffer').value;
            var freeGiftCombo = Ext.getCmp('bookingfreeGiftDropDown');
            formJson['DISPO'][0]['FREEGIFTOFFER'] = (freeGiftCombo.rawValue == "Select Product") ? "" : freeGiftCombo.rawValue;
            //formJson['PRODDESC'] = freeGiftCombo.rawValue;
            //formJson['PRODID'] = freeGiftCombo.value;
           // var selreason = reasonCombo.value;
            formJson['REMARKS'] = (Ext.getCmp('bookingNotes').value == undefined) ? "" : Ext.getCmp('bookingNotes').value;
            formJson['CALLSTATUS'] = "Open";



            var formJsonString = JSON.stringify(formJson);
            console.log(formJsonString);

            Ext.Ajax.request({
                url: '/crm/api/putCallUpdate',
                params: {
                    "inputJSON" : formJsonString
                },
                method: 'PUT',
                success: function(response, opts){
                    iosocket.emit('CALLDISP', '16');
                    Ext.getCmp('savebooking').up('.window').close();
                    CrmApp.controller.CRMController.callCompleted();

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


        }
    }
});