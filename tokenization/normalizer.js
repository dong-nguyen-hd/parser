const helperToken = require('./Tokenizer');

function normalizer(options = {}) {
  return (value) => {
    value = value.trim();
    if (!value) return value;

    if (options.lowercase) {
      value = value.toLowerCase()
    }
    if (options.removeAccents) {
      value = helperToken.toLowerCaseNonAccentVietnamese(value)
    }
    if (options.removeHyphen) {
      value = value.replace(/-/g, ' ')
    }
    if (options.removeSpaces) {
      value = value.replace(/ /g, '')
    }
    return helperToken.renewAccentVietnamese(value);
  }
}

module.exports = normalizer
