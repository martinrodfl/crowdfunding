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