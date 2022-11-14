const WordClassifier = require('./super/WordClassifier')
const PhraseClassifier = require('./super/PhraseClassifier')
const PlaceClassification = require('../classification/PlaceClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class PlaceClassifier extends PhraseClassifier {
  setup () {
    // load index tokens
    this.index = {}
    libpostal.load(this.index, ['en', 'vi'], 'place_names.txt')
    libpostal.generatePlurals(this.index)
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // do not classify tokens preceeded by an 'IntersectionClassification'
    const firstChild = span.graph.findOne('child:first') || span
    const prev = firstChild.graph.findOne('prev')
    if (
      prev && (
        prev.classifications.hasOwnProperty('IntersectionClassification')
      )) {
      return
    }

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      span.classify(new PlaceClassification(1))
    }
  }
}

module.exports = PlaceClassifier
