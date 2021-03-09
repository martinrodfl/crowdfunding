describe('deleteAdminSession', function () {
  var fn = require('../../app/delete_admin_session.js');

  function deleteAdminSessionDouble(params) {
    deleteAdminSessionDouble.params = params;
    return Promise.resolve();
  }

  it('deletes session', function (done) {
    var deps = { deleteAdminSession: deleteAdminSessionDouble };
    var input = { adminSession: { _id: Math.random() } };
    fn(deps)(input).then(function (output) {
      expect(output).toBe(input);
      expect(deleteAdminSessionDouble.params).toBe(input.adminSession._id);
      done();
    });
  });
});