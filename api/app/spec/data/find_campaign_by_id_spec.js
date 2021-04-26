describe('findCampaignById', function(){
  var fn = require('../../data/find_campaign_by_id.js');

  function databaseFindCampaignIdDoubleNull() {
    return null;
  }

  it('doesnt find campaignId', function(done){
    var deps = {findCampaignById: databaseFindCampaignIdDoubleNull};
    var payload = {adminSessionId: Math.random(), campaignId: Math.random()};
    fn(deps)(payload).catch(function(response){
      expect(response).toEqual({ campaignId: 'NOT_FOUND'})
      done();
    })
  })
});