var connect = require('../../connect.js');
var objectId = require('../../object_id.js');


describe('findCampaignById', function(){
    var fn = require('../../queries/find_campaign_by_id.js')
    , conn
    , admin
    , campaign;

    beforeEach(function(done){
        connect()
            .then(function (_conn) { conn = _conn; })
            .then(function () { return conn.dropDatabase(); })
            .then(function () {
                admin = {};
                return conn.collection('admins').insertOne(admin);
            })
            .then(function () {
                 campaign = {
                    adminId: admin._id,
                    name: Math.random(),
                    description: Math.random()
                }
                return conn.collection('campaigns').insertOne(campaign)
            })
            .then(done)
    });

    it('returns campaign by id', function(done){
        var data = {adminId: admin._id.toString(), campaignId: campaign._id.toString()};
        fn(data).then(function(result){
            expect(result).toEqual({
                _id: campaign._id,
                adminId: campaign.adminId,
                name: campaign.name,
                description: campaign.description
            });
            done();
        });
    });

    it('return null, wrong adminId', function(done){
        var data = {adminId: objectId() , campaignId: campaign._id.toString()};
        fn(data).then(function(result){
            expect(result).toBeNull();
            done();
        });
    })

    it('return null, wrong campaignId', function(done){
        var data = {adminId: admin._id.toString() , campaignId: objectId()};
        fn(data).then(function(result){
            expect(result).toBeNull();
            done();
        });
    })

})
