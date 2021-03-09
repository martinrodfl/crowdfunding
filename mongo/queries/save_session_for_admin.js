const connect = require('../connect.js');

module.exports = async function saveSessionForAdmin(adminId) {
  if (!adminId) return Promise.resolve();
  var db = await connect();
  return db.collection('adminSessions').insertOne({
    adminId: adminId
  });
};