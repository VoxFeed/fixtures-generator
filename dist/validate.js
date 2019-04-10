"use strict";

require("core-js/modules/web.dom.iterable");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  validate
} = require('jsonschema');

const {
  isPlainObject,
  isArray
} = require('lodash');

const options = {
  disableFormat: true
};
const schemaOptionsByType = {
  object: {
    additionalProperties: false
  }
};

const validateFixture = (initialSchema, fixture) => {
  const instance = convertToStrings(fixture);
  const schema = recursivelyAddOptions(initialSchema, schemaOptionsByType);
  const results = validate(instance, schema, options);
  if (hasErrors(results)) return handleErrors(results);
  return fixture;
};

const convertToStrings = obj => JSON.parse(JSON.stringify(obj));

const hasErrors = results => (results.errors || []).length > 0;

const handleErrors = results => {
  console.error(results);
  throw new Error('Validation schema failed for fixture');
};

function recursivelyAddOptions(schema, options = {}) {
  if (isArray(schema)) return schema.map(s => recursivelyAddOptions(s, options));
  if (!isPlainObject(schema)) return schema;
  const parsedSchema = Object.keys(schema).reduce((response, key) => {
    const value = schema[key];
    return _objectSpread({}, response, {
      [key]: recursivelyAddOptions(value, options)
    });
  }, {});
  const newProperties = options[schema.type] || {};
  return _objectSpread({}, newProperties, parsedSchema);
}

module.exports = validateFixture;