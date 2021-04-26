const connect = require('../connect.js')

module.exports = async function deleteCampaignById(id) {
    var db = await connect();
    return db.collection('campaigns').deleteOne({
        _id: id 
    })
};
    