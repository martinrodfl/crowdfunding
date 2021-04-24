function removeAdminSessionApi(deps) {
  return function (adminSessionId) {
    return deps.makeApiRequest({
      path: '/remove_admin_session',
      body: JSON.stringify({ adminSessionId: adminSessionId })
    });
  };
}