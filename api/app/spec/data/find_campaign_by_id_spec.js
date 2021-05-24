describe('findCampaigngById', function () {
  var fn = require('../../data/find_campaign_by_id.js')
  var doubleSuccessInput;
  var doubleSuccessOutput;

  function findCampaignByIdDoubleSuccess(input) {
    doubleSuccessInput = input;
    doubleSuccessOutput = { _id: Math.random() };
    return Promise.resolve(doubleSuccessOutput);
  };

  function findCampaignByIdDoubleNull(input) {
    return Promise.resolve(null);
  };

  it('calls dep and return campaign', function (done) {
    var deps = { findCampaignById: findCampaignByIdDoubleSuccess };
    var input = {
      campaignId: Math.random(),
      adminSession: {adminId: Math.random()}
    };
    var fnLista = fn(deps);
    fnLista(input).then(function (output) {
      expect(output).toBe(input);
      expect(doubleSuccessInput).toEqual({
        campaignId: input.campaignId,
        adminId: input.adminSession.adminId
      });
      expect(doubleSuccessOutput).toEqual(output.campaign);
      done();
    })
  })

  it('calls dep and return error', function (done) {
    var deps = { findCampaignById: findCampaignByIdDoubleNull };
    var input = {
      campaignId: Math.random(),
      adminSession: {adminId: Math.random()}
    };
    var fnLista = fn(deps);
    fnLista(input).catch(function (output) {
      expect(output).toEqual({ campaign: 'NOT_FOUND' })
      done();
    })
  })
})