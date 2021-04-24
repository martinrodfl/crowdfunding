function callRemoveAdminSessionApi(deps) {
  return function (payload) {
    return deps.removeAdminSessionApi(payload.currentSession)
      .then(function () {
        return payload;
      });
  };
}