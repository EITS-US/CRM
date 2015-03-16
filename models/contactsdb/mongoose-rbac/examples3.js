var mongoose = require('mongoose')
  , rbac = require('./lib/index');
  
  
var db = mongoose.connect('mongodb://localhost/TeleBuyCRM');

if(db)
{
	console.log("connected");
	
var UserSchema = mongoose.Schema({

    username: {type:String},
	status: {type:String, default:"A"},
	createdAt : {type:Date, default:Date.now},
	password : {type:String, default:'password'}
	
  });
  
  UserSchema.plugin(rbac.plugin);
  
  var User = mongoose.model('User', UserSchema);
  
  
   rbac.init({
    manager: [
	
	  ['update', 'CallRecord'],
      ['viewall', 'CallRecord']
 
    ],
	lead: [
      ['viewteam', 'CallRecord']
    ],
    callagent: [
      ['viewmine', 'CallRecord']
    ]
  }, function (err, manager, lead, callagent) {
  
	var user1 = new User({ username: 'manager_user'});
	var user2 = new User({ username: 'lead_user'});
	var user3 = new User({ username: 'agent_user1'});
	
	user1.save();
	user2.save();
	user3.save();
	
	 user1.addRole('manager', function () {
		console.log(require('util').inspect(user1.roles[0]));
	 });
	 
	  user2.addRole('lead', function () {
		console.log(require('util').inspect(user2.roles[0]));
	 });
	 
	 user3.addRole('callagent', function () {
		console.log(require('util').inspect(user3.roles[0]));
	 });
  
  
  }
  
  )
  
 
	
	
}
