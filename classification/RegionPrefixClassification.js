const Classification = require('../classification/Classification')

class RegionPrefixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'region_prefix'
  }
}

module.exports = RegionPrefixClassification