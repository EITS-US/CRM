Ext.define('CrmApp.view.DeliveryDetailsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deliveryDetailsForm',
    border: false,
    layout: 'column',
    labelAlign: 'top',
    height: 550,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 1
    },
    bodyPadding: 5,
    dockedItems:[
        {
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '0 0 3 5',
            items: [
                {
                    xtype: 'component',
                    flex: 1
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Save',
                    id:'editSaveDelivery',
                    margin: '5 0 0 0',
                    iconCls: 'savebutton',
                    handler: function() {
                        CrmApp.controller.CRMController.saveEditOrderDetail();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelDelivery',
                    margin: '5 5 0 5',
                    iconCls: 'cancelbutton',
                    handler: function() {
                        iosocket.emit('CLOSEPOPUP', 'close');
                        this.up('.window').close();
                    }
                }
            ]
        }
    ],
    items: [
        {
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Delivery Date',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'datefield',
                            minValue:new Date(),
                            name: 'deliveryDate'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    border: true,
                    items : [
                        {
                            xtype: 'label',
                            text: 'Delivery Address',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'radiogroup',
                            id:'delAddress',
                            columns: 2,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: 'Use Contact Address',
                                    name: 'rbDelivery',
                                    inputValue: '1',
                                    checked: true,
                                    width: 190,
                                    handler: function(ctl, val) {
                                        if(val){
                                            //load contact address
                                            Ext.getCmp('deliveryAddrLine1').disable();
                                            Ext.getCmp('deliveryAddrLine2').disable();
                                            Ext.getCmp('deliveryAddrLine3').disable();
                                            Ext.getCmp('deliveryCity').disable();
                                            Ext.getCmp('deliveryState').disable();
                                            Ext.getCmp('deliveryCountry').disable();
                                            Ext.getCmp('deliveryPinCode').disable();
                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Other Delivery Address',
                                    name: 'rbDelivery',
                                    inputValue: '2',
                                    width: 190,
                                    handler: function(ctl, val) {
                                        if(val){
                                            Ext.getCmp('deliveryAddrLine1').enable();
                                            Ext.getCmp('deliveryAddrLine2').enable();
                                            Ext.getCmp('deliveryAddrLine3').enable();
                                            Ext.getCmp('deliveryCity').enable();
                                            Ext.getCmp('deliveryState').enable();
                                            Ext.getCmp('deliveryCountry').enable();
                                            Ext.getCmp('deliveryPinCode').enable();
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Delivery Address',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            disabled: true,
                            name: 'deliveryAddrLine1',
                            id: 'deliveryAddrLine1'
                            //value: 'Indirapuram'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: '',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            disabled: true,
                            name: 'deliveryAddrLine2',
                            id: 'deliveryAddrLine2'
                          // value: 'FULL ADDRESS'
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: '',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                           // value: 'Kumaran Nagar S.O',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryAddrLine3',
                            id: 'deliveryAddrLine3',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            disabled: true,
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data : [
                                   // {name : 'Kumaran Nagar S.O',   value: 'Kumaran Nagar S.O'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'City',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width : 220,
                            xtype: 'combo',
                            mode: 'local',
                         //   value: 'Chennai',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryCity',
                            id: 'deliveryCity',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            disabled: true,
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data : [
                                  //  {name : 'Chennai',   value: 'Chennai'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'State',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width : 220,
                            xtype: 'combo',
                            mode: 'local',
                           // value: 'TAMIL NADU',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryState',
                            id: 'deliveryState',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            disabled: true,
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data : [
                                    //{name : 'TAMIL NADU',   value: 'TAMIL NADU'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Country',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            width : 220,
                            xtype: 'combo',
                            mode: 'local',
                           // value: 'India',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryCountry',
                            id: 'deliveryCountry',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            disabled: true,
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data : [
                                  //  {name : 'India',   value: 'India'}
                                ]
                            })
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Pin Code',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            width : 220,
                            disabled: true,
                            name: 'deliveryPinCode',
                            id: 'deliveryPinCode',
                            enableKeyEvents: true,
                            listeners:{
                                keyup:function(newValue){
                                    if(newValue.rawValue.length == 6){
                                        CrmApp.view.DeliveryDetailsForm.updatePinCode();
                                    }
                                }
                            }
                           // value: 600082
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    border: true,
                    items : [
                        {
                            xtype: 'label',
                            text: 'Invoice Address',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'radiogroup',
                            id:'invoiceAddress',
                            columns: 2,
                            vertical: true,
                            items: [
                                {boxLabel: 'Contact Address', name: 'rbInvoice', inputValue: '1', checked: true, width: 140},
                                {boxLabel: 'Delivery Address', name: 'rbInvoice', inputValue: '2', width: 140}
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        hideLabel: true
                    },
                    items : [
                        {
                            xtype: 'label',
                            text: 'Notes',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            name: 'deliveryNotes',
                            id: 'deliveryNotes'
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        updatePinCode: function () {
            var pinCode = Ext.getCmp('deliveryPinCode').getValue();
            Ext.Ajax.request({
                url: '/crm/api/pincode/'+pinCode,
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var stateName = new Array();
                    var cityName = new Array();
                    var officeName = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        stateName[i] = responseObj[i].statename;
                        cityName[i] = responseObj[i].Districtname;
                        officeName[i] = responseObj[i].officename;
                    }
                    stateName = Ext.Array.unique(stateName);
                    cityName = Ext.Array.unique(cityName);
                    officeName = Ext.Array.unique(officeName);
                    var dataState = new Array();
                    for(var i=0; i<stateName.length; i++){
                        dataState[i] = new Array();
                        dataState[i]['name'] = stateName[i];
                        dataState[i]['value'] = stateName[i];
                        dataState[i]['stateId'] = '-1';
                    }
                    var stateStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'stateId'],
                        data: dataState
                    });
                    Ext.getCmp('deliveryState').clearValue();
                    Ext.getCmp('deliveryState').bindStore(stateStore);
                    Ext.getCmp('deliveryState').setValue(stateName[0]);

                    var dataCity = new Array();
                    for(var i=0; i<cityName.length; i++){
                        dataCity[i] = new Array();
                        dataCity[i]['name'] = cityName[i];
                        dataCity[i]['value'] = cityName[i];
                        dataCity[i]['cityId'] = '-1';
                    }
                    var cityStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value', 'cityId'],
                        data: dataCity
                    });
                    Ext.getCmp('deliveryCity').clearValue();
                    Ext.getCmp('deliveryCity').bindStore(cityStore);
                    Ext.getCmp('deliveryCity').setValue(cityName[0]);

                    var dataOffice = new Array();
                    for(var i=0; i<officeName.length; i++){
                        dataOffice[i] = new Array();
                        dataOffice[i]['name'] = officeName[i];
                        dataOffice[i]['value'] = officeName[i];
                    }
                    var officeStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataOffice
                    });
                    Ext.getCmp('deliveryAddrLine3').clearValue();
                    Ext.getCmp('deliveryAddrLine3').bindStore(officeStore);
                    Ext.getCmp('deliveryAddrLine3').setValue(officeName[0]);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }


});