describe('addCampaign', function () {
  var fn = require('../../usecases/add_campaign.js');

  function databaseFindAdminSessionDoubleSuccess(params) {
    databaseFindAdminSessionDoubleSuccess.params = params;
    databaseFindAdminSessionDoubleSuccess.result = { adminId: Math.random() };
    return Promise.resolve(databaseFindAdminSessionDoubleSuccess.result);
  }

  function databaseFindAdminSessionDoubleNull() {
    return Promise.resolve(null);
  }

  function saveCampaignDoubleSuccess(params) {
    saveCampaignDoubleSuccess.params = params;
    saveCampaignDoubleSuccess.result = { _id: Math.random() };
    return Promise.resolve(saveCampaignDoubleSuccess.result);
  }

  it('fails to find admin session', function (done) {
    var deps = {
      findAdminSession: databaseFindAdminSessionDoubleNull,
      saveCampaign: saveCampaignDoubleSuccess,
    };
    var input = {
      adminSessionId: Math.random(),
      newCampaign: {
        name: Math.random(),
        description: Math.random(),
      }
    };
    fn(deps)(input).catch(function (output) {
      expect(output).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    });
  });

  it('saves and returns campaign', function (done) {
    var deps = {
      findAdminSession: databaseFindAdminSessionDoubleSuccess,
      saveCampaign: saveCampaignDoubleSuccess,
    };
    var input = {
      adminSessionId: Math.random(),
      newCampaign: {
        name: Math.random(),
        description: Math.random(),
      }
    };
    fn(deps)(input).then(function (output) {
      expect(databaseFindAdminSessionDoubleSuccess.params)
        .toBe(input.adminSessionId);
      expect(saveCampaignDoubleSuccess.params).toEqual({
        name: input.newCampaign.name,
        description: input.newCampaign.description,
        adminId: databaseFindAdminSessionDoubleSuccess.result.adminId,
      });
      expect(output).toEqual({
        campaign: saveCampaignDoubleSuccess.result
      });
      done();
    });
  });
});