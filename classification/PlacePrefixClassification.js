const Classification = require('./Classification')

class PlacePrefixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'place_prefix'
  }
}

module.exports = PlacePrefixClassification
