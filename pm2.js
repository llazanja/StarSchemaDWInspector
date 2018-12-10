// Based on: 
// https://github.com/jmorrell/pm2-example/blob/master/pm2.js
var pm2 = require('pm2');

var instances = process.env.WEB_CONCURRENCY || -1;
var maxMemory = process.env.WEB_MEMORY || 512;

console.log(`Starting server with ${instances} instances.`);

var options = {
  name: 'api-server',
  script: 'bin/www',
  cwd: 'server',
  // Heroku only provides one port, node uses only one core, we need to use
  // clustering to enable usage of all cores -- this will start proxy in front
  // and load balance requests on child processes. 
  exec_mode: 'cluster',
  instances: instances,
  max_memory_restart : `${maxMemory}M`,
};

// Start without starting PM2 daemon in the background
// - Heroku automatically restarts
// - prevents when testing locally long-running processes
pm2.connect(true, (err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  pm2.start(options, (err, proc) => {
    if (err) {
        return console.error('Error while launching applications', err.stack || err);
    }

    console.log('PM2 and application has been successfully started');

    // Display logs in standard output
    pm2.launchBus((err, bus) => {
      console.log('[PM2] Log streaming started');

      bus.on('log:out', function(packet) {
       console.log('[App:%s:%s] %s', packet.process.name, packet.process.pm_id, packet.data);
      });

      bus.on('log:err', function(packet) {
        console.error('[App:%s:%s][Err] %s', packet.process.name, packet.process.pm_id, packet.data);
      });
    });
  });
});
