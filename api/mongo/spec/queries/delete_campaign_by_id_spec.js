const connect = require('../../connect.js');

describe('deleteCampignById', function() {
    var fn = require('../../queries/delete_campaign_by_id.js')
     , db
     , campaign;

     beforeEach(function(done) {
        connect()
        .then(function (_) { db = _; })
        .then(function() { return db.dropDatabase(); })
        .then(function () {
            campaign =  
             {  adminId: Math.random(),
                name: 1,
                description: Math.random()
             };
            return db.collection('campaigns').insertOne(campaign)
        })
        .then(done)
    });
    it('Delete campaign by id', function(done){
        fn(campaign._id)
        .then(function(){
            return db.collection('campaigns').findOne()
            .then(function(session){
                expect(session).toEqual(null);
                done();
                })
            })
    })
    it('ID is empty', function(done){
        fn()
        .then(function (){
            return db.collection('campaigns').findOne()
            .then(function (session){
                expect(session).toEqual(campaign);
                done();
            })
        })
    })
})
