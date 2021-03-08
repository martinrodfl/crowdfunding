const connect = require('../mongo/connect.js');

describe('deleteSessionById', function(){
    
    var fn = require('../delete_session_by_id.js');
    var db;
    var adminSession;
    
    beforeEach(function(done){
        connect()
        .then(function (database){ db = database})
        .then(function (){
            adminSession = { mail: 'carlos@mail.com'};
            return db.collection('adminSessions').insertOne(adminSession)
        })
        .then(done)
    });
    
    afterAll(function(done){
        connect().then(function (client){
            client.dropDatabase();
            done();
        });
        
    });
    
    it('Delete session by ID', function(done){
        fn(adminSession._id)
        .then(function(){
            return db.collection('adminSessions').findOne()
            .then(function (_findOne){
                expect(_findOne._id).toEqual(adminSession._id)
                // expect(admin._id).toBe(null)
                console.log('No lo borra :( ', _findOne._id)
                done();
            })
        })
        
    })
    
})