module.exports = function findCampaignById(deps){
  return async function (payload){
    var campaign = await deps.findCampaignById({
      campaignId: payload.campaignId,
      adminId: payload.adminSession.adminId
    });
    if (!campaign) return Promise.reject({ campaign: 'NOT_FOUND' });
    payload.campaign = campaign;
    return Promise.resolve(payload)
  }
}