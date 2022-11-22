const Classification = require('../classification/Classification')

class DateWordClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'date_word'
  }
}

module.exports = DateWordClassification
