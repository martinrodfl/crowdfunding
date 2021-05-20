module.exports = function mongoObjectId(value) {
  try { return require("mongodb").ObjectId(value); }
  catch (e) { return null; }
};