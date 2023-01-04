const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')
const permutate = require('./permutate')
const libpostal = require('../resources/libpostal/libpostal')

const patternVietnameseChar = "aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz";
const patternSpecialCharBig = `.,!@#$%^&*()_+\=\[\]{};':"|<>?~"`; // Includes "dot, comma, dash, slash" => .,!@#$%^&*()_+\-=\[\]{};':"\/|<>?~"
const patternSpecialCharLittle = `!@#$%^&*()_+\=\[\]{};':"|<>?~"`; // Not includes "dot, comma"

var localityPrefix = {};
var countyPrefix = {};
var regionPrefix = {};
var qualifiers = {}

libpostal.load(localityPrefix, ['vi'], 'locality_prefix.txt');
libpostal.load(countyPrefix, ['vi'], 'county_prefix.txt');
libpostal.load(regionPrefix, ['vi'], 'region_prefix.txt');
libpostal.load(qualifiers, ['en', 'vi'], 'qualifiers.txt');

class Tokenizer {
  /**
   * @param {*} s - text input
   * @param {*} isNonAccent - boolean: support non-accent
   * @param {*} isRemoveDuplicate - boolean: support remove duplicate
  */
  constructor(s, isNonAccent = false) {
    this.text = s;
    this.prettyInput(this.text, isNonAccent)
    this.span = new Span(this.text)
    this.segment()
    this.split()
    this.computeCoverage()
    this.permute(0, 10)
    this.solution = []
  }

  prettyInput(src, isNonAccent = false) {
    if (!src) return src;

    let temp = src.trim().toLowerCase().normalize('NFC');
    if (isNonAccent) temp = toLowerCaseNonAccentVietnamese(temp);

    // Clean input string
    temp = temp.replace(/(?:\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{4}/g, ""); // remove phone number
    temp = temp.replace(/\([^()]*\)/g, ''); // remove text within parentheses

    temp = temp.replace(/(?:\s*[\/\\]\s*)/g, '/'); // remove space around slash
    temp = temp.replace(/(?:\s+[–|-]\s+)/g, ' , '); // replace all dash to comma
    temp = temp.replace(/(?<=\D)(?:–|-)(?=\D+)/g, ' '); // (non-space) remove all [word + dash + word] => [word + space + word]
    temp = this.removeQualifier(temp);
    if (!temp.trim()) return temp;
    temp = temp.replace(/(?:[,])(?=\S+)/g, ', '); // smooth comma
    temp = this.prettyArea(temp);
    // TODO: temp of convert abbreviated, you should replace this function
    temp = temp.replace(new RegExp(`(?<=,+|^|\\s+)(?:p\\.[${escapeRegExp(` ${patternSpecialCharBig}`)}]*)(?=[${patternVietnameseChar}0-9])`, 'g'), ' , phường ');
    temp = temp.replace(new RegExp(`(?<=,+|^|\\s+)(?:q\\.[${escapeRegExp(` ${patternSpecialCharBig}`)}]*)(?=[${patternVietnameseChar}0-9])`, 'g'), ' , quận '); // end
    temp = temp.replace(/(?<=quận|phường)(?=\d)/g, ' '); // pretty district

    temp = temp.replace(/(?:,+\s*){1,}/g, ", "); // remove multi comma
    temp = temp.replace(/\s+\.\s*/g, " "); // remove multi dot
    temp = removeSpecialCharacter(temp);
    temp = temp.trim().replace(/ +(?= )/g, ''); // remove duplicate space

    // Max length is 140 char
    if (temp.length > 140) {
      let index = temp.length - 140;
      temp = temp.slice(index);
    }

    this.text = temp;
  }

  prettyArea(input) {
    var temp = input.trim();

    for (const prefix in regionPrefix) {
      let strRegex = escapeRegExp(prefix);
      if (prefix.includes(".")) {
        let reg = new RegExp(`(?<=,+|\\s+)(?:${strRegex}[${escapeRegExp(` ${patternSpecialCharBig}`)}]*)(?=[${patternVietnameseChar}0-9])`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      } else {
        let reg = new RegExp(`(?<=[,]+|\\s+)(?:${strRegex}\\s+)`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      }
    }

    for (const prefix in countyPrefix) {
      let strRegex = escapeRegExp(prefix);
      if (prefix.includes(".")) {
        let reg = new RegExp(`(?<=,+|\\s+)(?:${strRegex}[${escapeRegExp(` ${patternSpecialCharBig}`)}]*)(?=[${patternVietnameseChar}0-9])`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      } else {
        let reg = new RegExp(`(?<=[,]+|\\s+)(?:${strRegex}\\s+)`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      }
    }

    for (const prefix in localityPrefix) {
      let strRegex = escapeRegExp(prefix);
      if (prefix.includes(".")) {
        let reg = new RegExp(`(?<=,+|\\s+)(?:${strRegex}[${escapeRegExp(` ${patternSpecialCharBig}`)}]*)(?=[${patternVietnameseChar}0-9])`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      } else if (prefix == "xã") {
        let reg = new RegExp(`(?<!thị\\s*)(?<=[,]+|\\s+)(?:${strRegex}\\s+)`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      } else {
        let reg = new RegExp(`(?<=[,]+|\\s+)(?:${strRegex}\\s+)`, 'g');
        if (reg.test(temp)) {
          temp = temp.replace(reg, ` , ${prefix} `);
        }
      }
    }

    return temp;
  }

  removeQualifier(input) {
    let temp = input.trim();

    for (var propertyName in qualifiers) {
      let strRegex = escapeRegExp(propertyName);
      let reg = new RegExp(`(?<=\\s|^)(?:${strRegex})(?![${patternVietnameseChar}0-9])`, 'g');
      temp = temp.replace(reg, ' , ');
    }

    return temp;
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

/**
 * Thanks for: https://stackoverflow.com/a/9310752/10309142
 * @param {*} text 
 * @returns 
*/
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function toLowerCaseNonAccentVietnamese(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd');
}

/**
 * Remove special character
 * @param {*} input 
 * @param {*} all - boolean: remove all special character includes "dot, comma" in line
 * @returns 
 */
function removeSpecialCharacter(input, all = false) {
  var temp = input.trim();
  if (all) {
    let reg = new RegExp(`(?:[${escapeRegExp(patternSpecialCharBig)}])`, 'g');
    temp = temp.replace(reg, " ");
  } else {
    let reg = new RegExp(`(?:^[${escapeRegExp(` ${patternSpecialCharBig}`)}]+)|(?:[${escapeRegExp(patternSpecialCharLittle)}]+)|(?:[${escapeRegExp(` ${patternSpecialCharBig}`)}]+$)`, 'g');
    temp = temp.replace(reg, " ");
  }

  return temp;
}

module.exports = Tokenizer
module.exports.escapeRegExp = escapeRegExp
module.exports.toLowerCaseNonAccentVietnamese = toLowerCaseNonAccentVietnamese
module.exports.removeSpecialCharacter = removeSpecialCharacter