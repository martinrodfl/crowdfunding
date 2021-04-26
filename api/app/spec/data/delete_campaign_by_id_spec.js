describe('deleteCampaignById', function(){
 var fn = require('../../data/delete_campaign_by_id.js');

 function deleteCampaignByIdDouble(params){
   deleteCampaignByIdDouble.params = params;
   return Promise.resolve();
 }

 it('delete campaign by id', function(done){
    var deps = { deleteCampaignById: deleteCampaignByIdDouble};
    var input ={ 
      adminSessionId : Math.random(),
      adminSession : Math.random(),
      campaign: {_id: Math.random()} 
    };
    fn(deps)(input).then(function(output){
      expect(output).toBe(input);
      expect(deleteCampaignByIdDouble.params).toEqual(input.campaign._id);
      done();
    });
 });
});