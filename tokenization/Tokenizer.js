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
    let temp = src.trim().toLowerCase().normalize('NFC');
    temp = temp.replace(/\([^()]*\)/g, ''); // remove text within parentheses
    temp = temp.replace(/(?:\s*-\s*)/g, '-'); // remove space around dash
    temp = temp.replace(/(?:\s*[\/\\]\s*)/g, '/'); // remove space around slash
    temp = temp.replace(/\.+$/g, ""); // remove dot end
    temp = temp.replace(/^\.+/g, ""); // remove dot start

    if(!temp) return temp;

    for(var propertyName in this.index) {
      if(propertyName == "phường"){
        temp = temp.replaceAll(/(?:phường)(?=\s*[a-záàạảãâấầậẩẫăắằặẳẵéèẹẻẽêếềệểễóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữíìịỉĩýỳỵỷỹđ]+)/g, ""); // remove "phường" follow by word
      } else if(propertyName == "quận"){
        temp = temp.replaceAll(/(?:quận)(?=\s*[a-záàạảãâấầậẩẫăắằặẳẵéèẹẻẽêếềệểễóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữíìịỉĩýỳỵỷỹđ]+)/g, ""); // remove "quận" follow by word
      } else if(propertyName == "q."){
        temp = temp.replaceAll(/(?:q\.)(?=\s*[a-záàạảãâấầậẩẫăắằặẳẵéèẹẻẽêếềệểễóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữíìịỉĩýỳỵỷỹđ]+)/g, ""); // remove "q." follow by word
      } else if(propertyName == "p."){
        temp = temp.replaceAll(/(?:p\.)(?=\s*[a-záàạảãâấầậẩẫăắằặẳẵéèẹẻẽêếềệểễóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữíìịỉĩýỳỵỷỹđ]+)/g, ""); // remove "p." follow by word
      } else temp = temp.replaceAll(propertyName,'');
    }
    
    temp = temp.trim().replace(/ +(?= )/g,''); // remove duplicate space

    if(temp.length > 140){
      let index = temp.length - 140;
      temp = temp.slice(index);
    }
    
    return temp
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
