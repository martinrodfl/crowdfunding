const connect = require('../../connect.js');
const objectId = require('../../object_id.js');

describe('setCampaignsUnselected', function () {
  var fn = require('../../queries/set_campaigns_unselected.js')
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
        campaigns = [
          {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random(),
            active: true
          },
          {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random(),
            active: true
          },
          {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random(),
            active: true
          },
          {
            adminId: objectId(),
            name: Math.random(),
            description: Math.random(),
            active: true
          }
        ];
        return conn.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });

  it('leaves campaigns unseected', function (done) {
    var input = {
      adminId: admin._id.toString(),
      campaignId: campaigns[0]._id.toString()
    }

    fn(input).then(function () {
      conn.collection('campaigns').find().toArray().then(function (dbCampaigns) {
        expect(dbCampaigns[0].active).toBe(true);
        expect(dbCampaigns[1].active).toBe(false);
        expect(dbCampaigns[2].active).toBe(false);
        expect(dbCampaigns[3].active).toBe(true);

        done();
      });
    })
  });
})