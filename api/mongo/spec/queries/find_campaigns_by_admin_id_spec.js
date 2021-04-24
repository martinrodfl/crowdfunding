const connect = require('../../connect.js');
const objectId = require('../../object_id.js');

describe('findCampaignsByAdminId', function () {
  var fn = require('../../queries/find_campaigns_by_admin_id.js')
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
            description: Math.random()
          },
          {
            adminId: objectId(),
            name: Math.random(),
            description: Math.random()
          },
          {
            adminId: admin._id,
            name: Math.random(),
            description: Math.random()
          }
        ];
        return conn.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });

  it('returns campaigns owned by admin', function (done) {
    fn(admin._id.toString()).then(function (result) {
      expect(result).toEqual([
        {
          _id: campaigns[0]._id,
          adminId: campaigns[0].adminId,
          name: campaigns[0].name,
          description: campaigns[0].description,
        },
        {
          _id: campaigns[2]._id,
          adminId: campaigns[2].adminId,
          name: campaigns[2].name,
          description: campaigns[2].description,
        },
      ]);
      done();
    });
  });
});