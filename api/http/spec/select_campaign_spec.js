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
        .then(done);
    });
  
    it('fails, no session', function (done) {
      request({
        port: port,
        path: '/select_campaign ',
        body: JSON.stringify({ adminSessionId: Math.random() })
      })
        .then(function (response) {
          expect(response.statusCode).toBe(400);
          expect(JSON.parse(response.body))
            .toEqual({ adminSession: 'NOT_FOUND' });
          done();
        });
    })
})