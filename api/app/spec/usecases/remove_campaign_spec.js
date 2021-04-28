describe('removeCampaign', function (){
  var fn = require('../../usecases/remove_campaign.js');

  function findAdminSessionDoubleSuccess(params) {
    findAdminSessionDoubleSuccess.params = params;
    findAdminSessionDoubleSuccess.result = { 
      _id: Math.random(),
      adminId: Math.random(),
    };
    return Promise.resolve(findAdminSessionDoubleSuccess.result);
  }

  function findAdminSessionDoubleNull() {
    return null;
  }

  function findCampaignByIdDoubleSuccess(params){
    findCampaignByIdDoubleSuccess.params = params;
    findCampaignByIdDoubleSuccess.result = { _id: Math.random()};
    return Promise.resolve(findCampaignByIdDoubleSuccess.result);
  }

  function findCampaignByIdDoubleNull() {
    return Promise.reject({ campaign: 'NOT_FOUND' });
  }

  function deleteCampaignByIdDouble(params){
    deleteCampaignByIdDouble.params = params;
    return Promise.resolve();
  }

  it('finds session, finds campaign, deletes campaign', function(done){
    var deps = {
      findAdminSession: findAdminSessionDoubleSuccess,
      findCampaignById: findCampaignByIdDoubleSuccess,
      deleteCampaignById: deleteCampaignByIdDouble,
    };
    var input = { 
      adminSessionId:  Math.random() ,
      campaignId: Math.random()
    };
    fn(deps)(input).then(function(output){
      expect(findAdminSessionDoubleSuccess.params).toEqual(input.adminSessionId);
      expect(findCampaignByIdDoubleSuccess.params).toEqual({
        adminId: findAdminSessionDoubleSuccess.result.adminId,
        campaignId: input.campaignId
       });
      expect(deleteCampaignByIdDouble.params).toEqual(findCampaignByIdDoubleSuccess.result._id);
      expect(output).toEqual({})
      done();
    })

  })
  it('finds sessions, doesnt find campaign', function(done){
    var deps = {
      findAdminSession: findAdminSessionDoubleSuccess,
      findCampaignById: findCampaignByIdDoubleNull,
    };
    var input = { 
      adminSessionId:  Math.random() ,
      campaignId: Math.random()
    };
    fn(deps)(input).catch(function(output){
      expect(output).toEqual({ campaign: 'NOT_FOUND'});
      done();
    });
  });
  
  it('doesnt find admin session', function (done) {
    var deps = { findAdminSession: findAdminSessionDoubleNull };
    var input = { 
      adminSessionId:  Math.random() ,
      campaignId: Math.random()
    };
    fn(deps)(input).catch(function (output) {
      expect(output).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    });
  });
})