module.exports = function findCampaignsForAdmin(deps) {
  return function (input) {
    return deps.findCampaignsByAdminId(input.adminSession.adminId)
      .then(function (campaigns) {
        input.campaigns = campaigns;
        return input;
      });
  };
};