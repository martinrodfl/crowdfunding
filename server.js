module.exports = function server(override) {
  var deps = {
    findAdminSession: require('./mongo/queries/find_admin_session.js'),
    deleteAdminSession: require('./mongo/queries/delete_admin_session.js'),
  };

  Object.assign(deps, override);

  var routes = {
    '/remove_admin_session': require('./app/usecases/remove_admin_session.js')(deps),
  };

  return require('./http/create_server.js')(routes);
};