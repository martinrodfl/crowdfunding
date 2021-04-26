module.exports = function deleteCampaignById(deps) {
  return async function (payload) {
    await deps.deleteCampaignById(payload.campaign._id);
    return payload;
  };
};