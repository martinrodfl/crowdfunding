describe('/remove_campaign', function () {
  var request = require('./support/request.js')
    , connect = require('../mongo/connect.js')
    , objectId = require('../mongo/object_id.js');

  var port = 23232
    , server
    , db;

  var adminSession
    , campaigns;

  beforeAll(function () {
    server = require('../server.js')();
    server.listen(port);
  });
  
  afterAll(function () {
    server.close();
  });

  beforeEach(function (done) {
    connect()
      .then(function (_) { db = _; })
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        adminSession = { adminId: objectId() };
        return db.collection('adminSessions').insertOne(adminSession);
      })
      .then(function () {
        campaigns = [
          { adminId: objectId(), name: 'a' },
          { adminId: objectId(), name: 'b' },
          { adminId: adminSession.adminId, name :'c' },
          { adminId: objectId(), name: 'd' },
        ];
        return db.collection('campaigns').insertMany(campaigns);
      })
      .then(done);
  });

  it('cant find admin session', function (done) {
    request({
      port: port,
      path: '/remove_campaign',
      body: JSON.stringify({ adminSessionId: Math.random() })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ adminSession: 'NOT_FOUND' });
        done();
      });
  });

  it('cant find campaign', function (done) {
    request({
      port: port,
      path: '/remove_campaign',
      body: JSON.stringify({ 
        adminSessionId: adminSession._id,
        campaignId: Math.random(),
        })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ campaign: 'NOT_FOUND' });
        done();
      });
  });

  it('find and delete campaign', function(done) {
    request({
      port: port,
      path: '/remove_campaign',
      body: JSON.stringify({ 
        adminSessionId: adminSession._id,
        campaignId: campaigns[2]._id,
        })
    })
    .then(function (response) {
      db.collection('campaigns').find().toArray().then(function(campaignArray){
        expect(campaignArray).toEqual([campaigns[0],campaigns[1],campaigns[3]])
        done();
      })
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({});
    });
  })
});