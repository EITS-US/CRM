Ext.define('CrmApp.view.CustomerDetailsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.customerDetailsForm',
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
                    id:'editSaveCustomer',
                    margin: '5 0 0 0',
                    iconCls: 'savebutton',
                    handler: function() {
                        CrmApp.controller.CRMController.saveEditCustomerDetails();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelCustomer',
                    margin: '5 5 0 5',
                    iconCls: 'cancelbutton',
                    handler: function() {
                        if(editOrderCallFlag)
                        {
                            CrmApp.view.CustomerDetailsForm.saveEditCallData();
                        }
                        //CrmApp.view.CustomerDetailsForm.saveEditCallData();
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
                            text: 'Title',
                            margins: '2 10 0 0',
                            width: 70
                        },
                        {
                            width: 65,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'nameTitle',
                            id: 'nameTitle',
                            allowBlank: false,
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '1 0 0 0',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data : [
                                    {name : 'Mr.',   value: 'Mr.'},
                                    {name : 'Mrs.',  value: 'Mrs.'},
                                    {name : 'Ms.', value: 'Ms.'}
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
                            text: 'Name',
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            name : 'name',
                            id:'nameEdit',
                            margins: '1 0 0 0'
                        },
                        {
                            xtype: 'hiddenfield',
                            name : 'contRefIdEdit',
                            id: 'contRefIdEdit'
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
                            text: 'Gender',
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            name : 'contactGender',
                            id:'contactGender',
                            margins: '1 0 0 0'
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
                            text: 'Address',
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            name : 'address1',
                            id: 'address1',
                            margins: '1 0 0 0'
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
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            name : 'address2',
                            id: 'address2',
                            margins: '1 0 0 0'
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
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            width: 250,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: false,
                            editable: true,
                            name: 'address3',
                            id: 'address3',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '1 0 0 0'
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
                            text: 'Email',
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            name : 'email',
                            id:'contactEmail',
                            value: '',
                            margins: '1 0 0 0'
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
                            text: 'Primary No',
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            width: 250,
                            name : 'primaryNumber',
                            id: 'primaryNumber',
                            margins: '1 0 0 0'
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
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'combo',
                            width: 250,
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'contactCountry',
                            id: 'contactCountry',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            value: 'India',
                            margins: '1 0 0 0',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value', 'countryId'],
                                data   : [
                                    {name: 'India', value: 'India', countryId: '-1'}
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
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'combo',
                            width: 250,
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'contactState',
                            id: 'contactState',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '1 0 0 0'
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
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'combo',
                            width: 250,
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'contactCity',
                            id: 'contactCity',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '1 0 0 0'
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
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'textfield',
                            width: 250,
                            name : 'pincode',
                            id: 'pincode',
                            enableKeyEvents: true,
                            margins: '1 0 0 0',
                            listeners:{
                                keyup:function(newValue){
                                    if(newValue.rawValue.length == 6){
                                        CrmApp.view.CustomerDetailsForm.updatePinCode();
                                    }
                                }
                            }
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
                            text: 'Language',
                            margins: '5 10 0 0',
                            width: 70
                        },
                        {
                            xtype: 'combo',
                            width: 250,
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'contactLanguageCombo',
                            id: 'contactLanguageCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '1 0 0 0'
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        updatePinCode: function () {
            var pinCode = Ext.getCmp('pincode').getValue();
            Ext.Ajax.request({
                url: '/crm/api/pincode/' + pinCode,
                success: function (response, opts) {
                    var responseObj = Ext.decode(response.responseText);
                    var stateName = new Array();
                    var cityName = new Array();
                    var officeName = new Array();
                    for (var i = 0; i < responseObj.length; i++) {
                        stateName[i] = responseObj[i].statename;
                        cityName[i] = responseObj[i].Districtname;
                        officeName[i] = responseObj[i].officename;
                    }
                    stateName = Ext.Array.unique(stateName);
                    cityName = Ext.Array.unique(cityName);
                    officeName = Ext.Array.unique(officeName);
                    var dataState = new Array();
                    for (var i = 0; i < stateName.length; i++) {
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
                    Ext.getCmp('contactState').clearValue();
                    Ext.getCmp('contactState').bindStore(stateStore);
                    Ext.getCmp('contactState').setValue(stateName[0]);

                    var dataCity = new Array();
                    for (var i = 0; i < cityName.length; i++) {
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
                    Ext.getCmp('contactCity').clearValue();
                    Ext.getCmp('contactCity').bindStore(cityStore);
                    Ext.getCmp('contactCity').setValue(cityName[0]);

                    var dataOffice = new Array();
                    for (var i = 0; i < officeName.length; i++) {
                        dataOffice[i] = new Array();
                        dataOffice[i]['name'] = officeName[i];
                        dataOffice[i]['value'] = officeName[i];
                    }
                    var officeStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataOffice
                    });
                    Ext.getCmp('address3').clearValue();
                    Ext.getCmp('address3').bindStore(officeStore);
                    Ext.getCmp('address3').setValue(officeName[0]);
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },

        saveEditCallData: function () {
            var formJson = {};
            formJson['CONTNAME'] = Ext.getCmp('nameEdit').value;
            formJson['CONTACTNAME'] = Ext.getCmp('nameEdit').value;
            //var callend = new Date();

            formJson['CALLENDTIME'] = "Y";
            formJson['TEAMDESC'] = userObj.TEAMDESC;
            formJson['SUBTEAMDESC'] = userObj.SUBTEAMDESC;
            formJson['TEAMID'] = userObj.TEAMID;
            formJson['SUBTEAMID'] = userObj.SUBTEAMID;
            formJson['USERID'] = userObj.USERID;
            formJson['USERDESC'] = userObj.USERNAME;
            formJson['CONTREF'] = Ext.getCmp('contRefIdEdit').getValue();

            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 50;
            formJson['DISPO'][0]['LOOKID'] = 50;
            formJson['DISPO'][0]['DISPDESC'] = "Edit Order";

            formJson['DISPID'] = 50;
            formJson['LOOKID'] = 50;
            formJson['DISPDESC'] = "Edit Order";
            // formJson['LANGDESC'] = Ext.getCmp('languageCombo').rawValue;
            // formJson['LANGID'] = Ext.getCmp('languageCombo').value;

            formJson['CALLSOURCE'] = callSource;
            formJson['ACTUALEXT'] = Ext.get('extention').getHTML();
            formJson['CALLKEY'] = editOrderCallKey;

            formJson['MEDIADESC'] = 'NA';
            formJson['MEDIAID'] = -1;
            formJson['SYNCHED_WITH_BYD'] = 1;
            var formJsonString = JSON.stringify(formJson);
            //console.log(formJsonString);

            Ext.Ajax.request({
                url: '/crm/api/putCallUpdate',
                params: {
                    "inputJSON": formJsonString
                },
                method: 'PUT',
                success: function (response, opts) {

                },
                failure: function (response, opts) {
                    //console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    }
});