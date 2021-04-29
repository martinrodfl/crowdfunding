function loadCurrentSession(deps) {
  return function (payload) {
    payload.currentSession = deps.getCurrentSession();
    return Promise.resolve(payload);
  };
}
function callGetCampaignsApi(deps) {
  return function (input) {
    return deps.getCampaignsApi(input.currentSession)
      .then(function (response) {
        input.campaigns = response.campaigns;
        return input;
      });
  }
}
function callRemoveAdminSessionApi(deps) {
  return function (payload) {
    return deps.removeAdminSessionApi(payload.currentSession)
      .then(function () {
        return payload;
      });
  };
}
function makeApiRequest(config) {
  return new Promise(function (resolve) {
    var apiUrl = 'http://localhost:8081';
    fetch(`${apiUrl}${config.path}`, {
      method: 'POST',
      body: config.body
    })
      .then(function (response) { return response.json(); })
      .then(function (json) { resolve(json); });
  });
}
function getSessionFromLocalStorage() {
  return localStorage.getItem('session');
}