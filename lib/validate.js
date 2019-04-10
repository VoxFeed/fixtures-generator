const {validate} = require('jsonschema');
const {isPlainObject, isArray} = require('lodash');

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

const handleErrors = (results) => {
  console.error(results);
  throw new Error('Validation schema failed for fixture');
};

function recursivelyAddOptions(schema, options = {}) {
  if (isArray(schema)) return schema.map(s => recursivelyAddOptions(s, options));

  if (!isPlainObject(schema)) return schema;

  const parsedSchema = Object.keys(schema).reduce((response, key) => {
    const value = schema[key];
    return {...response, [key]: recursivelyAddOptions(value, options)};
  }, {});

  const newProperties = options[schema.type] || {};

  return { ...newProperties, ...parsedSchema };
}

module.exports = validateFixture;
