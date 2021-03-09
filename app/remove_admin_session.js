module.exports = function removeAdminSession(deps) {
  return function(payload) {
    return Promise.resolve(payload)
      .then(require('./find_admin_session.js')(deps))
      .then(require('./delete_admin_session.js')(deps))
      .then(require('./present_empty.js'));
  };
};