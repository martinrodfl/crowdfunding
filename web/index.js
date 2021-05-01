function getCampaigns(deps) {
  return function (input) {
    return Promise.resolve(input)
      .then(loadCurrentSession(deps))
      .then(callGetCampaignsApi(deps))
      .then(sendCampaignsEvent(deps));
  };
}
function removeAdminSession(deps) {
  return function (payload) {
    Promise.resolve(payload)
      .then(loadCurrentSession(deps))
      .then(callRemoveAdminSessionApi(deps))
      .then(sendAdminSessionRemovedEvent(deps));
  };
}
function removeCampaign(deps) {
  return function (payload) {
    Promise.resolve(payload)
      .then(loadCurrentSession(deps))
      .then(callRemoveCampaignApi(deps))
      .then(sendRemoveCampaignEvent(deps));
  };
}
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
function callRemoveCampaignApi(deps){
  return function (input){
    return deps.removeCampaignApi({
      adminSessionId: input.currentSession,
      campaignId: input.campaignId
    })
    .then(function(){
      return input;
    })
  }
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
function makeHttpRequest(input){
  return fetch(API_URL + input.path, {
    method : 'POST',
    body : input.body
  }).then(function(response) {
    return response.json()
  })
}
function getSessionFromLocalStorage() {
  return localStorage.getItem('session');
}