Ext.define('CrmApp.stores.ComplaintStore', {
    extend    : 'Ext.data.Store',
    singleton : true,
    requires  : ['CrmApp.models.ComplaintModel'],
    model     : 'CrmApp.models.ComplaintModel',
    constructor : function() {
        this.callParent(arguments);
        this.loadData([
            {
                callStart : '06/28/2014 06:07:05 AM',
				callEnd : '06/28/2014 06:09:30 AM',
				extn : 'EXT7141',
				duration : '145',
				customer : 'Mr. TELEBUY IT SUPPORT',
				phoneNum : '9962996287',
				source : 'ALT I',
				product : 'NA',
				option : 'NA',
				disposition : 'Non Sale Call',
				reasons : 'STAFF CALL',
				rep : 'ADMINISTRATOR',
				team : '',
				subTeam : '',
				media : 'NA',
				lang : 'TAMIL',
				transferred : 'NA',
				notes : 'STAFF CALL: test call'
            },
            {
                callStart : '06/28/2014 06:10:23 AM',
				callEnd : '06/28/2014 06:12:10 AM',
				extn : 'EXT7141',
				duration : '107',
				customer : 'Mr. TELEBUY IT SUPPORT',
				phoneNum : '9962996287',
				source : 'ALT O',
				product : 'NA',
				option : 'NA',
				disposition : 'Non Sale Call',
				reasons : 'STAFF CALL',
				rep : 'ADMINISTRATOR',
				team : '',
				subTeam : '',
				media : 'NA',
				lang : 'TAMIL',
				transferred : 'NA',
				notes : 'STAFF CALL: test call'
            },
            {
                callStart : '06/28/2014 06:16:55 AM',
				callEnd : '06/28/2014 06:18:00 AM',
				extn : 'EXT7141',
				duration : '64',
				customer : 'Mr. TELEBUY IT SUPPORT',
				phoneNum : '9962996287',
				source : 'ALT O',
				product : 'NA',
				option : 'NA',
				disposition : 'Non Sale Call',
				reasons : 'STAFF CALL',
				rep : 'ADMINISTRATOR',
				team : '',
				subTeam : '',
				media : 'NA',
				lang : 'TAMIL',
				transferred : 'NA',
				notes : 'STAFF CALL: test call'
            }
        ]);
    }
});