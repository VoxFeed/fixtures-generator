const generate = require('./generate');

class Generator {
  constructor(schemas) {
    if (!schemas) throw new Error('schemas was not defined.')
    this.schemas = schemas;
  }

  generate(args) {
    return generate(this.schemas, args);
  }
}

module.exports = Generator;
