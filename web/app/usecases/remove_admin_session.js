function removeAdminSession(deps) {
  return function (payload) {
    Promise.resolve(payload)
      .then(loadCurrentSession(deps))
      .then(callRemoveAdminSessionApi(deps))
      .then(sendAdminSessionRemovedEvent(deps));
  };
}