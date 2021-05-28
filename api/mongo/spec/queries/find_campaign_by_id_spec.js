const connect = require('../../connect.js');
const objectId = require('../../object_id.js');

describe('findCampaignById', function () {
  var fn = require('../../queries/find_campaign_by_id.js')
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
          },
          {
            adminId: objectId(),
            name: Math.random(),
            description: Math.random()
          },
        ];
        return conn.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });


  it('fails, wrong adminId', function(done){
    var input = {
      adminId: Math.random(),
      campaignId: campaigns[0]._id.toString()
    }

    fn(input).then(function(result){
      expect(result).toEqual(null);
      done();
    })
  });

  it('fails, wrong campaignId',function(done){
    var input = {
      adminId: admin._id.toString(),
      campaignId: Math.random(),
    }

    fn(input).then(function(result){
      expect(result).toEqual(null);
      done();
    })
  });

  it('find and return campaign', function(done){
    var input = {
      adminId: admin._id.toString(),
      campaignId: campaigns[0]._id.toString(),
    }

    fn(input).then(function(result){
      expect(result).toEqual(campaigns[0]);
      done();
    })
  });
});