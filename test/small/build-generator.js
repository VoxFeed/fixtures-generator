const buildGenerator = require('../../generate.js');
const chai = require('chai');
const expect = chai.expect;

describe('Build generator instance', () => {
  const schemas = {
    user: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        gender: {
          type: 'string'
        }
      }
    },
    brand: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
  
        }
      }
    }
  };

  it('should notify that schemas are required', () => {    
    expect(() => buildGenerator()).to.throw('schemas was not defined.');
  });

  it('should notify that fixture schema is not found', () => {
    const generator = buildGenerator([]);
    expect(() => generator.generateFixtures({
      type: 'bikes', recipe: ['schemas']
    })).to.throw('Fixtures schema not found for type: bikes');
  });

  it('should notify that at least one recipe or quantity is required', () => {    
    const generator = buildGenerator(schemas);
    expect(() => generator.generateFixtures({
      type: 'brand'
    })).to.throw('At least one parameter ("recipe" or "quantity") is required.');
  });

  it('should notify that "recipe must be an array"', () => {    
    const generator = buildGenerator(schemas);
    expect(() => generator.generateFixtures({
      type: 'brand', recipe: 'test'
    })).to.throw('"recipe" must be an array. Received: test');
  });

  it('should notify that "quantity" must be positive integer', () => {    
    const generator = buildGenerator(schemas);
    expect(() => generator.generateFixtures({
      type: 'brand', quantity: 'test'
    })).to.throw('"quantity" must be a positive integer. Received: test');
  });

  it('should get correct schema in the result', () => {   
    const userRecipe = [{ name: 'test brand', gender: 'male'}];
    const generator = buildGenerator(schemas);
    expect(() => generator.generateFixtures({
      type: 'brand', recipe: userRecipe
    })).to.throw('Validation schema failed for fixture');
  });

  it('should get correct schema in the result', () => {   
    const userRecipe = [{ name: 'test brand', gender: 'male'}];
    const generator = buildGenerator(schemas);
    const result = generator.generateFixtures({ type: 'user', recipe: userRecipe });
    expect(result[0].name).to.be.equal(userRecipe[0].name);
    expect(result[0].gender).to.be.equal(userRecipe[0].gender);
  });

  it('should get correct quantity of objects', () => {
    quantityToGenerate = 3
    const generator = buildGenerator(schemas);
    const result = generator.generateFixtures({ type: 'user', quantity: quantityToGenerate });
    expect(result.length).to.be.equal(quantityToGenerate);
  });
});
