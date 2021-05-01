function removeCampaign(deps) {
  return function (payload) {
    Promise.resolve(payload)
      .then(loadCurrentSession(deps))
      .then(callRemoveCampaignApi(deps))
      .then(sendRemoveCampaignEvent(deps));
  };
}