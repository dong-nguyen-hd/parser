const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')
const permutate = require('./permutate')
const libpostal = require('../resources/libpostal/libpostal')

class Tokenizer {
  constructor (s) {
    this.span = new Span(this.removeQualifier(s))
    this.segment()
    this.split()
    this.computeCoverage()
    this.permute(0, 10)
    this.solution = []
  }

  removeQualifier(src){
    this.index = {}
    libpostal.load(this.index, ['vi'], 'qualifiers.txt');

    // Clean input string
    let temp = src.trim().toLowerCase();
    temp = temp.replace(/ +(?= )/g,'').replace(/\.+$/, "").replace(/^\.+/, "");

    for(var propertyName in this.index) {
      if(propertyName == "phường" || propertyName == "quận"){
        if(this.regexIndexOf(temp, /(phường|quận){1}\s?\d+/g)) temp = temp.replace(propertyName,'');
      } else temp = temp.replace(propertyName,'');
    }

    return temp
  }

  regexIndexOf(string, regex, startpos) {
    var indexOf = string.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
  }

  segment () {
    this.section = split(this.span, funcs.fieldsFuncBoundary)
  }

  split () {
    for (let i = 0; i < this.section.length; i++) {
      this.section[i].setChildren(split(this.section[i], funcs.fieldsFuncWhiteSpace))
      this.section[i].setChildren(split(this.section[i], funcs.fieldsFuncHyphenOrWhiteSpace))
    }
  }

  permute (windowMin, windowMax) {
    for (let i = 0; i < this.section.length; i++) {
      this.section[i].setPhrases(
        permutate(this.section[i].graph.findAll('child'), windowMin, windowMax)
      )
    }
  }

  computeCoverageRec (sum, curr) {
    if (!curr) { return sum }
    return this.computeCoverageRec(sum + curr.end - curr.start, curr.graph.findOne('next'))
  }

  computeCoverage () {
    this.coverage = 0
    this.section.forEach(s => {
      this.coverage += this.computeCoverageRec(0, s.graph.findOne('child'))
    }, this)
  }
}

module.exports = Tokenizer
