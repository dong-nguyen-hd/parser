const Classification = require('./StopWordClassification')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor', (t) => {
    const c = new Classification()
    t.false(c.public)
    t.equals(c.label, 'stop_word')
    t.equals(c.confidence, 1.0)
    t.deepEqual(c.meta, {})
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`StopWordClassification: ${name}`, testFunction)
  }

  for (const testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
