const Tokenizer = require('./Tokenizer')

module.exports.tests = {}

module.exports.tests.constructor = (test) => {
  test('constructor: basic', (t) => {
    const tok = new Tokenizer('100 Main Street')
    t.equals(tok.span.constructor.name, 'Span')
    t.equals(tok.span.body, '100 main street')
    t.deepEquals(tok.solution, [])
    t.end()
  })
  test('constructor: advanced', (t) => {
    const tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.equals(tok.span.constructor.name, 'Span')
    t.equals(tok.span.body, '100 west 26th street, nyc, 10010 ny, usa')
    t.deepEquals(tok.solution, [])
    t.end()
  })
}

module.exports.tests.segment = (test) => {
  test('segment: basic', (t) => {
    const tok = new Tokenizer('100 Main Street')
    t.true(tok.section.every(s => s.constructor.name === 'Span'))
    t.equals(tok.section.length, 1)
    t.equals(tok.section[0].body, '100 main street')
    t.end()
  })
  test('segment: advanced', (t) => {
    const tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.true(tok.section.every(s => s.constructor.name === 'Span'))
    t.equals(tok.section.length, 4)
    t.equals(tok.section[0].body, '100 west 26th street')
    t.equals(tok.section[1].body, ' nyc')
    t.equals(tok.section[2].body, ' 10010 ny')
    t.equals(tok.section[3].body, ' usa')
    t.end()
  })
}

module.exports.tests.split = (test) => {
  test('split: basic', (t) => {
    const tok = new Tokenizer('100 Main Street')
    t.true(tok.section.every(s => s.graph.findAll('child').every(c => c.constructor.name === 'Span')))
    t.equals(tok.section[0].graph.findAll('child').length, 3)
    t.equals(tok.section[0].graph.findAll('child')[0].body, '100')
    t.equals(tok.section[0].graph.findAll('child')[1].body, 'main')
    t.equals(tok.section[0].graph.findAll('child')[2].body, 'street')
    t.end()
  })
  test('split: advanced', (t) => {
    const tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.true(tok.section.every(s => s.graph.findAll('child').every(c => c.constructor.name === 'Span')))
    t.equals(tok.section[0].graph.findAll('child').length, 4)
    t.equals(tok.section[0].graph.findAll('child')[0].body, '100')
    t.equals(tok.section[0].graph.findAll('child')[1].body, 'west')
    t.equals(tok.section[0].graph.findAll('child')[2].body, '26th')
    t.equals(tok.section[0].graph.findAll('child')[3].body, 'street')
    t.equals(tok.section[1].graph.findAll('child').length, 1)
    t.equals(tok.section[1].graph.findAll('child')[0].body, 'nyc')
    t.equals(tok.section[2].graph.findAll('child').length, 2)
    t.equals(tok.section[2].graph.findAll('child')[0].body, '10010')
    t.equals(tok.section[2].graph.findAll('child')[1].body, 'ny')
    t.equals(tok.section[3].graph.findAll('child').length, 1)
    t.equals(tok.section[3].graph.findAll('child')[0].body, 'usa')
    t.end()
  })
  test('split: hyphen', (t) => {
    const tok = new Tokenizer('20 Boulevard Saint-Germain, Paris, France')
    t.true(tok.section.every(s => s.graph.findAll('child').every(c => c.constructor.name === 'Span')))
    t.equals(tok.section.length, 3)
    t.equals(tok.section[0].graph.findAll('child').length, 5)
    t.equals(tok.section[0].graph.findAll('child')[0].body, '20')
    t.equals(tok.section[0].graph.findAll('child')[1].body, 'boulevard')
    t.equals(tok.section[0].graph.findAll('child')[2].body, 'saint-germain')
    t.equals(tok.section[0].graph.findAll('child')[3].body, 'saint')
    t.equals(tok.section[0].graph.findAll('child')[4].body, 'germain')
    t.equals(tok.section[1].graph.findAll('child').length, 1)
    t.equals(tok.section[1].graph.findAll('child')[0].body, 'paris')
    t.equals(tok.section[2].graph.findAll('child').length, 1)
    t.equals(tok.section[2].graph.findAll('child')[0].body, 'france')
    t.end()
  })
}

