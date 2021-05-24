module.exports = function findCampaignById(deps) {
  return function (input) {
    return deps.findCampaignById({
      campaignId: input.campaignId,
      adminId: input.adminSession.adminId
    }).then(function (campaign) {
      if (!campaign) {
        return Promise.reject({
          campaign: 'NOT_FOUND'
        });
      }
      input.campaign = campaign;
      return Promise.resolve(input);
    })
  };
};