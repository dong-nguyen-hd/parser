const PhraseClassifier = require('./super/PhraseClassifier')
const RoadTypeClassification = require('../classification/RoadTypeClassification')
const libpostal = require('../resources/libpostal/libpostal')

// dictionaries sourced from the libpostal project
// see: https://github.com/openvenues/libpostal

class RoadTypeClassifier extends PhraseClassifier {
  setup () {
    // load street tokens
    this.index = {}
    libpostal.load(this.index, ['en', 'vi'], 'road_types.txt')
  }

  each (span) {
    // skip spans which contain numbers
    if (span.contains.numerals) { return }

    // base confidence
    let confidence = 0.5

    // use an inverted index for full token matching as it's O(1)
    if (this.index.hasOwnProperty(span.norm)) {
      if (span.norm.length < 2) { confidence = 0.2 }
      span.classify(new RoadTypeClassification(confidence))
    }
  }
}

module.exports = RoadTypeClassifier
