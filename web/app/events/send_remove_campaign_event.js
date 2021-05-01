function sendRemoveCampaignEvent(deps){   
  return function (input) {
    deps.sendEvent({
      type: 'removeCampaign',
      data: {campaignId: input.campaignId},
    });
    return Promise.resolve(input);
  };
}

