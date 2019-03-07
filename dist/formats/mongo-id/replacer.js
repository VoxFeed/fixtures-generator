"use strict";

const ObjectId = require('bson-objectid');

module.exports = value => new ObjectId(value);