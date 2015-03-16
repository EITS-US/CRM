var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'CRMAgentService',
  description: 'CRM Agent desktop service',
  script: 'C:\\Users\\am015si\\WebstormProjects\\Telebuy\\CRM-desktop\\unified.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();