const {isArray, isInteger, mergeWith} = require('lodash');
const schemaFaker = require('./schema-faker');
const validateFixture = require('./validate');
const replaceFormats = require('./replace-formats');

const generateFixtures = (schemas, params) => {
  const {type} = params;
  if (!type) throw new Error('type is not defined')
  const schema = schemas[type];

  validateParams(params);
  if (!schema) throw new Error(`Fixtures schema not found for type: ${type}`);

  const recipe = getRecipes(params);
  return recipe.map(r => generateFixture(schema, r));
};

const generateFixture = (schema, recipe) => {
  const raw = schemaFaker(schema);
  const base = replaceFormats(raw);

  const fixture = mergeWith({}, base, recipe, (baseValue, recipeValue, key, object) => {
    if (isArray(recipeValue)) return recipeValue;
    if (recipeValue === undefined) object[key] = undefined;
  });

  return validateFixture(schema, fixture);
};

const isPositive = num => isInteger(num) && num >= 0;

const validateParams = (params) => {
  const {recipe, quantity} = params;
  if (!recipe && !quantity) throw new Error(`At least one parameter ("recipe" or "quantity") is required. Received: ${params}`);
  if (recipe && !isArray(recipe)) throw new Error(`"recipe" must be an array. Received: ${recipe}`);
  if (quantity && !isPositive(quantity)) throw new Error(`"quantity" must be a positive integer. Received: ${quantity}`);
};

const fill = (array, fillWith, start, end) => {
  for (let i = start; i < end; i++) array[i] = {};
  return array;
};

const getRecipes = (params) => {
  const quantity = params.quantity || 0;
  const recipe = params.recipe || [];
  const initalLength = recipe.length;
  const actualLength = Math.max(quantity, initalLength);

  return fill(recipe, {}, initalLength, actualLength);
};
module.exports = generateFixtures;
