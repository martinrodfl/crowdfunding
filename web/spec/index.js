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
    return deps.removeCampaignApi(input.currentSession)
    .then(function(){
      return input;
    })
  }
}
describe('callRemoveCampaignApi',function(){
  it('function', function(){
    expect(1).toEqual(5);
  })
})