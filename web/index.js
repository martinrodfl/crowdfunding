var deps = {
  removeAdminSessionApi: removeAdminSessionApi({ makeApiRequest: makeApiRequest }),
  getCurrentSession: getSessionFromLocalStorage,
  sendEvent: sendEvent,
};

var usecases = {
  removeAdminSession: removeAdminSession(deps)
};

layout(usecases);
homePage(usecases);
homeTemplate(usecases);
logoutButton(usecases);

window.addEventListener('load', function () {
  new Vue({ el: '#app' });
});