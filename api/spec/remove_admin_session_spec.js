describe('removeAdminSession', function () {
  var request = require('./support/request.js')
    , connect = require('../mongo/connect.js')

  var port = 23232
    , server
    , db
    , adminSession;

  beforeAll(function () {
    server = require('../server.js')({
      sendEmail: function () {}
    });
    server.listen(port);
  });

  beforeEach(function (done) {
    connect()
      .then(function (_) { db = _; })
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        adminSession = {};
        return db.collection('adminSessions').insertOne(adminSession);
      })
      .then(done);
  });

  afterAll(function () {
    server.close();
  });

  it('doesnt find admin session', function (done) {
    request({
      port: port,
      path: '/remove_admin_session',
      body: JSON.stringify({ adminSessionId: Math.random() })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({
          adminSession: 'NOT_FOUND'
        });
      })
      .then(done);
  });

  it('finds and deletes admin session', function (done) {
    request({
      port: port,
      path: '/remove_admin_session',
      body: JSON.stringify({
        adminSessionId: adminSession._id
      })
    })
      .then(function (response) {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual('{}');
        return db.collection('adminSessions').find().toArray();
      })
      .then(function (sessions) {
        expect(sessions).toEqual([]);
      })
      .then(done);
  });
});