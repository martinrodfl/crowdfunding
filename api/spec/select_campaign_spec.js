describe('/select_campaign', function () {
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
      .then(function () {
        campaigns = [
          {
            adminId: adminSession.adminId,
            name: Math.random(),
            description: Math.random(),
            active: true
          },
          {
            adminId: adminSession.adminId,
            name: Math.random(),
            description: Math.random(),
            active: true
          },
          {
            adminId: adminSession.adminId,
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
        return db.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });

  it('fails, no session', function (done) {
    request({
      port: port,
      path: '/select_campaign',
      body: JSON.stringify({ adminSessionId: Math.random() })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body))
          .toEqual({ adminSession: 'NOT_FOUND' });
        done();
      });
  });

  it('fails, no find campaign', function (done) {
    request({
      port: port,
      path: '/select_campaign',
      body: JSON.stringify({
        adminSessionId: adminSession._id,
        campaignId: objectId()
      })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body))
          .toEqual({ campaign: 'NOT_FOUND' });
        done();
      });
  });

  it('pass, select campaign', function (done) {
    request({
      port: port,
      path: '/select_campaign',
      body: JSON.stringify({
        adminSessionId: adminSession._id,
        campaignId: campaigns[0]._id
      })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        console.log('RESPUESTA', JSON.parse(response.body));
        expect(JSON.parse(response.body))
          .toEqual({
            campaign: {
              _id: campaigns[0]._id.toString(),
              adminId: campaigns[0].adminId.toString(),
              name: campaigns[0].name,
              description: campaigns[0].description,
              active: campaigns[0].active
            }
          });
        done();
      });
  });
});