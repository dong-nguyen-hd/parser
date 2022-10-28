const Classification = require('./Classification')

class ProvinceClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'province'
  }
}

module.exports = ProvinceClassification
