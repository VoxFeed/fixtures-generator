"use strict";

const REPLACER_KEYWORD = require('./replacer-keyword');

module.exports = (name, value) => {
  const spec = JSON.stringify({
    name,
    value
  });
  return `${REPLACER_KEYWORD}${spec}`;
};