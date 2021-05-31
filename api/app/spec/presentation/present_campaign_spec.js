describe('presentCampaign', function () {
  var fn = require('../../presentation/present_campaign.js');

  it('presents campaign', function (done) {
    var input = {
      campaign: Math.random(),
      infoPrivada: Math.random(),
      otro: Math.random(),
      basura: Math.random(),
    };
    fn(input).then(function (output) {
      expect(output).toEqual({ campaign: input.campaign });
      done();
    });
  });
});