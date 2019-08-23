const isNil = input => input === null || input === undefined;

module.exports = (minimum, maximum) => {
  const type = {
    type: 'integer'
  };
  if (!isNil(minimum)) Object.assign(type, {minimum});
  if (!isNil(maximum)) Object.assign(type, {maximum});
  return type;
};
