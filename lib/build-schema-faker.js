const {random} = require('lodash');
const jsf = require('json-schema-faker');
const formats = require('./formats');

const DEFAULT_OPTIONALS_PROBABILITY = 0.5;

function buildSchemaFaker(params = {}) {
  const optionalsProbability = params.optionalsProbability || DEFAULT_OPTIONALS_PROBABILITY;

  const options = {
    optionalsProbability,
    failOnInvalidTypes: true
  };

  jsf.option(options);

  Object.values(formats).forEach(({name, generator}) => {
    jsf.format(name, generator);
  });

  return jsf;
}

module.exports = buildSchemaFaker;
