function callGetCampaignsApi(deps) {
  return function (input) {
    return deps.getCampaignsApi(input.currentSession)
      .then(function (response) {
        input.campaigns = response.campaigns;
        return input;
      });
  }
}