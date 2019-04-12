const generate = require('./generate');
const buildSchemaFaker = require('./build-schema-faker');

class Generator {
  constructor(schemas, options) {
    if (!schemas) throw new Error('schemas was not defined.')
    this.schemas = schemas;
    this.schemaFaker = buildSchemaFaker(options);
  }

  generate(args) {
    return generate(this.schemaFaker, this.schemas, args);
  }
}

module.exports = Generator;
