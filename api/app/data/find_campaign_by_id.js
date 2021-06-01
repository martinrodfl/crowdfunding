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
      console.log('input', input)
      return Promise.resolve(input);
    })
  };
};