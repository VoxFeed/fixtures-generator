const chai = require('chai');
const {expect} = chai;
const Generator = require('../../index')

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
    expect(() => new Generator()).to.throw('schemas was not defined.');
  });

  it('should notify that fixture schema is not found', () => {
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'bikes', recipe: ['schemas']
    })).to.throw('Fixtures schema not found for type: bikes');
  });

  it('should notify that at least one recipe or quantity is required', () => {
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'brand'
    })).to.throw('At least one parameter ("recipe" or "quantity") is required.');
  });

  it('should notify that type is required', () => {
    const userRecipe = [{ name: 'john', gender: 'male'}];
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      recipe: userRecipe
    })).to.throw('type is not defined');
  });

  it('should notify that "recipe must be an array"', () => {
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'brand', recipe: 'test'
    })).to.throw('"recipe" must be an array. Received: test');
  });

  it('should notify that "recipe must be an array" when recibe an object', () => {
    const userRecipe = { name: 'john', gender: 'male'};
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'user', recipe: userRecipe
    })).to.throw('"recipe" must be an array. Received: [object Object]');
  });

  it('should notify that "quantity" must be positive integer', () => {
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'brand', quantity: 'test'
    })).to.throw('"quantity" must be a positive integer. Received: test');
  });

  it('should notify that "quantity" must be positive integer when receive a float', () => {
    const quantity = 1.6;
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'brand', quantity
    })).to.throw(`"quantity" must be a positive integer. Received: ${quantity}`);
  });

  it('should notify that "quantity" must be positive integer when receive a negative number', () => {
    const quantity = -3;
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'brand', quantity
    })).to.throw(`"quantity" must be a positive integer. Received: ${quantity}`);
  });

  it('should notify that recipe not match with type', () => {
    const userRecipe = [{ name: 'john', gender: 'male'}];
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'brand', recipe: userRecipe
    })).to.throw('Validation schema failed for fixture');
  });

  it('should get correct schema in the result', () => {
    const userRecipe = [{ name: 'john', gender: 'male'}];
    const generator = new Generator(schemas);
    const result = generator.generate({ type: 'user', recipe: userRecipe });
    expect(result[0].name).to.be.equal(userRecipe[0].name);
    expect(result[0].gender).to.be.equal(userRecipe[0].gender);
  });

  it('should get correct quantity of objects', () => {
    const quantityToGenerate = 3
    const generator = new Generator(schemas);
    const result = generator.generate({ type: 'user', quantity: quantityToGenerate });
    expect(result.length).to.be.equal(quantityToGenerate);
  });

  it('should notify that recipe has more than params need it', () => {
    const userRecipe = [{ name: 'john', gender: 'male', lastName: 'doe'}];
    const generator = new Generator(schemas);
    expect(() => generator.generate({
      type: 'user', recipe: userRecipe
    })).to.throw('Validation schema failed for fixture');
  });
});
