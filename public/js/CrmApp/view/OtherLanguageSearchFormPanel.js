Ext.define('CrmApp.view.OtherLanguageSearchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.otherLanguageSearchFormPanel',
    renderTo: 'searchFormDiv',
    bodyPadding: 5,
    layout: 'hbox',
    width: 'auto',
    border: false,
    listeners: {
        afterrender: function(){
            CrmApp.view.OtherLanguageSearchFormPanel.setOtherLangForm();
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
                title: 'Search',
                layout: 'vbox',
                width: 170,
                margin: '0 0 0 0',
                height: 75,
                items: [
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'radio',
                                checked: true,
                                boxLabel: 'Pending',
                                name: 'otherLanguageState',
                                inputValue: 'pending',
                                width : 68
                            },
                            {
                                xtype: 'radio',
                                boxLabel: 'Completed',
                                name: 'otherLanguageState',
                                inputValue: 'completed'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        bodyPadding: 0,
                        layout: 'hbox',
                        border: false,
                        items: [
                            {
                                xtype: 'radio',
                                boxLabel: 'All',
                                name: 'otherLanguageState',
                                inputValue: 'all'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Phone Number',
                name: 'otherLanguagePhoneNumber',
                id: 'otherLanguagePhoneNumber',
                allowBlank: false,
                minLength: 10,
                margin: '30 0 0 10'
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
                        labelWidth: 60,
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
                    var searchType = 'pending';
                    for(var i=0; i<Ext.ComponentQuery.query('radio[name=otherLanguageState]').length; i++){
                        if(Ext.ComponentQuery.query('radio[name=otherLanguageState]')[i].getValue() == true){
                            searchType = Ext.ComponentQuery.query('radio[name=otherLanguageState]')[i].inputValue;
                        }
                    }
                    otherLangFormObj.otherLanguageState = searchType;
                    otherLangFormObj.otherLanguagePhoneNumber = Ext.getCmp('otherLanguagePhoneNumber').value;
                    otherLangFormObj.startDate = Ext.getCmp('startDate').getValue();
                    otherLangFormObj.endDate = Ext.getCmp('endDate').getValue();
                }
            }
        ];
    },
    statics: {
        setOtherLangForm: function () {
            for (var i = 0; i < Ext.ComponentQuery.query('radio[name=otherLanguageState]').length; i++) {
                if (Ext.ComponentQuery.query('radio[name=otherLanguageState]')[i].inputValue == otherLangFormObj.otherLanguageState) {
                    Ext.ComponentQuery.query('radio[name=otherLanguageState]')[i].setValue(true);
                }
            }
            if (otherLangFormObj.otherLanguagePhoneNumber !== undefined) {
                Ext.getCmp('otherLanguagePhoneNumber').setValue(otherLangFormObj.otherLanguagePhoneNumber);
            }
            if (otherLangFormObj.startDate !== undefined) {
                Ext.getCmp('startDate').setValue(otherLangFormObj.startDate);
            }
            if (otherLangFormObj.endDate !== undefined) {
                Ext.getCmp('endDate').setValue(otherLangFormObj.endDate);
            }
        }
    }
});