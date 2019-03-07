const ObjectId = require('bson-objectid');
const FORMAT_NAME = require('./name');
const wrapReplacer = require('../utils/wrap-replacer');

module.exports = () => {
  const id = new ObjectId();
  const value = id.toString();
  return wrapReplacer(FORMAT_NAME, value);
};
