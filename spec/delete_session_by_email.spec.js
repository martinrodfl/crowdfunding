const connect = require('../mongo/connect.js');

describe('deleteSessionById', function(){
    
    var fn = require('../delete_session_by_id.js');
    var db;
    var admin;
    
    beforeEach(function(done){
        connect()
        .then(function (database){ db = database})
        .then(function (){
            admin = { mail: 'carlos@mail.com'};
            return db.collection('adminSessions').insertOne(admin)
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
        fn(admin._id)
        .then(function(){
            return db.collection('adminSessions').findOne(admin._id);
        })
        // .then(function (sessions){
        //     console.log('id is: ', sessions._id) //por que me sale undefined aca?
        //     console.log('admin id is:', admin._id)
        //     db.collection('adminSessions').findOne(sessions._id)
        .then(function (resultados){
            // console.log(resultados) //objeto encontrado
            expect(resultados._id).toEqual(admin._id)
            return db.collection('adminSessions').deleteOne(resultados)
            // .then(function (eliminado){
            //     return db.collection('adminSessions').find()
            //     // console.log('resultados ahora: ', eliminado)
            // })
            .then(function (busqueda){
                console.log(busqueda)
                console.log('se supone que borro =>', busqueda._id) //tendria que dar null?
                expect(busqueda._id).toBe(undefined)
                done();
            })
        })
        
    })
    
})