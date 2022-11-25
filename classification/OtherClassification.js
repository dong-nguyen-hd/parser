const Classification = require('../classification/Classification')

class OtherClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'other'
  }
}

module.exports = OtherClassification
