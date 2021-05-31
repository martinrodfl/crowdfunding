describe('findAdminSession', function () {
  var fn = require('../../data/find_admin_session.js');

  
  // DOBLE QUE SIMULA SESION EXITOSA
  function databaseFindAdminSessionDoubleSuccess(params) {
    databaseFindAdminSessionDoubleSuccess.params = params;
    databaseFindAdminSessionDoubleSuccess.result = Math.random();
    return Promise.resolve(databaseFindAdminSessionDoubleSuccess.result);
  }

  // DOBLE QUE SIMULA SESION NULA
  function databaseFindAdminSessionDoubleNull() {
    return Promise.resolve(null);
  }

  it('doesnt find session', function (done) {
    var deps = { findAdminSession: databaseFindAdminSessionDoubleNull };//aca le pasamos el doble (dependencia)
    var payload = { adminSessionId: Math.random() };
    fn(deps)(payload).catch(function (response) {
      expect(response).toEqual({ adminSession: 'NOT_FOUND' });
      done();
    });
  });

  it('find session', function (done) {
    var deps = { findAdminSession: databaseFindAdminSessionDoubleSuccess };//aca le pasamos el doble (dependencia)
    var input = { adminSessionId: Math.random() };
    fn(deps)(input).then(function (output) {
      expect(output).toBe(input);
<<<<<<< HEAD
      expect(databaseFindAdminSessionDoubleSuccess.params).toBe(input.adminSessionId);//consultamos al doble como fue llamado
      expect(output.adminSession).toBe(databaseFindAdminSessionDoubleSuccess.result);
=======
      expect(databaseFindAdminSessionDoubleSuccess.params)
        .toBe(input.adminSessionId);
      expect(output.adminSession)
        .toBe(databaseFindAdminSessionDoubleSuccess.result);
>>>>>>> master
      done();
    });
  });
});