module.exports = function setCampaignSelected(deps){
    return function (input) {
        return deps.setCampaignSelected ({
            campaignId: input.campaignId,
            adminSession: input.adminSession.adminId,
            active: input.active,
        }).then(function (campaign) {
            input.campaign = campaign;
            if(input.active === false){
                input.active = true;
            }
            return Promise.resolve(input);
        })
    }
};