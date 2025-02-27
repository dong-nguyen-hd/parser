const AlphaNumericClassifier = require('./AlphaNumericClassifier')
const AlphaClassification = require('../classification/AlphaClassification')
const NumericClassification = require('../classification/NumericClassification')
const AlphaNumericClassification = require('../classification/AlphaNumericClassification')
const PunctuationClassification = require('../classification/PunctuationClassification')
const Span = require('../tokenization/Span')
const classifier = new AlphaNumericClassifier()

module.exports.tests = {}

function classify (body) {
  const s = new Span(body)
  classifier.each(s)
  return s
}

module.exports.tests.alpha = (test) => {
  test('AlphaClassification: English letter', (t) => {
    const s = classify('A')
    t.deepEqual(s.classifications, { AlphaClassification: new AlphaClassification(1.0) })
    t.end()
  })
  test('AlphaClassification: English mixed-case word', (t) => {
    const s = classify('TesT ExAmPle')
    t.deepEqual(s.classifications, { AlphaClassification: new AlphaClassification(1.0) })
    t.end()
  })
  test('AlphaClassification: Japanese', (t) => {
    const s = classify('東京')
    t.deepEqual(s.classifications, { AlphaClassification: new AlphaClassification(1.0) })
    t.end()
  })
  test('AlphaClassification: Mandarin', (t) => {
    const s = classify('北京市')
    t.deepEqual(s.classifications, { AlphaClassification: new AlphaClassification(1.0) })
    t.end()
  })
  test('AlphaClassification: Cyrillic', (t) => {
    const s = classify('Москва́')
    t.deepEqual(s.classifications, { AlphaClassification: new AlphaClassification(1.0) })
    t.end()
  })
}

module.exports.tests.numeric = (test) => {
  test('NumericClassification: single digit', (t) => {
    const s = classify('1')
    t.deepEqual(s.classifications, { NumericClassification: new NumericClassification(1.0) })
    t.end()
  })
  test('NumericClassification: multiple digits', (t) => {
    const s = classify('1234567890')
    t.deepEqual(s.classifications, { NumericClassification: new NumericClassification(1.0) })
    t.end()
  })
}

module.exports.tests.punctuation = (test) => {
  test('PunctuationClassification: single char', (t) => {
    const s = classify('@')
    t.deepEqual(s.classifications, { PunctuationClassification: new PunctuationClassification(1.0) })
    t.end()
  })
  test('PunctuationClassification: multiple chars', (t) => {
    const s = classify('###&$%')
    t.deepEqual(s.classifications, { PunctuationClassification: new PunctuationClassification(1.0) })
    t.end()
  })
}

module.exports.tests.alpha_numeric = (test) => {
  test('AlphaNumericClassification: English letter', (t) => {
    const s = classify('1A')
    t.deepEqual(s.classifications, { AlphaNumericClassification: new AlphaNumericClassification(1.0) })
    t.end()
  })
  test('AlphaNumericClassification: English mixed-case word', (t) => {
    const s = classify('100 TesT ExAmPle')
    t.deepEqual(s.classifications, { AlphaNumericClassification: new AlphaNumericClassification(1.0) })
    t.end()
  })
  test('AlphaNumericClassification: Japanese', (t) => {
    const s = classify('1東京')
    t.deepEqual(s.classifications, { AlphaNumericClassification: new AlphaNumericClassification(1.0) })
    t.end()
  })
  test('AlphaNumericClassification: Mandarin', (t) => {
    const s = classify('北京市1')
    t.deepEqual(s.classifications, { AlphaNumericClassification: new AlphaNumericClassification(1.0) })
    t.end()
  })
  test('AlphaNumericClassification: Cyrillic', (t) => {
    const s = classify('1Москва́')
    t.deepEqual(s.classifications, { AlphaNumericClassification: new AlphaNumericClassification(1.0) })
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`AlphaNumericClassifier: ${name}`, testFunction)
  }

  for (const testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
