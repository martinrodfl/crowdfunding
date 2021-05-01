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