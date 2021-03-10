describe('createServer', function () {
  var fn = require('../create_server.js')
    , port = 23232;

  it('routes request', function (done) {
    var requestBody = { random: Math.random() };
    var server = fn({
      '/testing': function (payload) {
        expect(payload).toEqual(requestBody);
        done();
        return Promise.resolve();
      }
    });
    server.listen(port);
    var request = require('http').request({
      hostname: 'localhost',
      port: port,
      path: '/testing',
      method: 'POST',
    });
    request.write(JSON.stringify(requestBody));
    request.end();
  });
});