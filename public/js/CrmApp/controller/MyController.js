Ext.define('myApp.controller.MyController', {
   extend : 'Ext.app.Controller',
    
     //stores: ['Orders','Details'],
     views : ['OrderEntry','Panel1','HeaderEntry', 'Panel2','DetailEntry','Panel3','PaymentEntry','OrderForm','DeliveryDetail'],
     
   init : function() {
    console.log("Controller init called");
    this.control({
     'orderEntry' : {
      render : this.onPanelRendered
     },
	 
	 'headerEntry' : {
      render : this.onHeaderRendered,
      edit: this.editHeader
     },
	 
	 'deliveryDetail' : {
      render : this.onDeliveryDetailFormRendered
     },
    
     'orderForm' : {
      render : this.onOrderFormRendered
     },
              'panel1 button[id=continue]': {
               click: this.headerContinue
              },
              'panel1 button[id=add]': {
                  click: this.addHeader
              },
     'panel2' : {
      render : this.onDetailRendered,
      destroy: this.onDetailDestroyed 
     },
     'panel2 button[id=back2]': {
                  click: this.detailBack
              },
              'panel2 button[id=add2]': {
                  click: this.addDetail
              },
              'panel2 button[id=continue2]': {
                  click: this.detailContinue
              },
              'panel3' : {
      render : this.onPaymentRendered,
      destroy: this.onPaymentDestroyed 
     },
              'panel3 button[id=back3]': {
                  click: this.paymentBack
              },
              'panel3 button[id=continue3]': {
                  click: this.paymentContinue 
              }
    });
   },
   
   onDeliveryDetailFormRendered : function(myPanel) {
		console.log('I am testing this');
   },
   
   onOrderFormRendered : function(myPanel) {
    console.log('The Order Entry Panel was rendered');
   },
 
   onPanelRendered : function(myPanel) {
    //console.log('The Order Entry Panel was rendered');
   },
       
   onHeaderRendered : function(myPanel) {
    console.log('The header panel was rendered');
   },
    
   editHeader : function() {
    console.log('Editing Header');
   },
    
   headerContinue : function(button) {
    console.log('Continue on Header');
    panel = button.up('orderEntry');
    grid = panel.down('headerEntry');
    selectedRecords = grid.getSelectionModel().getSelection();
    /*if(selectedRecords.length === 0){
     Ext.MessageBox.alert('Slow down', 
       'Please select an Order first!'); 
     return;
    }
    
    panel.down('panel2 #orderNo')
     .setValue(selectedRecords[0].get('orderNo'));
    panel.down('panel2 #customerId')
     .setValue(selectedRecords[0].get('customerId'));
    panel.down('panel2 #myDate')
     .setValue(Ext.Date.dateFormat(selectedRecords[0]
     .get('myDate'), 'M d, Y'));
    panel.down('panel3 #orderNo')
     .setValue(selectedRecords[0].get('orderNo'));
    panel.down('panel3 #customerId')
     .setValue(selectedRecords[0].get('customerId'));
    panel.down('panel3 #myDate')
     .setValue(Ext.Date.dateFormat(selectedRecords[0]
     .get('myDate'), 'M d, Y')); */
	 
	 panel.getLayout().setActiveItem(1);
     
   },
    
   addHeader : function(button) {
    currentOrder++;
    var r = Ext.create('myApp.model.Order', {
                    orderNo: currentOrder,
                    customerId: 'Please enter Customer Id',
                    myDate: Ext.Date.clearTime(new Date())
                });
    this.getOrdersStore().insert(0, r);
    panel = button.up('orderEntry');
    grid = panel.down('headerEntry');
    grid.editingPlugin.startEditByPosition({row: 0, column: 1});
     
   },
    
   onDetailRendered : function(myPanel) {
    console.log('The detail panel was rendered');
   },
    
   onDetailDestroyed : function(myPanel) {
    console.log('The detail panel was destroyed');
   },
    
   detailBack : function(button) {
    console.log('Back to Header');
    panel = button.up('orderEntry');
    panel.getLayout().setActiveItem(0);
     
   },
    
   addDetail : function(button) {
    currentLine++;
    var r = Ext.create('myApp.model.Detail', {
     lineNo: currentLine,
                    itemNo: 'Please enter Item Number',
                    desc: '',
                    quantity: 1,
                    price: 10.99
                });
    this.getDetailsStore().insert(0, r);
    panel = button.up('orderEntry');
    grid = panel.down('detailEntry');
    grid.editingPlugin.startEditByPosition({row: 0, column: 1});
     
   },
    
   detailContinue : function(button) {
    console.log('Continue on Detail');
    var panel = button.up('orderEntry');
    //var grid = panel.down('detailEntry');
    //var store = grid.getStore();
    //var totalLines = 0;
    //var qtyCount = 0;
    //var orderTotal = 0;
    //store.each(function(record,idx){
     //totalLines++;
     //qtyCount = qtyCount + record.get('quantity'); 
     //orderTotal = orderTotal + 
     //(record.get('quantity') * record.get('price'));
    //});
     
    panel.getLayout().setActiveItem(2);
    //panel.down('panel3 #itemCount').setValue(totalLines);
    //panel.down('panel3 #qtyCount').setValue(qtyCount);
    //panel.down('panel3 #orderTotal').setValue(orderTotal);
     
   },
    
   onPaymentRendered : function(myPanel) {
    console.log('The payment panel was rendered');
   },
    
   onPaymentDestroyed : function(myPanel) {
    console.log('The payment panel was destroyed');
   },
 
   paymentContinue : function(button) {
    Ext.MessageBox.alert('End of Order...', 
      'Submitted successfully!'); 
   },
    
   paymentBack : function(button) {
    console.log('Back to Detail');
    panel = button.up('orderEntry');
    panel.getLayout().setActiveItem(1);
   }
    
});