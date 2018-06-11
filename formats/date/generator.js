const FORMAT_NAME = require('./name');
const wrapReplacer = require('../utils/wrap-replacer');

const getRandomDate = (min, max) => {
  const time = Math.random() * (max - min) + min;
  return new Date(time);
};

module.exports = () => {
  const now = new Date().getTime();
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  const date = getRandomDate(now - oneYear, now + oneYear);
  const value = date.getTime();
  return wrapReplacer(FORMAT_NAME, value);
};
