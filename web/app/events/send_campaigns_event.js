function sendCampaignsEvent(deps) {
  return function (input) {
    sendEvent({
      type: 'campaignsObtained',
      data: { campaigns: input.campaigns }
    });
    return Promise.resolve(input);
  };
}