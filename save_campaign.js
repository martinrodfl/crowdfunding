const connect = require('./mongo/connect.js');
var campaignsColection;

function validCampaign(campaignItem, campaignsCollection) { 
  // En base al modelo de negocio planteado validamos la campaña
  if ( campaignsCollection === null || campaignsCollection === undefined ) {
    return;
  } else {
    var isValid = true;
    campaignsCollection.find().forEach(element => {
      if (element.nombre === nombre) isValid = false
    });
    return isValid;
  }
}
// Puede ser que MongoDB ya agregue un identificador para cada registro en la coleccion?

module.exports = async function saveCampaign(campaignItem) {
  if (!campaignItem) return Promise.resolve();
  var db = await connect(); // tre
  campaignsColection = db.collection('campaigns');
  //var json = JSON.parse(campaignsColection);
  //console.log('CC', json);
  if (validCampaign(campaignItem)) {
        return campaignsColection.insertOne(
          campaignItem
        );
  }
};