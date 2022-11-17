const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')
const permutate = require('./permutate')
const libpostal = require('../resources/libpostal/libpostal')

class Tokenizer {
  constructor(s) {
    this.span = new Span(this.removeQualifier(s))
    this.segment()
    this.split()
    this.computeCoverage()
    this.permute(0, 10)
    this.solution = []
  }

  removeQualifier(src) {
    if (!src) return src;

    this.index = {}
    libpostal.load(this.index, ['vi'], 'qualifiers.txt');

    // Clean input string
    let temp = src.trim().toLowerCase().normalize('NFC');
    temp = temp.replace(/\([^()]*\)/g, ''); // remove text within parentheses
    temp = temp.replace(/(?:\s*-\s*)/g, '-'); // remove space around dash
    temp = temp.replace(/(?:\s*[\/\\]\s*)/g, '/'); // remove space around slash
    temp = temp.replace(/(?<=\D)(?:\s+(–|-)\s+)(?=\D+)/g, ' '); // (space) remove all [word + dash + word] => [word + space + word]
    temp = temp.replace(/(?<=\D)(?:–|-)(?=\D+)/g, ' '); // (non-space) remove all [word + dash + word] => [word + space + word]
    temp = temp.replace(/(?:^[\.|,|;|:|{|}|\[|\]|+|_|\-|!|@|#|$|%|^|&|*|(|)|?]+)/g, ""); // remove special char start
    temp = temp.replace(/(?:[;|:|{|}|\[|\]|+|_|!|@|#|$|%|^|&|*|(|)|?]+)/g, ""); // remove special char body
    temp = temp.replace(/(?:[\.|,|;|:|{|}|\[|\]|+|_|\-|!|@|#|$|%|^|&|*|(|)|?]+$)/g, ""); // remove special char end

    if (!temp) return temp;

    for (var propertyName in this.index) {
      let strRegex = propertyName.replace(".", "\\.");
      let isMatchRegex = new RegExp(`(?<=\\s)(${strRegex})(?=\\s*\\d)`, 'g');

      let excep = ["phường", "quận", "p.", "q."];
      if (!(excep.some(x => x == propertyName) && isMatchRegex.test(temp))) {
        // Avoid case "phường 4"
        if (propertyName.indexOf('.') == (propertyName.length - 1)) {
          let reg = new RegExp(`(?<=\\s)(${strRegex})`, 'g');
          temp = temp.replace(reg, '');
        } else {
          let reg = new RegExp(`(?<=\\s|^)(${strRegex})(?=\\s+|,|\\.|$)`, 'g');
          temp = temp.replace(reg, '');
        }
      } else {
        // TODO: temp of convert abbreviated, you should replace this function
        if (propertyName == "p.") temp = temp.replace(/p\./g, ' phường ');
        if (propertyName == "q.") temp = temp.replace(/q\./g, ' quận ');
      }

      // TODO: temp of convert abbreviated, you should replace this function
      temp = temp.replace(/(?<=\s|,)(hn\s*$)/g, ' hà nội ');
      temp = temp.replace(/(?<=\s|,)(hcm\s*$)/g, ' hồ chí minh ');
      temp = temp.replace(/(?<=\s|,)(sg\s*$)/g, ' hồ chí minh ');
      temp = temp.replace(/(?<=\s|,)(sai gon\s*$)/g, ' hồ chí minh ');
      temp = temp.replace(/(?<=\s|,)(sài gòn\s*$)/g, ' hồ chí minh ');
      temp = temp.replace(/(?<=\s|,)(saigon\s*$)/g, ' hồ chí minh ');
      temp = temp.replace(/(?<=\s|,)(hd\s*$)/g, ' hải dương ');
      temp = temp.replace(/(?<=\s|,)(dn\s*$)/g, ' đà nẵng ');
      temp = temp.replace(/(?<=\s|,)(hp\s*$)/g, ' hải phòng ');
    }

    temp = temp.trim().replace(/ +(?= )/g, ''); // remove duplicate space

    if (temp.length > 140) {
      let index = temp.length - 140;
      temp = temp.slice(index);
    }

    return temp
  }

  segment() {
    this.section = split(this.span, funcs.fieldsFuncBoundary)
  }

  split() {
    for (let i = 0; i < this.section.length; i++) {
      this.section[i].setChildren(split(this.section[i], funcs.fieldsFuncWhiteSpace))
      this.section[i].setChildren(split(this.section[i], funcs.fieldsFuncHyphenOrWhiteSpace))
    }
  }

  permute(windowMin, windowMax) {
    for (let i = 0; i < this.section.length; i++) {
      this.section[i].setPhrases(
        permutate(this.section[i].graph.findAll('child'), windowMin, windowMax)
      )
    }
  }

  computeCoverageRec(sum, curr) {
    if (!curr) { return sum }
    return this.computeCoverageRec(sum + curr.end - curr.start, curr.graph.findOne('next'))
  }

  computeCoverage() {
    this.coverage = 0
    this.section.forEach(s => {
      this.coverage += this.computeCoverageRec(0, s.graph.findOne('child'))
    }, this)
  }
}

module.exports = Tokenizer
