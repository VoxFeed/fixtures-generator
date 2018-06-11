const {ObjectId} = require('mongodb');

module.exports = (value) => new ObjectId(value);
