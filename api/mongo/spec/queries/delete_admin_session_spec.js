const connect = require('../../connect.js');

describe('deleteSessionById', function() {
    var fn = require('../../queries/delete_admin_session.js')
      , db
      , adminSession;
    
    beforeEach(function(done) {
        connect()
        .then(function (_) { db = _; })
        .then(function() { return db.dropDatabase(); })
        .then(function () {
            adminSession = { mail: 'carlos@mail.com' };
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