//import { Campaign } from './models/campaign';
const connect = require('./mongo/connect.js');


var campaignsCollection = []; // llamado a la base de datos en el servidor 
                             // para traer la coleccion de campañas actuales.

function deactivateCampaign(campaignItem){
    if (campaignItem.active === true) campaignItem.active = false;
    return campaignItem;
}

module.exports = async function deactivateCampaignsAll() {
  var db = await connect();
  var campaignsColection = db.collection('campaignsCollection');
  if (!campaignsCollection) return Promise.resolve();
  //if (campaignsCollection === []) return Promise.resolve();
  console.log('esta es la col de campanas', campaignsCollection); 
  try{    
    return campaignsColection.map(element => {
          deactivateCampaign(element);
        })
  }
  catch(err){
        console.log('ERROR: ',err);
  }
};
