module.exports = function server(override) {
  var deps = {
    findAdminSession: require('./mongo/queries/find_admin_session.js'),
    deleteAdminSession: require('./mongo/queries/delete_admin_session.js'),
    findCampaignsByAdminId: require('./mongo/queries/find_campaigns_by_admin_id.js'),
    saveCampaign: require('./mongo/queries/add_campaign.js'),
  };

  Object.assign(deps, override);

  var routes = {
    '/remove_admin_session': require('./app/usecases/remove_admin_session.js')(deps),
    '/get_campaigns': require('./app/usecases/get_campaigns.js')(deps),
    '/add_campaign': require('./app/usecases/add_campaign.js')(deps),
  };

  var server = require('./http/create_server.js')(routes);

  return server;
};