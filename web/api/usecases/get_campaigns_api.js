function getCampaignsApi(deps) {
  return function (adminSessionId) {
    return deps.makeApiRequest({
      path: '/get_campaigns',
      body: JSON.stringify({ adminSessionId: adminSessionId })
    });
  };
}