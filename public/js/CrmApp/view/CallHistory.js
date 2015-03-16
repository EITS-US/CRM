Ext.Loader.setPath('Ext.ux', '../js/lib/ux');
Ext.require([
    'Ext.ux.grid.FiltersFeature'
]);
Ext.define('CrmApp.view.CallHistory' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.callHistory',
    //store : 'CallHistoryStores',
    selType: 'rowmodel',
    listeners: {
        afterrender: function(){
        }
    },
    features: [
        {
            ftype: 'filters',
            encode: false,
            local: true,
            filters: [
                {
                    type: 'boolean',
                    dataIndex: 'visible'
                }
            ]
        }
    ],
    initComponent: function() {        
    	this.columns = [
            {
				header: 'Call Start Time',
				dataIndex: 'CALLSTARTTIME',
                type: 'date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i'),
                flex :1
			},
            {
            	header: 'Caller No',  
            	dataIndex: 'CALLERNO',
            	width: '160'
            },
			{
				header: 'User',
				width: '120',
                dataIndex: 'USERDESC'
			},
			{
				header: 'Team', 
				dataIndex: 'TEAMDESC',
				width: '80'
			},
			{
				header: 'Offer Price',
				dataIndex: 'DISPO[0].OFFERPRICE',
				width: '80'
			},
			{
				header: 'Disposition', 
				dataIndex: 'DISPO[0].DISPDESC',
                flex :1,
                filter: {
                    type: 'string'
                }
			},
			{
				header: 'Product', 
				dataIndex: 'DISPO[0].PRODUCTS',

                flex :1,
                renderer:function(value) {

                    // your logic here
                    var prod = "";
                    for(i = 0 ; i < value.length; i++){
                        prod = prod.concat(value[i].PRODDESC) + "</br>";
                    }
                    return   prod ;
                }
			},
            {
                header: 'Free Gift',
                dataIndex: 'DISPO[0].FREEGIFTOFFER',
                width: '80'
            },
			{
				header: 'Language',
                dataIndex: 'LANGDESC',
				width: '80'
			}
        ];
        this.callParent(arguments);
    },
    statics:{
        loadCallHistory: function(gridId, contRefId){
            Ext.getCmp(gridId).store.removeAll();
            Ext.Ajax.request({
                url: '/crm/api/callHistory/'+ Ext.getCmp(contRefId).value,
                success: function(response, opts){
                    var callHistoryStore = Ext.decode(response.responseText);
                    var callHistoryStore = Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: [
                            'CALLSTARTTIME',
                            'CALLERNO',
                            'USERDESC',
                            'TEAMDESC',
                            'DISPO[0].OFFERPRICE',
                            'DISPO[0].DISPDESC',
                            'DISPO[0].PRODUCTS',
                            'DISPO[0].FREEGIFTOFFER',
                            'LANGDESC'
                        ],
                        data: callHistoryStore
                    });
                    Ext.getCmp(gridId).bindStore(callHistoryStore);
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
        searchContactNumber: function(gridId, phoneFld){
            Ext.getCmp(gridId).store.removeAll();
            var phoneNumber = Ext.getCmp(phoneFld).getValue().toString();
            if(phoneNumber.length == 10){
                Ext.Ajax.request({
                    url: '/crm/api/call?Search={"REPORTTYPE":"callInfo", "CALLERNO": "'+phoneNumber+'"}',
                    success: function(response, opts){
                        var callHistoryStore = Ext.decode(response.responseText);
                        var callHistoryStore = Ext.create('Ext.data.Store', {
                            autoDestroy: true,
                            fields: [
                                'CALLSTARTTIME',
                                'CALLERNO',
                                'USERDESC',
                                'TEAMDESC',
                                'DISPO[0].OFFERPRICE',
                                'DISPO[0].DISPDESC',
                                'DISPO[0].PRODUCTS',
                                'DISPO[0].FREEGIFTOFFER',
                                'LANGDESC'
                            ],
                            data: callHistoryStore
                        });
                        Ext.getCmp(gridId).bindStore(callHistoryStore);
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
            else{
                Ext.Msg.alert("Call History", "Please enter proper contact no");
            }
        }
    }
});

