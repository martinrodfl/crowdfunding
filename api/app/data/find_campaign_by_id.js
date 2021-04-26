module.exports = function findCampaignById(deps){
  return async function (payload){
    var adminSession = await deps.findAdminSession(payload.adminSessionId);
    if (!adminSession) return Promise.reject({ adminSession: 'NOT_FOUND' });
    return Promise.resolve(payload)
  }
}