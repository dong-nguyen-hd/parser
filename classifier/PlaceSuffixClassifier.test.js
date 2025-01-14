const PlaceSuffixClassifier = require('./PlaceSuffixClassifier')
const PlaceSuffixClassification = require('../classification/PlaceSuffixClassification')
const Span = require('../tokenization/Span')
const classifier = new PlaceSuffixClassifier()

module.exports.tests = {}

function classify (body) {
  const s = new Span(body)
  classifier.each(s, null, 1)
  return s
}

module.exports.tests.contains_numerals = (test) => {
  test('contains numerals: honours contains.numerals boolean', (t) => {
    const s = new Span('example')
    s.contains.numerals = true
    classifier.each(s, null, 1)
    t.deepEqual(s.classifications, {})
    t.end()
  })
}

module.exports.tests.classify = (test) => {
  const valid = [
    'stables', 'swimming pool',
    'cafe', 'bar'
  ]

  valid.forEach(token => {
    test(`classify: ${token}`, (t) => {
      const s = classify(token)
      t.deepEqual(s.classifications, {
        PlaceSuffixClassification: new PlaceSuffixClassification(1.0)
      })
      t.end()
    })
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`PlaceSuffixClassifier: ${name}`, testFunction)
  }

  for (const testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
