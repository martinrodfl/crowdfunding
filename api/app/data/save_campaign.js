module.exports = function saveCampaign(deps) {
  return function (input) {
    return deps.saveCampaign({
      name: input.newCampaign.name,
      description: input.newCampaign.description,
      adminId: input.adminSession.adminId,
    })
      .then(function (campaign) {
        input.campaign = campaign;
        return input;
      });
  };
};