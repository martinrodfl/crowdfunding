var createServer = require('./server.js');
var server;
var port = '/home/vagrant/server.socket';

try { require('fs').unlinkSync(port); }
catch (e) { }

server = createServer(port);
server.listen(port);