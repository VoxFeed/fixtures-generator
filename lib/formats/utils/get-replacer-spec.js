const REPLACER_KEYWORD = require('./replacer-keyword');

module.exports = (str) => {
  const objStr = str.replace(REPLACER_KEYWORD, '');
  return JSON.parse(objStr);
};
