const Classification = require('./Classification')

class DistrictClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.public = true
    this.label = 'county'
  }
}

module.exports = DistrictClassification
