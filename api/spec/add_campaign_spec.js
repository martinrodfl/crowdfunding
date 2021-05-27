describe('/add_campaign', function () {
  var request = require('./support/request.js')
    , connect = require('../mongo/connect.js')
    , objectId = require('../mongo/object_id.js');

  var port = 23232
    , server
    , db;

  beforeAll(function () {
    server = require('../server.js')();
    server.listen(port);
  });

  afterAll(function () {
    server.close();
  });

  beforeEach(function (done) {
    connect()
      .then(function (conn) { db = conn; })
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        adminSession = { adminId: objectId() };
        return db.collection('adminSessions').insertOne(adminSession);
      })
      .then(done);
  });

  it('fails, no session', function (done) {
    request({
      port: port,
      path: '/add_campaign',
      body: JSON.stringify({ adminSessionId: Math.random() })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body))
          .toEqual({ adminSession: 'NOT_FOUND' });
        done();
      });
  });

  xit('validates new campaign', function (done) {
    request({
      port: port,
      path: '/add_campaign',
      body: JSON.stringify({
        adminSessionId: adminSession._id,
        newCampaign: {}
      })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
          'newCampaign.name': 'MISSING',
          'newCampaign.description': 'MISSING',
        });
        done();
      });
  });

  it('saves campaign', function (done) {
    var payload = {
      adminSessionId: adminSession._id,
      newCampaign: {
        name: Math.random(),
        description: Math.random(),
      }
    };
    request({
      port: port,
      path: '/add_campaign',
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        db.collection('campaigns').find().toArray().then(function (campaigns) {
          expect(campaigns).toEqual([
            {
              _id: campaigns[0]._id, /* Self-reference */
              name: payload.newCampaign.name,
              description: payload.newCampaign.description,
              adminId: adminSession.adminId,
            }
          ]);
          expect(JSON.parse(response.body)).toEqual({
            campaign: {
              _id: campaigns[0]._id.toString(),
              adminId: campaigns[0].adminId.toString(),
              name: campaigns[0].name,
              description: campaigns[0].description,
            }
          });
          done();
        });
      });
  });
});