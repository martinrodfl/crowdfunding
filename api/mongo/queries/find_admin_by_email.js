const connect = require('../connect.js');

module.exports = async function findAdminByEmail(email) {
  var client = await connect();
  return client.collection('admins').findOne({
    email: email
  });
};