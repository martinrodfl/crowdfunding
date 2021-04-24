const connect = require('../connect.js');
const objectId = require('../object_id.js');

module.exports = function findCampaignsByAdminId(adminId) {
  return connect()
    .then(function (connection) {
      return connection.collection('campaigns')
        .find({ adminId: objectId(adminId) })
        .toArray();
    });
};