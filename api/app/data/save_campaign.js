module.exports = function saveCampaign(deps) {
    //console.log('DEPS', deps);
    return function(input) {
        return deps.saveCampaign({//Llamo al doble (dependencia) con los params.
            name: input.newCampaign.name,
            description: input.newCampaign.description,
            adminId: input.adminSession.adminId,
        })//LLAMO A LA DEPENDENCIA
            .then(function(campaign){
                //console.log('CAMPAIGN',campaign);
                input.campaign = campaign;
                return input;
            });
        //return Promise.resolve(input);
    };
};