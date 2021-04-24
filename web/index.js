var deps = {
  removeAdminSessionApi: removeAdminSessionApi({ makeApiRequest: makeApiRequest }),
  getCampaignsApi: getCampaignsApi({ makeApiRequest: makeApiRequest }),
  getCurrentSession: getSessionFromLocalStorage,
  sendEvent: sendEvent,
};

var usecases = {
  removeAdminSession: removeAdminSession(deps),
  getCampaigns: getCampaigns(deps),
};

layout(usecases);
homePage(usecases);
homeTemplate(usecases);
logoutButton(usecases);
campaignsPage(usecases);
campaignsList(usecases);

window.addEventListener('load', function () {
  new Vue({ el: '#app' });
});