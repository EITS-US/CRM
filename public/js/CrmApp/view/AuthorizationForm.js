Ext.define('CrmApp.view.AuthorizationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.authorizationForm',
    border: false,
    layout: 'column',
    labelAlign: 'top',
    height: 550,
    defaults: {
        xtype: 'container',
        layout: 'form',
        columnWidth: 1
    },
    listeners: {
        afterrender: function(){
            Ext.getCmp('courierCombo').disable();
            Ext.getCmp('executionCombo').disable();
            Ext.getCmp('franchiseCombo').disable();
            Ext.getCmp('subExecutionCombo').disable();
            Ext.getCmp('ccAuthBankCombo').disable();
            Ext.getCmp('onHoldReasons').disable();
            Ext.getCmp('authType').disable();

        }
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
                    id:'editSaveAuthorization',
                    margin: '5 0 0 0',
                    iconCls: 'savebutton',
                    handler: function() {

                        var check = Ext.getCmp('authReq').getValue();
                        var check2 = Ext.getCmp('orderStatus').getValue().rbOrderStatus;

                        if(check === 'Y' && check2 === 'A')
                        {
                            Ext.Msg.alert('Error','Please Authenticate before Authorizing');

                        }
                        else
                        {
                            CrmApp.controller.CRMController.saveEditOrderDetail();
                        }
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Close',
                    id:'editCancelAuthorization',
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
                            text: 'Delivery Type',
                            margins: '2 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'radiogroup',
                            id:'deliverytype',
                            columns: 2,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'radio',
                                    boxLabel: 'Courier',
                                    name: 'delType',
                                    inputValue: 'C',

                                    width: 190,
                                    listeners: {
                                        change: function (cb, nv, ov) {
                                            if (nv)
                                            {

                                                Ext.getCmp('courierCombo').enable();

                                                var check = Ext.getCmp('isAuth').getValue();
                                                if(check === "A")
                                                {
                                                    Ext.getCmp('courierCombo').disable();
                                                    Ext.getCmp('deliverytype').disable();
                                                    //Ext.getCmp('executionCombo').disable();
                                                    Ext.getCmp('franchiseCombo').disable();
                                                    Ext.getCmp('subExecutionCombo').disable();
                                                    Ext.getCmp('ccAuthBankCombo').disable();
                                                    Ext.getCmp('onHoldReasons').disable();
                                                    Ext.getCmp('authType').disable();
                                                }
                                                else
                                                {

                                                }


                                               // Ext.getCmp('executionCombo').enable();
                                                //Ext.getCmp('franchiseCombo').enable();
                                               // Ext.getCmp('subExecutionCombo').enable();
                                               // Ext.getCmp('ccAuthBankCombo').enable();
                                                //Ext.getCmp('onHoldReasons').enable();
                                                //Ext.getCmp('authType').enable();
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'radio',
                                    boxLabel: 'Hand',
                                    name: 'delType',
                                    inputValue: 'H',
                                    checked: true,
                                    width: 190,
                                    listeners: {
                                        change: function (cb, nv, ov) {
                                            if (nv)
                                            {
                                                Ext.getCmp('courierCombo').disable();
                                                Ext.getCmp('executionCombo').disable();
                                                Ext.getCmp('franchiseCombo').disable();
                                                Ext.getCmp('subExecutionCombo').disable();
                                                Ext.getCmp('ccAuthBankCombo').disable();
                                                Ext.getCmp('onHoldReasons').disable();
                                                Ext.getCmp('authType').disable();


                                            }

                                        }
                                    }


                                }
                            ]
                        },
                        {
                            xtype: 'hidden',
                            width : 50,
                            id: 'isAuth',
                            value: ''
                        },
                        {
                            xtype: 'hidden',
                            width : 50,
                            id: 'authReq',
                            value: ''
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
                            text: 'Courier Service',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            allowBlank: true,
                            editable: true,
                            name: 'courierCombo',
                            id: 'courierCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            listeners: {

                                select: function (comp, record, index) {
                                  //  alert(comp.getValue());
                                   // alert(comp.getDisplayValue());
                                    if (comp.getValue() === -1)
                                    {
                                     //   alert('test');
                                       comp.setValue(null);
                                    }

                                }
                            }
/*                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
                                ]
                            })*/
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
                            text: 'Representative',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'repCombo',
                            id: 'repCombo',
                            displayField: 'name',
                            valueField: 'name',
                            queryMode: 'local'
                            /*store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
                                ]
                            })*/
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
                            text: 'Status',
                            margins: '2 10 0 0',
                            width: 60
                        },
                        {
                            xtype: 'radiogroup',
                            id:'orderStatus',
                            columns: 5,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: 'Pending',
                                    name: 'rbOrderStatus',
                                    inputValue: 'P',
                                    checked: true,
                                    width: 70,
                                    listeners: {
                                        change: function (cb, nv, ov) {
                                            if (nv)
                                            {
                                                // Ext.getCmp('courierCombo').disable();
                                                Ext.getCmp('executionCombo').setValue('-1');
                                                Ext.getCmp('onHoldReasons').setValue('-1');
                                                Ext.getCmp('executionCombo').disable();
                                                Ext.getCmp('onHoldReasons').disable();
                                                //  Ext.getCmp('franchiseCombo').disable();
                                                // Ext.getCmp('subExecutionCombo').disable();
                                                //Ext.getCmp('ccAuthBankCombo').disable();
                                                //Ext.getCmp('onHoldReasons').disable();
                                                // Ext.getCmp('authType').disable();


                                            }

                                        }
                                    }
                                },
                                {
                                    boxLabel: 'On-Hold',
                                    name: 'rbOrderStatus',
                                    inputValue: 'H',
                                    width: 70,
                                    listeners: {
                                        change: function (cb, nv, ov) {
                                            if (nv)
                                            {
                                                // Ext.getCmp('courierCombo').disable();
                                             //   Ext.getCmp('executionCombo').enable();
                                                //  Ext.getCmp('franchiseCombo').disable();
                                                // Ext.getCmp('subExecutionCombo').disable();
                                                //Ext.getCmp('ccAuthBankCombo').disable();
                                                Ext.getCmp('onHoldReasons').enable();
                                                Ext.getCmp('executionCombo').setValue('-1');
                                                //Ext.getCmp('onHoldReasons').setValue('-1');
                                                Ext.getCmp('executionCombo').disable();
                                                //Ext.getCmp('onHoldReasons').disable();
                                                // Ext.getCmp('authType').disable();


                                            }

                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Cancelled',
                                    name: 'rbOrderStatus',
                                    inputValue: 'C',
                                    width: 75,
                                    listeners: {
                                        change: function (cb, nv, ov) {
                                            if (nv)
                                            {
                                                Ext.getCmp('executionCombo').setValue('-1');
                                                Ext.getCmp('onHoldReasons').setValue('-1');
                                                Ext.getCmp('executionCombo').disable();
                                                Ext.getCmp('onHoldReasons').disable();


                                            }

                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Authorized',
                                    name: 'rbOrderStatus',
                                    inputValue: 'A',
                                    width: 80,
                                    listeners: {
                                        change: function (cb, nv, ov) {
                                            if (nv)
                                            {


                                                    // Ext.getCmp('courierCombo').disable();
                                                    Ext.getCmp('executionCombo').enable();
                                                    //  Ext.getCmp('franchiseCombo').disable();
                                                    // Ext.getCmp('subExecutionCombo').disable();
                                                    //Ext.getCmp('ccAuthBankCombo').disable();
                                                    Ext.getCmp('onHoldReasons').setValue('-1');

                                                    Ext.getCmp('onHoldReasons').disable();
                                                    // Ext.getCmp('authType').disable();




                                            }

                                        }
                                    }
                                },
                                {
                                    boxLabel: 'Custom Auth',
                                    name: 'rbOrderStatus',
                                    inputValue: '5',
                                    width: 90
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
                            text: 'Execution Point',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'executionCombo',
                            id: 'executionCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            listeners: {
                                change: function (cb, nv, ov) {
                                    if (nv)
                                    {
                                       // alert(nv);

                                        if(nv == 37)
                                        {
                                            Ext.getCmp('franchiseCombo').enable();
                                            Ext.getCmp('subExecutionCombo').disable();
                                        }
                                        else if(nv == 1)
                                        {
                                            Ext.getCmp('subExecutionCombo').enable();
                                            Ext.getCmp('franchiseCombo').disable();
                                        }
                                        else
                                        {
                                            Ext.getCmp('franchiseCombo').disable();
                                            Ext.getCmp('subExecutionCombo').disable();
                                        }

                                       // if(nv)
                                        // Ext.getCmp('courierCombo').disable();
                                      //  Ext.getCmp('executionCombo').enable();

                                        // Ext.getCmp('subExecutionCombo').disable();
                                        //Ext.getCmp('ccAuthBankCombo').disable();
                                     //   Ext.getCmp('onHoldReasons').setValue('-1');

                                      //  Ext.getCmp('onHoldReasons').disable();
                                        // Ext.getCmp('authType').disable();


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
                            text: 'Franchisee Name',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'franchiseCombo',
                            id: 'franchiseCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
                       /*     store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
                                ]
                            })*/
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
                            text: 'Sub-Execution',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'subExecutionCombo',
                            id:'subExecutionCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
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
                            text: 'CC Auth. Bank',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'ccAuthBankCombo',
                            id: 'ccAuthBankCombo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
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
                            text: 'On-Hold Reasons',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'onHoldReasons',
                            id: 'onHoldReasons',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value'],
                                data   : [
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
                            text: 'Notes',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textareafield',
                            width: 220,
                            name: 'authorizationRemarks',
                            id: 'authorizationRemarks'
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
                            xtype: 'radiogroup',
                            id:'authType',
                            columns: 2,
                            vertical: true,
                            items: [
                                {
                                    boxLabel: 'Conf.',
                                    name: 'rbAuthType',
                                    inputValue: '1',
                                    checked: true,
                                    width: 190
                                },
                                {
                                    boxLabel: 'TL On Hold',
                                    name: 'rbAuthType',
                                    inputValue: '2',
                                    width: 190
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
                            text: 'Delivery Time Frame',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            width: 110,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            name: 'deliveryTimeFrame',
                            id:'deliveryTimeFrame',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields : ['name', 'value','mode'],
                                data   : [{name:'24 Hours',value:24,mode:25002},{name:'48 Hours',value:48,mode:25003},{name:'72 Hours',value:72,mode:25004}
                                ]
                            })
                        },
                        {
                            width: 170,
                            xtype: 'combo',
                            mode: 'local',
                            value: '',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: true,
                            name: 'deliveryTimeTo',
                            id: 'deliveryTimeTo',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            margins: '0 0 0 5'
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
                            text: 'Send SMS To',
                            margins: '5 10 0 0',
                            width: 110
                        },
                        {
                            xtype: 'textfield',
                            width: 220,
                            name: 'sendSmsContact',
                            id: 'sendSmsContact'
                        }
                    ]
                }
            ]
        }
    ],
    statics: {
        loadCourierOptions: function(){
            Ext.Ajax.request({
                url: '/crm/api/getCourierByID/3',
                success: function(response, opts){
                    var courierObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<courierObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = courierObj[i].DLVBOYNAME;
                        dataReasons[i]['value'] = courierObj[i].DLVBOYID;

                    }
                    var courierStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataReasons
                    });
                    var rec = { name: '&nbsp;', value: -1 };
                    courierStore.insert(0,rec);

                    Ext.getCmp('courierCombo').clearValue();
                    Ext.getCmp('courierCombo').bindStore(courierStore);
                  //  Ext.getCmp('courierCombo').setValue(courierObj[0].DLVBOYID);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadRepOptions: function(){
            Ext.Ajax.request({
                url: '/crm/api/team/users',
                success: function(response, opts){
                    var courierObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<courierObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['id'] = courierObj[i].userid;
                        dataReasons[i]['name'] = courierObj[i].username;

                    }
                    var courierStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['id', 'name'],
                        data: dataReasons
                    });
                    Ext.getCmp('repCombo').clearValue();
                    Ext.getCmp('repCombo').bindStore(courierStore);
                    Ext.getCmp('repCombo').setValue(userObj.USERNAME);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadFranchiseOptions: function(){
            Ext.Ajax.request({
                url: '/crm/api/getAllFranchisees',
                success: function(response, opts){
                    var courierObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<courierObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = courierObj[i].FRDESC;
                        dataReasons[i]['value'] = courierObj[i].FRID;

                    }
                    var courierStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataReasons
                    });
                    var rec = { name: '', value: '-1' };
                    courierStore.insert(0,rec);

                    Ext.getCmp('franchiseCombo').clearValue();
                    Ext.getCmp('franchiseCombo').bindStore(courierStore);
                  //  Ext.getCmp('franchiseCombo').setValue(courierObj[0].FRID);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadExecutionOptions: function(EXECPOINTID){
            Ext.Ajax.request({
                url: '/crm/api/getAllShowrooms',
                success: function(response, opts){
                    var courierObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<courierObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = courierObj[i].SHOWDESC;
                        dataReasons[i]['value'] = courierObj[i].SHOWID;

                    }
                    var courierStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataReasons
                    });
                    var rec = { name: '', value: '-1' };
                    courierStore.insert(0,rec);

                    Ext.getCmp('executionCombo').clearValue();
                    Ext.getCmp('executionCombo').bindStore(courierStore);
                    Ext.getCmp('executionCombo').setValue(EXECPOINTID);


                    Ext.getCmp('subExecutionCombo').clearValue();
                    Ext.getCmp('subExecutionCombo').bindStore(courierStore);
                   // Ext.getCmp('subExecutionCombo').setValue(EXECPOINTID);



                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadOnHoldReasons: function(){
            Ext.Ajax.request({
                url: '/crm/api/getOnHoldReasons',
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
                    var rec = { name: '', value: '-1' };
                    reasonStore.insert(0,rec);

                    Ext.getCmp('onHoldReasons').clearValue();
                    Ext.getCmp('onHoldReasons').bindStore(reasonStore);
                   // Ext.getCmp('onHoldReasons').setValue(reasonsObj[0].LINEDESC);
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadBankDetails: function(){
            Ext.Ajax.request({
                url: '/crm/api/banks',
                success: function(response, opts){
                    var reasonsObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<reasonsObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = reasonsObj[i].BANKDESC;
                        dataReasons[i]['value'] = reasonsObj[i].BANKID;

                    }
                    var reasonStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataReasons
                    });
                    Ext.getCmp('ccAuthBankCombo').clearValue();
                    Ext.getCmp('ccAuthBankCombo').bindStore(reasonStore);
                    Ext.getCmp('ccAuthBankCombo').setValue(reasonsObj[0].BANKDESC);
                    var dataReasons = null;
                    CrmApp.view.AuthorizationForm.loadCityDetails();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });

        },
        loadCityDetails: function(){
            Ext.Ajax.request({
                url: '/crm/api/allCity',
                success: function(response, opts){
                    var reasonsObj = Ext.decode(response.responseText);
                    var dataReasons = new Array();
                    for(var i=0; i<reasonsObj.length; i++){
                        dataReasons[i] = new Array();
                        dataReasons[i]['name'] = reasonsObj[i];
                        dataReasons[i]['value'] = reasonsObj[i];

                    }
                    var reasonStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataReasons
                    });
                    Ext.getCmp('deliveryTimeTo').clearValue();
                    Ext.getCmp('deliveryTimeTo').bindStore(reasonStore);
                   Ext.getCmp('deliveryTimeTo').setValue(Ext.getCmp('deliveryCity').getValue());
                    var dataReasons = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }


    }
});