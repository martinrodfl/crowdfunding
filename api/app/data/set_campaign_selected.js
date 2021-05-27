module.exports = function setCampaignSelected(deps) {
  return function (input) {
    var promise1 = deps.setCampaignSelected({
      campaignId: input.campaignId,
      adminId: input.adminSession.adminId,
    })

    var promise2 = deps.setCampaignsUnselected({
      campaignId: input.campaignId,
      adminId: input.adminSession.adminId,
    })

    return Promise.all([promise1, promise2]).then(() => {
      return input;
    });

  }
};