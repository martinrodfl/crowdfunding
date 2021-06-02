describe('setCampaignSelected', function () {
  var fn = require('../../data/set_campaign_selected.js')

  var doubleSuccessInput;
  var doubleSuccessUnselectedInput;

  function setCampaignSelectedDoubleSuccess(input) {
    doubleSuccessInput = input;
    return Promise.resolve();
  }

  function setCampaignsUnselectedDoubleSuccess(input){
    doubleSuccessUnselectedInput = input;
    return Promise.resolve();
  }

  it('sets campaign selected active', function (done) {

    var deps = { 
      setCampaignSelected: setCampaignSelectedDoubleSuccess,
      setCampaignsUnselected: setCampaignsUnselectedDoubleSuccess 
    }
    
    var input = {
      campaignId: Math.random(),
      adminSession: { adminId: Math.random() },
    }

    fn(deps)(input).then(function (output) {
      expect(output).toBe(input);
      expect(doubleSuccessInput).toEqual({
        campaignId: input.campaignId,
        adminId: input.adminSession.adminId,
      });
      expect(doubleSuccessUnselectedInput).toEqual({
        campaignId: input.campaignId,
        adminId: input.adminSession.adminId,
      });
      done();
    })
  })
})