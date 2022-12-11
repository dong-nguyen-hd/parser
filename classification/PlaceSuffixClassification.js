const Classification = require('./Classification')

class PlaceSuffixClassification extends Classification {
  constructor(confidence, meta) {
    super(confidence, meta)
    this.label = 'place_suffix'
  }
}

module.exports = PlaceSuffixClassification