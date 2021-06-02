const connect = require('../../connect.js');
const objectId = require('../../object_id.js');

describe('setCampaignsUnselected', function () {
  var fn = require('../../queries/set_campaigns_unselected')

  , conn
  , admin
  , campaigns;

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
            active: true,
          },
          {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random(),
            active: true,
          },
          {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random(),
            active: true,
          },
          {
            adminId: objectId(),
            name: Math.random(),
            description: Math.random(),
            active: true,
          }
        ];
        return conn.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });

  it('leaves campaigns unselected', function (done) {

    var input = {
      adminId: admin._id,
      campaignId: campaigns[0]._id,
    }

    fn(input).then(function(){
      conn.collection('campaigns').find()
        .toArray().then(function(dbcampaigns){
          expect(dbcampaigns[0].active).toEqual(true);
          expect(dbcampaigns[1].active).toEqual(false);
          expect(dbcampaigns[2].active).toEqual(false);
          expect(dbcampaigns[3].active).toEqual(true);
          done();
        });
    })
  });
})