var mongoose = require('mongoose')
  , rbac = require('./lib/index');
  
  
var db = mongoose.connect('mongodb://localhost/telebuy_rbac');

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
  
  //console.log(User);
  
var user2 = new User({ username: 'amit' });

user2.save();

 user2.addRole('callcenteragent', function () {
		console.log(require('util').inspect(user2.roles[0]));
	 });
	
	
}