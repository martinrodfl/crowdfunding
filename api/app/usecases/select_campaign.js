module.exports = function(deps){
    return function(input){
        return Promise.resolve(input)
        .then(require('../data/find_admin_session.js')(deps))
        .then(require('../data/find_campaign_by_id')(deps))
        .then(require('../data/set_campaign_selected')(deps))
        .then(require('../presentation/present_campaign'))
    }
};