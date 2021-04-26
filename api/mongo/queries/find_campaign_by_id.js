const connect = require('../connect.js');
var objectId = require('../object_id.js');

module.exports = function findCampaignById(data){ 
    return connect()
        .then(function(connection){
            return connection.collection('campaigns')
                .findOne({adminId: objectId(data.adminId), _id: objectId(data.campaignId)})
        });
};