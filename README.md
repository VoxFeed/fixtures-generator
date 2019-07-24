# Fixtures Generator

This project was created to solve the most common problems with fixtures that we faced while building tests at [VoxFeed](https://voxfeed.com).

### Objetives
* Let each test to have its own fixtures, to **prevent sharing fixtures across the tests suites**. 
* Specify **a schema for each fixture**. To make sure everyone still valid.
* **Customize fixtures** as required by each test.
* Make easier to **find tests with invalid fixtures**. Just update the schema an find all broken fixtures.

### Install

Use npm or yarn:

```
npm install -D fixtures-generator
```

```
yarn add -D fixtures-generator
```

### Usage

1. [Declare the schemas you need](#1-Declare-the-schemas-you-need)
2. [Import the module and build a generator](#2-Import-the-module-and-build-a-generator)
3. [Use the generator to create fixtures](#3-Use-the-generator-to-create-fixtures)

#### 1. Declare the schemas you need

* Schemas are declared using [JSON Schema](http://json-schema.org/) specification.
* Schemas need to be exported as a plain object, where:
  * Object keys are the names of the schemas, this is how you will tell the generator which schema to use.
  * Object values are the schema objects.
* It is recommended to keep each schema in a separated file and join them in an index.

Example of schemas object (./schemas.js):
```javascript
const authorSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' }
  }
};

const bookSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    authorId: { type: 'integer' },
    title: { type: 'string' }
  }
};

const schemas = {
  author: authorSchema,
  book: bookSchema
};

module.exports = schemas;

```

#### 2. Import the module and build a generator

After schemas are declared you should build a generator instance. This instance is the one you can use across your tests to generate fixtures.

Example (./generate-fixtures.js)
```javascript
const FixtureGenerator = require('fixtures-generator');
const schemas = require('./schemas');

const options = {
  optionalsProbability: 0.5
};

const generateFixtures = new FixtureGenerator(schemas, options);

module.exports = generateFixtures;
```

Available options are:

| Option | Type | Description |
| ------ | ---- | ----------- |
|`optionalsProbability`|Float|Number between 0 and 1 that specifies the percentage of **non-required** propoerties that will be included in randomly generated fixtures.|


#### 3. Use the generator to create fixtures

Finally, import the fixtures generator instance and create some fixtures.

Example:
```javascript
const generateFixtures = require('./generate-fixtures');

const params = {
  type: 'author',
  quantity: 3
};

const authors = generateFixtures(params); // Will generate 3 author fixtures.
```

Required parameters for `generateFixtures` method are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`type`|String|The name of the fixture schema to be used to generate and validate fixture.|
|`recipe`|[Object]|The seed of the fixtures to be generated on the same order. Resulting fixtures will keep all properties sent here.|
|`quantity`|Number|Quantity of fixtures to be generated. If `quantity` is higher than the size of `recipe` the exceeding fixtures will be randomly generated; otherwise parameter is omitted.|

It is possible to create random fixtures by just specifying the required quantity:

```javascript
const fixtures = generateFixtures('invite', 3);

// Result:
[
  {
    _id: ObjectId('592f0dabfcf681e3d5ceeb6c'),
    otherProperties...
  },
  {
    _id: ObjectId('592f0dabfcf681e3d7defb9a'),
    otherProperties...
  },
  {
    _id: ObjectId('592f0dabfcf681e3d14cab00'),
    otherProperties...
  }
];
```

Also, it is possible to specify an objects array that will be part of generated fixtures.

```javascript
const recipe = [
  {
    campaign: ObjectId('ffffffffffffffffffffffff'),
    username: 'manuel'
  },
  {
    _id: ObjectId('a1a1a1a1a1a1a1a1a1a1a1a1')
  }
];

const fixtures = generateFixtures('invite', recipe);

// Result:
[
  {
    _id: ObjectId('592f0dabfcf681e3d5ceeb69'),
    campaign: ObjectId('ffffffffffffffffffffffff'),
    username: 'manuel',
    otherProperties...
  },
  {
    _id: ObjectId('a1a1a1a1a1a1a1a1a1a1a1a1'),
    campaign: ObjectId('39583dabfcf681e3d5ceeb61'),
    username: 'whatever',
    otherProperties...
  }
];
```


### Schemas validation
When a recipe is used to generate fixtures, all passed properties must be valid; otherwise an error is thrown.

```javascript
const recipe = [
  {
    oldProperty: 'lalala, I am a property that should not exist',
  }
];

const fixtures = generateFixtures('invite', recipe);

// It will throw an error since "oldProperty" is not a valida property for "invite" type.
```
⚠️ In order make this module flexible, validation is only at keys level. That means, **data types are NOT validated** (for example: if property `username` is declared as string, it won't throw error if an integer is sent in `recipe`). It is developer's responsibility to send the correct data type.
