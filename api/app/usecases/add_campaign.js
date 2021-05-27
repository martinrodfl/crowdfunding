module.exports = function addCampaign(deps) {
  return function (input) {
    return Promise.resolve(input)
      .then(require('../data/find_admin_session.js')(deps))
      .then(require('../data/save_campaign.js')(deps))
      .then(require('../presentation/present_campaign.js'));
  };
};