//const PhraseClassifier = require('./super/PhraseClassifier')
const WordClassifier = require('./super/WordClassifier')
const SurnameClassification = require('../classification/SurnameClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class SurnameClassifier extends WordClassifier {
  setup () {
    this.index = {}
    libpostal.load(this.index, ['vi'], 'surnames.txt', {
      lowercase: true,
      minlength: 2 // prevent very short names being indexed
    })
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new SurnameClassification(1))
    }
  }
}

module.exports = SurnameClassifier
