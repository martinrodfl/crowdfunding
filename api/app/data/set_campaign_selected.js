module.exports = function setCampaignSelected(deps) {
  return function (input) {

    var doubleinputs = {
      campaignId: input.campaignId,
      adminId: input.adminSession.adminId,
    }

    var promise1 = deps.setCampaignSelected(doubleinputs);

    var promise2 = deps.setCampaignsUnselected(doubleinputs);

    return Promise.all([ promise1, promise2 ])
    
    .then(function(){
      return input;
    })
    /*
    return Promise.resolve()
    .then(function(){
      return deps.setCampaignSelected({
        campaignId: input.campaignId,
        adminId: input.adminSession.adminId,
      })
    })
    .then(function(){
      return deps.setCampaignsUnselected({
        campaignId: input.campaignId,
        adminId: input.adminSession.adminId,
      })
    })
    .then(function () {
      return input;
    })*/
  }
};