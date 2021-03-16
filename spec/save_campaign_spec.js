var connect = require('../mongo/connect.js');

describe('saveCampaign', function () {
  var fn = require('../save_campaign.js'), db, campaignItem;
  
  beforeAll(function (done) {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    connect()
       .then(function(database){ db = database })
       .then(function () {
         // deberia de recorrer la collection para ver si ya existe o lo encajo de una?
         campaignItem = { id: Math.random() };
         return db.collection('campaignsCollection').insertOne(campaignItem);
       })
       done();
  });

  it('Campaign is added successfully', function (done) {
    var campaignItem = {id: Math.random()};
    fn(campaignItem).then(function () {
      expect(db.collection('campaignsCollection').find({
        id: campaignItem.id
      }));
      done(); 
    });
  });
});