describe('findCampaignById', function(){
  var fn = require('../../data/find_campaign_by_id.js');

  function databaseFindCampaignByIdDoubleSuccess(params){
    databaseFindCampaignByIdDoubleSuccess.params = params;
    databaseFindCampaignByIdDoubleSuccess.result = Math.random();
    return databaseFindCampaignByIdDoubleSuccess.result;
  }

  function databaseFindCampaignIdDoubleNull() {
    return null;
  }

  it('doesnt find campaignId', function(done){
    var deps = {findCampaignById: databaseFindCampaignIdDoubleNull};
    var payload = {
      adminSession: { adminId: Math.random() },
      campaignId: Math.random()
    };
    fn(deps)(payload).catch(function(response){
      expect(response).toEqual({ campaign: 'NOT_FOUND'})
      done();
    })
  })

  it('find campaign', function(done){
    var deps = {findCampaignById : databaseFindCampaignByIdDoubleSuccess};
    var input = {
      adminSession: { adminId: Math.random() },
      campaignId: Math.random()
    }
    fn(deps)(input).then(function(output){
      expect(output).toBe(input);
      expect(databaseFindCampaignByIdDoubleSuccess.params).toEqual({
        campaignId: input.campaignId,
        adminId: input.adminSession.adminId
      });
      expect(output.campaign).toBe(databaseFindCampaignByIdDoubleSuccess.result);
      done();
    })
  })

});