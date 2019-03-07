"use strict";

require("core-js/modules/web.dom.iterable");

const {
  isArray,
  isPlainObject,
  isString
} = require('lodash');

const getReplacerSpec = require('./formats/utils/get-replacer-spec');

const formats = require('./formats');

const REPLACER_KEYWORD = require('./formats/utils/replacer-keyword');

function replaceFormats(input) {
  if (isPlainObject(input)) return handleObject(input);
  if (isArray(input)) return handleArray(input);
  if (isString(input)) return handleString(input);
  return handleOther(input);
}

function handleObject(input) {
  return Object.keys(input).reduce((response, key) => {
    response[key] = replaceFormats(input[key]);
    return response;
  }, {});
}

function handleArray(input) {
  return input.map(replaceFormats);
}

function handleString(input) {
  if (input.indexOf(REPLACER_KEYWORD) === -1) return input;
  const {
    name,
    value
  } = getReplacerSpec(input);
  return formats[name].replacer(value);
}

function handleOther(other) {
  return other;
}

module.exports = replaceFormats;