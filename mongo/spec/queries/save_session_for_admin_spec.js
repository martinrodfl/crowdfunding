const connect = require('../../connect.js');

describe('saveSessionForAdmin', function () {
  var fn = require('../../queries/save_session_for_admin.js');
  var db;

  beforeEach(function (done) {
    connect()
      .then(function (client) { db = client; })
      .then(function () { return db.dropDatabase(); })
      .then(done);
  });

  it('saves session', function (done) {
    var adminId = Math.random();
    fn(adminId)
      .then(function () {
        return db.collection('adminSessions').find().toArray();
      })
      .then(function (sessions) {
        expect(sessions.length).toBe(1);
        expect(sessions[0].adminId).toEqual(adminId);
        done();
      });
  });

  it('doesnt save if adminId is undefined', function (done) {
    fn()
      .then(function () {
        return db.collection('adminSessions').find().toArray();
      })
      .then(function (sessions) {
        expect(sessions.length).toBe(0);
        done();
      });
  });
});