const Classification = require('./Classification')

class ObscureClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'obscure'
  }
}

module.exports = ObscureClassification
