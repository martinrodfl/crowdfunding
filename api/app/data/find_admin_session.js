module.exports = function findAdminSession(deps) {
  return async function (payload) {
    var adminSession = await deps.findAdminSession(payload.adminSessionId);
    if (!adminSession) return Promise.reject({ adminSession: 'NOT_FOUND' });
    payload.adminSession = adminSession;
    return Promise.resolve(payload);
  }
};