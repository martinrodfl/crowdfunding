var objectId = require('./object_id.js');

module.exports = function objectIdFromDate(time) {
  return objectId(`${Math.floor(time/1000).toString(16)}0000000000000000`);
}
