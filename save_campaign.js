const connect = require('./mongo/connect.js');

function validCampaign(campaignItem, campaignsCollection) { 
  // En base al modelo de negocio planteado validamos la campaña
  try{
    if ( campaignsCollection !== null || campaignsCollection !== undefined ) {
          var isValid = true;
          campaignsCollection.forEach(element => {
              if (element.nombre === nombre) isValid = false;
          });
          return isValid;
      }
  }catch(err){
    console.log('ERROR: ', err);
  }
}
// Puede ser que MongoDB ya agregue un identificador para cada registro en la coleccion?

module.exports = async function saveCampaign(campaignItem) {
  if (!campaignItem) return Promise.resolve();
  var db = await connect(); // tre
  var campaignsColection = db.collection('campaignsCollection');
  if (validCampaign(campaignItem, campaignsColection)) {
      try{
        return campaignsColection.insertOne(
          campaignItem
        );
      }catch(err){
        console.log('ERROR: ', err);
      }
  }
};