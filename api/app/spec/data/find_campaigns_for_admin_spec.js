describe('findCampaignsForAdmin', function () {
  var fn = require('../../data/find_campaigns_for_admin.js');

  function findCampaignsByAdminIdDouble(params) {
    findCampaignsByAdminIdDouble.params = params;
    findCampaignsByAdminIdDouble.result = Math.random();
    return Promise.resolve(findCampaignsByAdminIdDouble.result);
  }

  it('appends campaigns to payload', function (done) {
    var deps = { findCampaignsByAdminId: findCampaignsByAdminIdDouble };
    var input = {
      adminSessionId: Math.random(),
      adminSession: { adminId: Math.random() }
    };
    fn(deps)(input).then(function (output) {
      expect(output).toBe(input);
      expect(findCampaignsByAdminIdDouble.params)
        .toBe(input.adminSession.adminId);
      expect(output.campaigns).toBe(findCampaignsByAdminIdDouble.result);
      done();
    });
  });
});