module.exports = function findAdminSession(adminSessionId) {
  return require('../connect.js')()
    .then(function (db) {
      return db.collection('adminSessions').findOne({
        _id: require('../object_id.js')(adminSessionId)
      })
    })
};