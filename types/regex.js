module.exports = (regex) => {
  return {
    type: 'string',
    pattern: regex
  };
};
