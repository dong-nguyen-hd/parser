const PhraseClassifier = require('./super/PhraseClassifier')
const CountyPrefixClassification = require('../classification/CountyPrefixClassification')
const libpostal = require('../resources/libpostal/libpostal')

class CountyPrefixClassifier extends PhraseClassifier {
  setup() {
    // load index tokens
    this.index = {}
    libpostal.load(this.index, ['vi'], 'county_prefix.txt')
    libpostal.generatePlurals(this.index)
  }

  each(span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new CountyPrefixClassification(0.01))
    }
  }
}

module.exports = CountyPrefixClassifier
