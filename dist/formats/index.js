"use strict";

const date = require('./date');

const mongoId = require('./mongo-id');

module.exports = {
  [date.name]: date,
  [mongoId.name]: mongoId
};