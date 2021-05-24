module.exports = function (input) {
  var conn = require('../connect.js');
  var objectId = require('../object_id.js');

  return conn().then(function (db) {
    return db.collection('campaigns').updateMany({
      _id: { $ne: objectId(input.campaignId) },
      adminId: objectId(input.adminId),
    }, {
      $set: { 'active': false }
    });
  })
};