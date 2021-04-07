function callRemoveAdminSessionApi(deps) {
  return function (payload) {
    // return deps.removeAdminSessionApi(payload.currentSession)
    //   .then(function () {
    //     return payload;
    //   });
    console.log('esto anda, nada que ver por aqui');
    return Promise.resolve(payload);
  };
}