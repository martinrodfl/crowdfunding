describe('findAdminSession', function () {
  var fn = require('../../data/find_admin_session.js');

  function databaseFindAdminSessionDoubleSuccess(params) {
    databaseFindAdminSessionDoubleSuccess.params = params;
    databaseFindAdminSessionDoubleSuccess.result = Math.random();
    return databaseFindAdminSessionDoubleSuccess.result;
  }

  function databaseFindAdminSessionDoubleNull() {
    return null;
  }

  it('doesnt find session', function (done) {
    var deps = { findAdminSession: databaseFindAdminSessionDoubleNull };
    var payload = { adminSessionId: Math.random() };
    fn(deps)(payload).catch(function (response) {
      expect(response).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    });
  });

  it('find session', function (done) {
    var deps = { findAdminSession: databaseFindAdminSessionDoubleSuccess };
    var input = { adminSessionId: Math.random() };
    fn(deps)(input).then(function (output) {
      expect(output).toBe(input);
      expect(databaseFindAdminSessionDoubleSuccess.params).toBe(input.adminSessionId);
      expect(output.adminSession).toBe(databaseFindAdminSessionDoubleSuccess.result);
      done();
    });
  });
});