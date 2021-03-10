describe('removeAdminSession', function () {
  var fn = require('../../usecases/remove_admin_session.js');

  function findAdminSessionDoubleNull() {
    return null;
  }

  function findAdminSessionDoubleSuccess(params) {
    findAdminSessionDoubleSuccess.params = params;
    findAdminSessionDoubleSuccess.result = { _id: Math.random() };
    return Promise.resolve(findAdminSessionDoubleSuccess.result);
  }

  function deleteAdminSessionDouble(params) {
    deleteAdminSessionDouble.params = params;
    return Promise.resolve();
  }

  it('doesnt find admin session', function (done) {
    var deps = { findAdminSession: findAdminSessionDoubleNull };
    var input = { adminSessionId: Math.random() };
    fn(deps)(input).catch(function (output) {
      expect(output).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    });
  });

  it('finds and deletes session', function (done) {
    var deps = {
      findAdminSession: findAdminSessionDoubleSuccess,
      deleteAdminSession: deleteAdminSessionDouble,
    };
    var input = { adminSessionId: Math.random() };
    fn(deps)(input).then(function (output) {
      expect(findAdminSessionDoubleSuccess.params).toBe(input.adminSessionId);
      expect(deleteAdminSessionDouble.params).toBe(findAdminSessionDoubleSuccess.result._id);
      expect(output).toEqual({});
      done();
    });
  });
});