const Classification = require('../classification/Classification')

class DateClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'date'
  }
}

module.exports = DateClassification
