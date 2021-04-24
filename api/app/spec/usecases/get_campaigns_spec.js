describe('getCampaigns', function () {
  var fn = require('../../usecases/get_campaigns.js');

  function databaseFindAdminSessionDoubleSuccess(params) {
    databaseFindAdminSessionDoubleSuccess.params = params;
    databaseFindAdminSessionDoubleSuccess.result = { adminId: Math.random() };
    return databaseFindAdminSessionDoubleSuccess.result;
  }

  function databaseFindAdminSessionDoubleNull() {
    return null;
  }
  
  function findCampaignsByAdminIdDouble(params) {
    findCampaignsByAdminIdDouble.params = params;
    findCampaignsByAdminIdDouble.result = Math.random();
    return Promise.resolve(findCampaignsByAdminIdDouble.result);
  }

  it('wrong session, returns error', function (done) {
    var deps = { findAdminSession: databaseFindAdminSessionDoubleNull };
    var input = {};
    fn(deps)(input).catch(function (output) {
      expect(output).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    });
  });

  it('returns campaigns', function (done) {
    var deps = {
      findAdminSession: databaseFindAdminSessionDoubleSuccess,
      findCampaignsByAdminId: findCampaignsByAdminIdDouble,
    };
    var input = { adminSessionId: Math.random() };
    fn(deps)(input).then(function (output) {
      expect(databaseFindAdminSessionDoubleSuccess.params)
        .toBe(input.adminSessionId);
      expect(findCampaignsByAdminIdDouble.params)
        .toBe(databaseFindAdminSessionDoubleSuccess.result.adminId);
      expect(output).toEqual({ campaigns: findCampaignsByAdminIdDouble.result });
      done();
    });
  });
});