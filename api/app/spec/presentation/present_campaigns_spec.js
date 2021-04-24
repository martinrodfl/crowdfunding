describe('presentCampaigns', function () {
  var fn = require('../../presentation/present_campaigns.js');

  it('returns campaigns', function (done) {
    var input = {
      adminSessionId: Math.random(),
      adminSession: Math.random(),
      campaigns: Math.random(),
    };
    fn(input).then(function (output) {
      expect(output).toEqual({
        campaigns: input.campaigns
      });
      done();
    });
  });
});