const WordClassifier = require('./super/WordClassifier')
const AlphaClassification = require('../classification/AlphaClassification')
const NumericClassification = require('../classification/NumericClassification')
const DateWordClassification = require('../classification/DateWordClassification')
const DateClassification = require('../classification/DateClassification')
const AlphaNumericClassification = require('../classification/AlphaNumericClassification')
const PunctuationClassification = require('../classification/PunctuationClassification')

class AlphaNumericClassifier extends WordClassifier {
  each (span) {
    if (/^\d+$/.test(span.norm)) {
      span.classify(new NumericClassification(1))
    } else if (/^([0]?[1-9]|[1|2][0-9]|[3][0|1])\S{1}([0]?[1-9]|[1][0-2])$/.test(span.norm)) {
      span.classify(new DateClassification(1))
    } else if (/^(tháng|năm)$/.test(span.norm)) {
      span.classify(new DateWordClassification(1))
    } else if (span.contains.numerals && /^\w*\d+\w*$/.test(span.norm)) {
      span.classify(new AlphaNumericClassification(1))
    } else if (/^[@&/\\#,+()$~%.!^'";:*?[\]<>{}]+$/.test(span.norm)) {
      span.classify(new PunctuationClassification(1))
    } else {
      span.classify(new AlphaClassification(1))
    }
  }
}

module.exports = AlphaNumericClassifier
