Ext.define('CrmApp.view.AwayForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.awayForm',
    frame: true,
    width: 350,
    height: 125,
    bodyPadding: 10,
    border: true,
    fieldDefaults: {
        labelWidth: 110,
        labelAlign: 'left'
    },
    items: [
        {
            name: 'awayReasons',
            itemId: 'awayReasons',
            xtype: 'combo',
            fieldLabel: 'Reasons',
            mode: 'local',
            value: 'Break',
            triggerAction: 'all',
            forceSelection: true,
            editable: false,
            displayField: 'name',
            valueField: 'value',
            queryMode: 'local',
            store: Ext.create('Ext.data.Store', {
                fields : ['name', 'value'],
                data   : [
                    {name : 'Break', value: 'Break'},
                    {name : 'Training/Briefing', value: 'training'}
                ]
            })
        }
    ],
    buttons: [
        {
            text: 'Cancel',
            handler: function() {
                Ext.getCmp('onlineRadio').setValue(true);
                this.up('.window').close();
            }
        },
        {
            text: 'Proceed',
            handler: function() {
                var awayReason = Ext.ComponentQuery.query('combo[name=awayReasons]')[0].displayTplData[0].value;
                iosocket.emit('AWAY', awayReason);
                this.up('.window').close();
            }
        }
    ]
});