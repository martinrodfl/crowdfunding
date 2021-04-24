function getCampaigns(deps) {
  return function (input) {
    return Promise.resolve(input)
      .then(loadCurrentSession(deps))
      .then(callGetCampaignsApi(deps))
      .then(sendCampaignsEvent(deps));
  };
}