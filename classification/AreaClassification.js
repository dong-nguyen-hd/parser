const Classification = require('./Classification')

class AreaClassification extends Classification {
  constructor (confidence, meta) {
    super(confidence, meta)
    this.label = 'area';
    this.confidence = 0.01;
  }
}

module.exports = AreaClassification