module.exports.tests.permute = (test) => {
  test('permute: basic', (t) => {
    const tok = new Tokenizer('100 Main Street')
    t.true(tok.section.every(s => s.graph.findAll('phrase').every(p => p.constructor.name === 'Span')))
    t.equals(tok.section[0].graph.findAll('phrase').length, 6)
    t.equals(tok.section[0].graph.findAll('phrase')[0].body, '100 main street')
    t.equals(tok.section[0].graph.findAll('phrase')[1].body, '100 main')
    t.equals(tok.section[0].graph.findAll('phrase')[2].body, '100')
    t.equals(tok.section[0].graph.findAll('phrase')[3].body, 'main street')
    t.equals(tok.section[0].graph.findAll('phrase')[4].body, 'main')
    t.equals(tok.section[0].graph.findAll('phrase')[5].body, 'street')
    t.end()
  })
  test('permute: advanced', (t) => {
    const tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.true(tok.section.every(s => s.graph.findAll('phrase').every(p => p.constructor.name === 'Span')))
    t.equals(tok.section[0].graph.findAll('phrase').length, 10)
    t.equals(tok.section[0].graph.findAll('phrase')[0].body, '100 west 26th street')
    t.equals(tok.section[0].graph.findAll('phrase')[1].body, '100 west 26th')
    t.equals(tok.section[0].graph.findAll('phrase')[2].body, '100 west')
    t.equals(tok.section[0].graph.findAll('phrase')[3].body, '100')
    t.equals(tok.section[0].graph.findAll('phrase')[4].body, 'West 26th Street')
    t.equals(tok.section[0].graph.findAll('phrase')[5].body, 'west 26th')
    t.equals(tok.section[0].graph.findAll('phrase')[6].body, 'west')
    t.equals(tok.section[0].graph.findAll('phrase')[7].body, '26th street')
    t.equals(tok.section[0].graph.findAll('phrase')[8].body, '26th')
    t.equals(tok.section[0].graph.findAll('phrase')[9].body, 'street')
    t.equals(tok.section[1].graph.findAll('phrase').length, 1)
    t.equals(tok.section[1].graph.findAll('phrase')[0].body, 'nyc')
    t.equals(tok.section[2].graph.findAll('phrase').length, 3)
    t.equals(tok.section[2].graph.findAll('phrase')[0].body, '10010 ny')
    t.equals(tok.section[2].graph.findAll('phrase')[1].body, '10010')
    t.equals(tok.section[2].graph.findAll('phrase')[2].body, 'ny')
    t.equals(tok.section[3].graph.findAll('phrase').length, 1)
    t.equals(tok.section[3].graph.findAll('phrase')[0].body, 'usa')
    t.end()
  })
}

module.exports.tests.computeCoverage = (test) => {
  test('computeCoverage: basic', (t) => {
    const tok = new Tokenizer('100 Main Street')
    t.equal(13, tok.coverage)
    t.end()
  })
  test('computeCoverage: advanced', (t) => {
    const tok = new Tokenizer('100 West 26th Street, NYC, 10010 NY, USA')
    t.equal(30, tok.coverage)
    t.end()
  })
  test('computeCoverage: trim text when greater than 140 characters with spaces', (t) => {
    const tok = new Tokenizer(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`)
    t.ok(tok.coverage < 140)
    t.equal(tok.coverage, 111)
    t.end()
  })
  test('computeCoverage: do not trim text when it\'s 140 characters', (t) => {
    const tok = new Tokenizer('LoremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtenimadminimveniamquisnostrudexercita')
    t.equal(tok.coverage, 140)
    t.end()
  })
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`Tokenizer: ${name}`, testFunction)
  }

  for (const testCase in module.exports.tests) {
    module.exports.tests[testCase](test, common)
  }
}
