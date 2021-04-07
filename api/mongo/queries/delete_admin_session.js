const connect = require('../connect.js')

module.exports = async function deleteSessionById(id) {
    var db = await connect();
    return db.collection('adminSessions').deleteOne({
        _id: id 
    })
};