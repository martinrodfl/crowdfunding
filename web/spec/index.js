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
function sendAdminSessionRemovedEvent(deps) {
  return function (payload) {
    deps.sendEvent({
      type: 'adminSessionRemoved',
      data: {},
    });
    return Promise.resolve(payload);
  };
}
function sendCampaignsEvent(deps) {
  return function (input) {
    sendEvent({
      type: 'campaignsObtained',
      data: { campaigns: input.campaigns }
    });
    return Promise.resolve(input);
  };
}
function sendRemoveCampaignEvent(deps){   
  return function (input) {
    deps.sendEvent({
      type: 'removeCampaign',
      data: {campaignId: input.campaignId},
    });
    return Promise.resolve(input);
  };
}


describe('callRemoveCampaignApi',function(){
  
  function removeCampaignApiDoubleSuccess(params){
      removeCampaignApiDoubleSuccess.params = params;
      removeCampaignApiDoubleSuccess.result = {};
      return Promise.resolve(removeCampaignApiDoubleSuccess.result);
  };

  function removeCampaignApiDoubleFailSession(params){
    removeCampaignApiDoubleFailSession.params = params;
    removeCampaignApiDoubleFailSession.result = {adminSession: 'NOT_FOUND'}
    return Promise.reject(removeCampaignApiDoubleFailSession.result);
  }

  function removeCampaignApiDoubleFailCampaign(params){
    removeCampaignApiDoubleFailCampaign.params = params;
    removeCampaignApiDoubleFailCampaign.result = {campaign: 'NOT_FOUND'}
    return Promise.reject(removeCampaignApiDoubleFailCampaign.result);

  }


  it('remove campaign fails session', function(done){
    var deps = {
      removeCampaignApi: removeCampaignApiDoubleFailSession
    };

    var input = {
      currentSession: Math.random(),
      campaignId: Math.random()
    }

    callRemoveCampaignApi(deps)(input).catch(function(output){
      expect(output).toEqual(removeCampaignApiDoubleFailSession.result)
      done();
    });

  });

  it('remove campaign fails campaign', function(done){
    var deps = {
      removeCampaignApi: removeCampaignApiDoubleFailCampaign
    };

    var input = {
      currentSession: Math.random(),
      campaignId: Math.random()
    }

    callRemoveCampaignApi(deps)(input).catch(function(output){
      expect(output).toEqual(removeCampaignApiDoubleFailCampaign.result)
      done();
    });

  });

  it('remove campaign success', function(done){
    var deps = {
      removeCampaignApi: removeCampaignApiDoubleSuccess
    };

    var input = {
      currentSession: Math.random(),
      campaignId: Math.random()
    }

    callRemoveCampaignApi(deps)(input).then(function(output){
      expect(output).toEqual(input);
      expect(removeCampaignApiDoubleSuccess.params).toEqual({
        adminSessionId: input.currentSession,
        campaignId: input.campaignId,
      });
      done();
    });

  })
})
describe('sendRemoveCampaignEvent', function(){

  function sendEventDouble(params){
    sendEventDouble.params = params;
    return Promise.resolve();
  };

  it('sends event', function(done){
    var deps = {
      sendEvent: sendEventDouble,
    }

    var input= {
      currentSession: Math.random(),
      campaignId: Math.random() 
    }

    sendRemoveCampaignEvent(deps)(input).then(function(output){
      expect(output).toBe(input);
      expect(sendEventDouble.params).toEqual({
        type: 'removeCampaign',
        data: {campaignId: input.campaignId}, 
      })
      done();
    })   
  });

})
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