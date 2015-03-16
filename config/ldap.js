var ActiveDirectory = require('activedirectory');


var ad = new ActiveDirectory({
url: 'ldap://10.0.0.103:389',
baseDN: 'dc=TBUYCORP,dc=COM',
username: 'anuj',
password: 'AdAnAs021524'
});

var sAMAccountName = 'anuj';


ad.getGroupMembershipForUser(sAMAccountName, function(err, groups) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }

  if (! groups) console.log('User: ' + sAMAccountName + ' not found.');
  else console.log(JSON.stringify(groups));
});



