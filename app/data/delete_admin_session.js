module.exports = function deleteAdminSession(deps) {
  return async function (payload) {
    await deps.deleteAdminSession(payload.adminSession._id);
    return payload;
  };
};