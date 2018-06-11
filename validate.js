const {validate} = require('jsonschema');

const options = {
  disableFormat: true
};

const overwriteSchema = {
  additionalProperties: false
};

const validateFixture = (initialSchema, fixture) => {
  const instance = convertToStrings(fixture);
  const schema = Object.assign({}, initialSchema, overwriteSchema);
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

module.exports = validateFixture;
