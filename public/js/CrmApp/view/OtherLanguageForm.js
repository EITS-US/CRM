Ext.define('CrmApp.view.OtherLanguageForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.otherLanguageForm',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.OtherLanguageForm.loadProductDataStore();
            CrmApp.view.OtherLanguageForm.loadTeams();
            CrmApp.controller.CRMController.loadLanguages('otherLanguageLangDropDown');
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
                            text: 'Team',
                            margins: '7 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            margins: '5 0 0 0',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            allowBlank: false,
                            name: 'otherLanguageTeamDropDown',
                            id: 'otherLanguageTeamDropDown',
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
                            text: 'Language',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            allowBlank: false,
                            name: 'otherLanguageLangDropDown',
                            id: 'otherLanguageLangDropDown',
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
                            width: 100
                        },
                        {
                            width: 220,
                            xtype: 'combo',
                            mode: 'local',
                            multiSelect: true,
                            triggerAction: 'all',
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: false,
                            name: 'otherLanguageProduct',
                            id: 'otherLanguageProduct',
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
                            text: 'Notes',
                            margins: '2 10 0 0',
                            width: 100
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            allowBlank: false,
                            minLength: 10,
                            name: 'otherLangNotes',
                            id: 'otherLangNotes',
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
                            id: 'saveOtherLanguage',
                            text: 'Save',
                            formBind: true,
                            iconCls: 'savebutton',
                            handler: function(){
                                CrmApp.view.OtherLanguageForm.saveOtherLanguage();
                            }
                        },
                        {
                            xtype: 'button',
                            width : 70,
                            id: 'closeOtherLanguage',
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
        saveOtherLanguage: function(){
            var formJson = {};
            formJson['CALLKEY'] = Ext.getCmp('callKeyId').value;
            var teamCombo = Ext.getCmp('otherLanguageTeamDropDown');

            formJson['DISPID'] = 6;
            formJson['LOOKID'] = 6;
            formJson['DISPDESC'] = "Other Language";

            formJson['TEAMDESC'] = teamCombo.rawValue;
            formJson['TEAMID'] = teamCombo.value;
            var langCombo = Ext.getCmp('otherLanguageLangDropDown');
            formJson['LANGDESC'] = langCombo.rawValue;
            formJson['LANGID'] = langCombo.value;
            var productCombo = Ext.getCmp('otherLanguageProduct');
            formJson['DISPO']= new Array();
            formJson['DISPO'][0]= {};
            formJson['DISPO'][0]['DISPID'] = 6;
            formJson['DISPO'][0]['LOOKID'] = 6;
            formJson['DISPO'][0]['DISPDESC'] = "Other Language";
            formJson['DISPO'][0]['PRODUCTS'] = new Array();


            //  var productCombo = Ext.getCmp('notInterestedProduct');

            for(var i=0; i<productCombo.value.length; i++) {
                formJson['DISPO'][0]['PRODUCTS'][i] = {};
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[i]).data.name;
                formJson['DISPO'][0]['PRODUCTS'][i]['PRODID'] = productCombo.value[i];
            }

            formJson['PRODDESC'] = productCombo.findRecordByValue(productCombo.value[0]).data.name;
            formJson['PRODID'] = productCombo.value[0];



            formJson['REMARKS'] = (Ext.getCmp('otherLangNotes').value == undefined) ? "" : Ext.getCmp('otherLangNotes').value;
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
                    iosocket.emit('CALLDISP', '6');
                    Ext.getCmp('saveOtherLanguage').up('.window').close();
                    CrmApp.controller.CRMController.callCompleted();

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


        },
        loadTeams: function(){
            Ext.Ajax.request({
                url: '/crm/api/teams',
                success: function(response, opts){
                    var responseObj = Ext.decode(response.responseText);
                    var dataTeams = new Array();
                    for(var i=0; i<responseObj.length; i++){
                        dataTeams[i] = new Array();
                        dataTeams[i]['name'] = responseObj[i].TEAMDESC;
                        dataTeams[i]['value'] = responseObj[i].TEAMID;
                    }
                    var teamStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['name', 'value'],
                        data: dataTeams
                    });
                    Ext.getCmp('otherLanguageTeamDropDown').clearValue();
                    Ext.getCmp('otherLanguageTeamDropDown').bindStore(teamStore);
                    Ext.getCmp('otherLanguageTeamDropDown').setValue(responseObj[0].TEAMID);
                    var dataTeams = null;
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        loadProductDataStore: function(){
            var dataProduct = new Array();


                dataProduct[0] = new Array();
                dataProduct[0]['name'] = 'N/A';
                dataProduct[0]['value'] = 'default';
                dataProduct[0]['saleValue'] = 0;
                for (var i = 1; i <= allProductResults.length; i++) {
                    dataProduct[i] = new Array();
                    dataProduct[i]['name'] = allProductResults[i-1].PRODDESC;
                    dataProduct[i]['value'] = allProductResults[i-1].PRODID;
                    dataProduct[i]['saleValue'] = allProductResults[i-1].SALEVALUE;
                    dataProduct[i]['freeCost'] = allProductResults[i-1].FREECOST;
                    dataProduct[i]['isAmc'] = allProductResults[i-1].ISAMC;
                    dataProduct[i]['amcValue'] = allProductResults[i-1].AMCVALUE;
                }


            var productStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: ['name', 'value', 'saleValue', 'freeCost', 'isAmc', 'amcValue'],
                data: dataProduct
            });
            Ext.getCmp('otherLanguageProduct').clearValue();
            Ext.getCmp('otherLanguageProduct').bindStore(productStore);
           // Ext.getCmp(comboId).setValue(selectedProductId);
            var dataProduct = null;
        }
    }
});