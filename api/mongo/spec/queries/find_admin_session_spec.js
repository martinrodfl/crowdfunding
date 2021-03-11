describe('findAdminSession', function () {
  var connect = require('../../connect.js')
    , fn = require('../../queries/find_admin_session.js')
    , db
    , adminSession;

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

  it('finds admin session', function (done) {
    var input = adminSession._id;
    fn(input).then(function (result) {
      expect(result).toEqual(adminSession);
      done();
    });
  });

  it('doesnt find admin session', function (done) {
    var input = Math.random();
    fn(input).then(function (result) {
      expect(result).toBeNull();
      done();
    });
  });

  it('works if id is not objectId', function (done) {
    var input = adminSession._id.toString();
    fn(input).then(function (result) {
      expect(result).toEqual(adminSession);
      done();
    });
  });
});