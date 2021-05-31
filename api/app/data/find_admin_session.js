module.exports = function findAdminSession(deps) {//viene del require del test y recibe dependencias

  return async function (payload) { //retorna otra funcion que recibe el payload(input) LA MAGIA ESTA ACA

    var adminSession = await deps.findAdminSession(payload.adminSessionId);// tiene acceso al deps y al input
    if (!adminSession) return Promise.reject({ adminSession: 'NOT_FOUND' });
    payload.adminSession = adminSession;
    return Promise.resolve(payload);
  }
};