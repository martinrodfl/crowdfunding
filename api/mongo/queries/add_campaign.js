module.exports = function addCampaign(input) {
  var campaign = {
    name: input.name,
    description: input.description,
    adminId: input.adminId,
  };
  return require('../connect.js')()
    .then(function (connection) {
      return connection.collection('campaigns').insertOne(campaign);
    })
    .then(function () {
      return campaign;
    });
};