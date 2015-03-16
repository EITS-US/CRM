var mongoose = require('mongoose')
  , rbac = require('./lib/index');
  
  
var db = mongoose.connect('mongodb://localhost/TeleBuyCRM');


if(db)
{
	console.log("connected");
	
	var UserSchema = mongoose.Schema({

    username: {type:String},
	status: {type:String, default:"A"},
	createdAt : {type:Date, default:Date.now}
	
  });
  
  UserSchema.plugin(rbac.plugin);
  var User = mongoose.model('User', UserSchema);
  
  
  
    User.findOne({"username" : "manager_user"}, function (err, user) {
  
		user.hasRole('manager', function (err, hasmanager) {
                console.log('8', hasmanager);
		});
		
		user.can('create', 'CallRecord', function (err, can) {
			 console.log('9', can);
		});
  
  });
  
  
}