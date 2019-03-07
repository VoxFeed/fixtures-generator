const {random} = require('lodash');
const jsf = require('json-schema-faker');
const formats = require('./formats');

const options = {
  failOnInvalidTypes: true,
  optionalsProbability: random(0.3, 0.7) // 0.5 ±0.2
};

jsf.option(options);

Object.values(formats).forEach(({name, generator}) => {
  jsf.format(name, generator);
});

module.exports = jsf;
