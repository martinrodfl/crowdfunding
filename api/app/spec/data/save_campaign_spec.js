describe('saveCampaign', function () {
  var fn = require('../../data/save_campaign.js');

  function saveCampaignDoubleSuccess(params) {
    saveCampaignDoubleSuccess.params = params;
    saveCampaignDoubleSuccess.result = { _id: Math.random() };
    return Promise.resolve(saveCampaignDoubleSuccess.result);
  }

  it('calls saveCampaign function', function (done) {
    var deps = { saveCampaign: saveCampaignDoubleSuccess };
    var input = {
      adminSession: {
        adminId: Math.random(),
      },
      newCampaign: {
        name: Math.random(),
        description: Math.random(),
      }
    };
    fn(deps)(input).then(function (output) {
      expect(output).toBe(input);
      expect(saveCampaignDoubleSuccess.params).toEqual({
        name: input.newCampaign.name,
        description: input.newCampaign.description,
        adminId: input.adminSession.adminId,
      });
      expect(output.campaign).toBe(saveCampaignDoubleSuccess.result);
      done();
    });
  });
});