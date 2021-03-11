module.exports = function removeAdminSession(deps) {
  return function(payload) {
    return Promise.resolve(payload)
      .then(require('../data/find_admin_session.js')(deps))
      .then(require('../data/delete_admin_session.js')(deps))
      .then(require('../presentation/present_empty.js'));
  };
};