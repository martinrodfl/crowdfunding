const connect = require('../../connect.js');

describe('setCampaignSelected', function () {
  var fn = require('../../queries/set_campaign_selected.js')
    , conn
    , admin
    , campaign;

  beforeEach(function (done) {
    connect()
      .then(function (_conn) { conn = _conn; })
      .then(function () { return conn.dropDatabase(); })
      .then(function () {
        admin = {};
        return conn.collection('admins').insertOne(admin);
      })
      .then(function () {
        campaign = {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random(),
            active: false,
          };
        return conn.collection('campaigns').insertOne(campaign);
      })
      .then(done);
  });

  it('select campaign', function (done) {

    var input = {
      adminId: admin._id.toString(),
      campaignId: campaign._id.toString(),
      }

    fn(input).then(function(result){
      expect(result).toEqual(campaign);
      conn.collection('campaigns').findOne().then(function(dbcampaign){
        expect(dbcampaign.active).toEqual(true);
        done();
      });
    })  
  })
});