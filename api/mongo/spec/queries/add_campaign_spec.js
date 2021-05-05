const connect = require('../../connect.js');

describe('addCampaign', function () {
  var fn = require('../../queries/add_campaign.js')
    , connection;

  beforeEach(function(done) {
    connect()
      .then(function (conn) { connection = conn; })
      .then(function() { return connection.dropDatabase(); })
      .then(done);
  });

  it('saves campaign', function (done) {
    var input = {
      name: Math.random(),
      description: Math.random(),
      adminId: Math.random(),
    };
    fn(input).then(function (returnedCampaign) {
      connection
        .collection('campaigns')
        .find()
        .toArray()
        .then(function (campaigns) {

          // aca validamos que guarda bien
          expect(campaigns.length).toBe(1);
          expect(campaigns[0].name).toEqual(input.name);
          expect(campaigns[0].description).toEqual(input.description);
          expect(campaigns[0].adminId).toEqual(input.adminId);

          // aca validamos que devuelve bien
          expect(returnedCampaign._id).toEqual(campaigns[0]._id);
          expect(returnedCampaign.name).toEqual(campaigns[0].name);
          expect(returnedCampaign.description).toEqual(campaigns[0].description);
          expect(returnedCampaign.adminId).toEqual(campaigns[0].adminId);

          done();
        });
    });
  });
});