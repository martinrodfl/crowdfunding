module.exports = function getCampaigns(deps) {
  return function (input) {
    return Promise.resolve(input)
      .then(require('../data/find_admin_session.js')(deps))
      .then(require('../data/find_campaigns_for_admin.js')(deps))
      .then(require('../presentation/present_campaigns.js'));
  };
};