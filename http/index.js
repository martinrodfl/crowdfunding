var createServer = require('./create_server.js');

var server = createServer({
  '/remove_admin_session': require('')
});

server.listen(80);