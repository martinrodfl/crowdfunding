describe('removeCampaign', function(){
  
 function loadCurrentSessionDouble(params){
   loadCurrentSessionDouble.adminSessionId = params.currentSession;
   return Promise.resolve(loadCurrentSessionDouble.adminSessionId);
 }

 function callRemoveCampaignApiDoubleSuccess(params){
  callRemoveCampaignApiDoubleSuccess.params = params;
  callRemoveCampaignApiDoubleSuccess.result = {};
  return Promise.resolve(removeCampaignApiDoubleSuccess.result);
 };

  function callRemoveCampaignApiDoubleFailSession(params){
  callRemoveCampaignApiDoubleFailSession.params = params;
  callRemoveCampaignApiDoubleFailSession.result = {adminSession: 'NOT_FOUND'}
  return Promise.reject(removeCampaignApiDoubleFailSession.result);
  }

  function callRemoveCampaignApiDoubleFailCampaign(params){
  callRemoveCampaignApiDoubleFailCampaign.params = params;
  callRemoveCampaignApiDoubleFailCampaign.result = {campaign: 'NOT_FOUND'}
  return Promise.reject(removeCampaignApiDoubleFailCampaign.result);
  }

  function sendRemoveCampaignEventDouble(params){
    sendRemoveCampaignEventDouble.result=params;
    return Promise.resolve(sendRemoveCampaignEventDouble.result);
  };

 it('removeCampaign campaign success', function(done){

  var deps = {
    loadCurrentSession: loadCurrentSessionDouble,
  }
  var input = {
    currentSession: Math.random(),
    campaignId: Math.random(),
  }
  removeCampaign(deps)(input).then(function(output){

    done();
  })

 })
})