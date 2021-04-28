module.exports = function removeCampaign(deps){
  return  function(input){
    return Promise.resolve(input)
    .then(require('../data/find_admin_session.js')(deps))
    .then(require('../data/find_campaign_by_id.js')(deps))
    .then(require('../data/delete_campaign_by_id.js')(deps))
    .then(require('../presentation/present_empty.js'))
  };
}
