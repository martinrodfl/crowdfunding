describe('removeAdminSession', function () {
  var request = require('./support/request.js')
    , server
    , port = 23232;

  beforeAll(function () {
    server = require('../server.js')();
    console.log(server);
  });

  afterAll(function () {
    server.close();
  });

  it('doesnt find admin session', function (done) {
    request({
      path: '/remove_admin_session',
      port:  port,
      body: JSON.stringify({ adminSessionId: Math.random() })
    })
      .then(function (response) {
        console.log(response);
        done();
      })
  });

  it('finds admin session', function (done) {
    done();
  });
});