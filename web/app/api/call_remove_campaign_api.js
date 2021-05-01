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