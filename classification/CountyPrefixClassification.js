const Classification = require('../classification/Classification')

class CountyPrefixClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'county_prefix'
  }
}

module.exports = CountyPrefixClassification