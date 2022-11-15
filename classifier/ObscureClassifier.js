const WordClassifier = require('./super/WordClassifier')
const ObscureClassification = require('../classification/ObscureClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class ObscureClassifier extends WordClassifier {
  setup () {
    // load Obscure tokens
    this.stopWords = {}
    libpostal.load(this.stopWords, ['vi'], 'obscure.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // base confidence
    let confidence = 0.1

    // use an inverted index for full token matching as it's O(1)
    if (this.stopWords.hasOwnProperty(span.norm)) {
      span.classify(new ObscureClassification(confidence))
    }
  }
}

module.exports = ObscureClassifier