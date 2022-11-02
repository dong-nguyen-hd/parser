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
    if(!src) return src;

    this.index = {}
    libpostal.load(this.index, ['vi'], 'qualifiers.txt');

    // Clean input string
    let temp = src.trim().toLowerCase();
    temp = temp.replace(/\([^()]*\)/g, ''); // remove text within parentheses
    temp = temp.replace(/(?:\s*-\s*)/g, '-'); // remove space around dash
    temp = temp.replace(/(?:\s*[\/\\]\s*)/g, '/'); // remove space around slash
    temp = temp.replace(/\.+$/, ""); // remove dot end
    temp = temp.replace(/^\.+/, ""); // remove dot start
    temp = temp.replace(/ +(?= )/g,''); // remove duplicate space

    if(!temp) return temp;

    for(var propertyName in this.index) {
      if(propertyName == "phường"){
        if(!this.regexIndexOf(temp, /.*(phường){1}\s?\d+/g)) temp = temp.replace(propertyName,'');
      } else if(propertyName == "quận"){
        if(!this.regexIndexOf(temp, /.*(quận){1}\s?\d+/g)) temp = temp.replace(propertyName,'');
      } else if(propertyName == "q."){
        if(!this.regexIndexOf(temp, /.*(q\.){1}\s?\d+/g)) temp = temp.replace(propertyName,'');
      } else if(propertyName == "p."){
        if(!this.regexIndexOf(temp, /.*(p\.){1}\s?\d+/g)) temp = temp.replace(propertyName,'');
      } else temp = temp.replace(propertyName,'');
    }

    return temp
  }

  /**
   * Checking string validate by regex pattern
   * @param {*} string 
   * Input string
   * @param {*} regex 
   * Regex pattern
   * @returns true/false
   */
  regexIndexOf(string, regex) {
    var indexOf = string.substring(0).search(regex);
    return (indexOf >= 0) ? true : false;
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
