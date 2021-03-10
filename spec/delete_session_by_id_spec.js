const connect = require('../mongo/connect.js');

describe('deleteSessionById', function(){
    
    var fn = require('../delete_session_by_id.js');
    var db;
    var adminSession;
    
    beforeEach(function(done){
        
        connect()
        .then(function (database){ db = database})
        .then(function(){
            return db.dropDatabase();
        })
        .then(function (){
            adminSession = { mail: 'carlos@mail.com'};
            return db.collection('adminSessions').insertOne(adminSession)
        })
        .then(done)
    });
    
    it('Delete session by ID', function(done){
        fn(adminSession._id)
        .then(function(){
            return db.collection('adminSessions').findOne()
            .then(function (session){
                expect(session).toEqual(null)
                done();
            })
        })
        
    })
    
    it('ID is empty', function(done){
        fn()
        .then(function(){
            return db.collection('adminSessions').findOne()
            .then(function (session){
                expect(session).toEqual(adminSession)
                done();
            })
        })
    })
    
})