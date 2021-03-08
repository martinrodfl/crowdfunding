const connect = require('./mongo/connect.js')

module.exports = async function deleteSessionById(id){
    console.log(id);

    if (!id) return Promise.resolve();
    db = await connect();
    return db.collection('adminSessions').deleteOne({
        adminId: id //mas detalle sobre esto
    })
}