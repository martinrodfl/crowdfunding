module.exports = function server(override) {
  var path = require('path');

  var deps = {
    findAdminSession: require('./mongo/queries/find_admin_session.js'),
    deleteAdminSession: require('./mongo/queries/delete_admin_session.js'),
  };

  Object.assign(deps, override);

  var routes = {
    '/remove_admin_session': require('./app/usecases/remove_admin_session.js')(deps),
  };

  var server = require('./http/create_server.js')(routes);

  return server;
};