Ext.define('CrmApp.view.TargetFormPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.targetFormPanel',
    border: false,
    dockedItems: [
        {
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '5 5 5 5',
            items: [
                {
                    xtype: 'component',
                    flex: 1
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Cancel',
                    handler: function () {
                        this.up('.window').close();
                    }
                },
                {
                    xtype: 'button',
                    width: 70,
                    text: 'Update',
                    margin: '0 0 0 10'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'form',
            layout: 'column',
            labelAlign: 'top',
            width: 618,
            defaults: {
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5
            },
            bodyPadding: 5,
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
                                    text: 'Teams',
                                    margins: '5 10 0 0',
                                    width: 120
                                },
                                {
                                    width: 150,
                                    xtype: 'combo',
                                    mode: 'local',
                                    value: 'tamil',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    editable: false,
                                    name: 'title',
                                    displayField: 'name',
                                    valueField: 'value',
                                    queryMode: 'local',
                                    store: Ext.create('Ext.data.Store', {
                                        fields : ['name', 'value'],
                                        data   : [
                                            {name : 'Tamil',   value: 'tamil'},
                                            {name : 'Telgu',  value: 'telgu'}
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
                                    text: 'Target Date',
                                    margins: '5 10 0 0',
                                    width: 120
                                },
                                {
                                    width: 150,
                                    xtype: 'datefield',
                                    allowBlank: false
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
                                    text: 'Target For The Date',
                                    margins: '5 10 0 0',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    width : 150,
                                    value: '0'
                                }
                            ]
                        }
                    ]
                },
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
                                    width: 20,
                                    xtype: 'checkboxfield',
                                    name: 'emiOrder'
                                },
                                {
                                    xtype: 'label',
                                    text: 'Auto Assign Target To Agent',
                                    margins: '3 0 0 0',
                                    width: 190
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
                                    text: 'Copy Target For Agents From',
                                    margins: '5 10 0 0',
                                    width: 170
                                },
                                {
                                    width: 120,
                                    xtype: 'datefield',
                                    allowBlank: false
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});