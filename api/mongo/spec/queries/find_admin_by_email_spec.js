var connect = require('../../connect.js');

describe('findAdminByEmail', function () {
  var fn = require('../../queries/find_admin_by_email.js')
  , conn
  , admin;

  beforeAll(function (done) {
    connect()
      .then(function (_conn) { conn = _conn; })
      .then(function () { return conn.dropDatabase(); })
      .then(function () {
        admin = { email: Math.random().toString() };
        return conn.collection('admins').insertOne(admin);
      })
      .then(done);
  });

  it('doesnt find admin, email is undefined', function (done) {
    fn().then(function (result) {
      expect(result).toBeNull();
      done();
    });
  });

  it('doesnt find admin', function (done) {
    fn(Math.random()).then(function (result) {
      expect(result).toBeNull();
      done();
    });
  });

  it('finds admin', function (done) {
    fn(admin.email).then(function (result) {
      expect(result).toEqual(admin);
      done();
    });
  });
});