const Classification = require('../classification/Classification')

class LocalityPrefixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'locality_prefix'
  }
}

module.exports = LocalityPrefixClassification