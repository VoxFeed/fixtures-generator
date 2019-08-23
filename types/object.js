module.exports = (properties, required = []) => {
  return {
    type: 'object',
    properties,
    required
  };
};
