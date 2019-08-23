const {isNil} = require('lodash');

module.exports = (minimum, maximum) => {
  const floatType = { type: 'number' };

  if (!isNil(minimum)) floatType.minimum = minimum;
  if (!isNil(maximum)) floatType.maximum = maximum;

  return floatType;
};
