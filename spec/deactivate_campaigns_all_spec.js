var connect = require('../mongo/connect.js');

describe('deactivateCampaignsAll', function () {
  var fn = require('../deactivate_campaigns_all.js');

  afterAll(function (done) {
    connect()
      .then(function (result) {
        try{
          result.forEach(element => {
              element.active = false;
          })
          result.dropDatabase();
        }
        catch(err){
          console.log(err); 
        }
      })
      .catch(function (err){
        console.log(err);
      })
      done();
    });

  it('Campaigns collection is empty', function (done) {
    fn()
      .then(function (result) {
        expect(result.toEqual([]));
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  it('Campaigns collection is not empty', function (done) {
    fn()
    .then(function(result){
      console.log('result', result);
      try{
        result.forEach(el => {
          expect(el.active).toEqual(false);
        });
      }catch(err){
        console.log(err);
      }
    });
    done();
  });

  // it('Campaigns collection is not empty & all status are already inactive', function (done) {
  //   fn().then(function(campaignsCollection){
  //     expect(campaignsCollection).toEqual(campaignsCollection);
  //     done();
  //   });
  // });
});