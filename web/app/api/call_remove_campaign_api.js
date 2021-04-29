function callRemoveCampaignApi(deps){
  return function (input){
    return deps.removeCampaignApi(input.currentSession)
    .then(function(){
      return input;
    })
  }
}