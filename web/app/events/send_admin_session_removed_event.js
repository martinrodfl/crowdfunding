function sendAdminSessionRemovedEvent(deps) {
  return function (payload) {
    deps.sendEvent({
      type: 'adminSessionRemoved',
      data: {},
    });
    return Promise.resolve(payload);
  };
}