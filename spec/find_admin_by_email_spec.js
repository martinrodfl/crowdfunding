var connect = require('../mongo/connect.js');

describe('findAdminByEmail', function () {
  var fn = require('../find_admin_by_email.js');
  var admin;

  beforeAll(function (done) {
    connect()
      .then(function (client) {
        admin = { email: Math.random().toString() };
        return client.collection('admins').insertOne(admin);
      })
      .then(done);
  });

  afterAll(function (done) {
    connect().then(function (client) {
      client.dropDatabase();
      done();
    });
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