Ext.define('CrmApp.view.CallPopupScripts', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CallPopupScripts',
	 defaults: {
		bodyStyle: 'padding:10px',
		autoScroll: true
	},
	layout: {
            type: 'accordion',
            animate: true
        },
        items: [{
			title: 'Script 1',
			loader: {
				url: 'http://localhost:3000/js/CrmApp/store/ajaxScripts.html',
				contentType: 'html',
				autoLoad: true
			}
		}, {
			title: 'Script 2',
			loader: {
				url: 'http://localhost:3000/js/CrmApp/store/ajaxScripts.html',
				contentType: 'html'
			},
			listeners: {
				expand: function(accord) {
					accord.loader.load();
				}
			}
		}, {
			title: 'Script 3',
			loader: {
				url: 'http://localhost:3000/js/CrmApp/store/ajaxScripts.html',
				contentType: 'html'
			},
			listeners: {
				expand: function(accord) {
					accord.loader.load();
				}
			}
		}]
});