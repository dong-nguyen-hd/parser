const Span = require('./Span')
const split = require('./split')
const funcs = require('./split_funcs')
const permutate = require('./permutate')
const libpostal = require('../resources/libpostal/libpostal')

class Tokenizer {
  /**
   * @param {*} s - text input
   * @param {*} isNonAccent - boolean: support non-accent
   * @param {*} isRemoveDuplicate - boolean: support remove duplicate
   */
  constructor(s, isNonAccent = false, isRemoveDuplicate = false) {
    this.text = s;
    this.removeQualifier(this.text, isNonAccent, isRemoveDuplicate)
    this.span = new Span(this.text)
    this.segment()
    this.split()
    this.computeCoverage()
    this.permute(0, 10)
    this.solution = []
  }

  removeQualifier(src, isNonAccent = false, isRemoveDuplicate = false) {
    if (!src) return src;

    this.index = {}
    libpostal.load(this.index, ['vi'], 'qualifiers.txt');

    let temp = src.trim().toLowerCase().normalize('NFC');
    if (isNonAccent) temp = this.toLowerCaseNonAccentVietnamese(temp);

    // Clean input string
    temp = temp.replace(/(?:\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{4}/g, ""); // remove phone number
    temp = temp.replace(/\([^()]*\)/g, ''); // remove text within parentheses
    temp = temp.replace(/(?:\s*[\/\\]\s*)/g, '/'); // remove space around slash
    temp = temp.replace(/(?<=\D)(?:\s+(–|-)\s+)(?=\D+)/g, ' '); // (space) remove all [word + dash + word] => [word + space + word]
    temp = temp.replace(/(?<=\D)(?:–|-)(?=\D+)/g, ' '); // (non-space) remove all [word + dash + word] => [word + space + word]
    temp = this.removeSpecialCharacter(temp);
    temp = temp.replace(/(?:[,])(?=\S+)/g, ', '); // smooth comma

    if (!temp) return temp;

    for (var propertyName in this.index) {
      let strRegex = propertyName.replace(".", "\\.");
      let isMatchRegex = new RegExp(`(?<=\\s|^)(${strRegex})(?=\\s*\\d|$)`, 'g');

      let excep = ["phường", "quận", "p.", "q."];
      if (!(excep.some(x => x == propertyName) && isMatchRegex.test(temp))) {
        // Avoid case "phường 4"
        if (propertyName.indexOf('.') == (propertyName.length - 1)) {
          let reg = new RegExp(`(?<=\\s)(${strRegex})`, 'g');
          temp = temp.replace(reg, ' , ');
        } else {
          let reg = new RegExp(`(?<=\\s|^)(${strRegex})(?=\\s+|,|\\.|$)`, 'g');
          temp = temp.replace(reg, ' , ');
        }
      } else {
        // TODO: temp of convert abbreviated, you should replace this function
        if (propertyName == "p.") temp = temp.replace(/p\./g, ' , phường ');
        if (propertyName == "q.") temp = temp.replace(/q\./g, ' , quận ');
      }
    }

    // remove duplicate text
    if (isRemoveDuplicate) {
      let splitBySpace = temp.split(/(\s+)/).map(item => this.removeSpecialCharacter(item.trim(), true)).filter(x => x.length > 0);
      temp = Array.from(new Set(splitBySpace.reverse())).reverse().join(' ');
    }
    
    temp = this.removeSpecialCharacter(temp);
    temp = temp.trim().replace(/ +(?= )/g, ''); // remove duplicate space

    if (temp.length > 140) {
      let index = temp.length - 140;
      temp = temp.slice(index);
    }

    this.text = temp;
  }

  removeSpecialCharacter(input, all = false) {
    let temp = input.trim();
    if (all) {
      temp = temp.replace(/(?:[\.|;|:|{|}|\[|\]|+|_|\-|!|@|#|$|%|^|&|*|(|)|?]+)/g, ""); // remove special char body
    } else {
      temp = temp.replace(/(?:^[\.|,|;|:|{|}|\[|\]|+|_|\-|!|@|#|$|%|^|&|*|(|)|?]+)/g, ""); // remove special char start
      temp = temp.replace(/(?:[;|:|{|}|\[|\]|+|_|!|@|#|$|%|^|&|*|(|)|?]+)/g, ""); // remove special char body
      temp = temp.replace(/(?:[\.|,|;|:|{|}|\[|\]|+|_|\-|!|@|#|$|%|^|&|*|(|)|?]+$)/g, ""); // remove special char end
    }

    return temp;
  }

  /**
 * This function converts the string to lowercase, then perform the conversion
 * Thanks for: https://gist.github.com/jarvisluong/f01e108e963092336f04c4b7dd6f7e45
 * @param {*} str
 * @returns 
 */
  toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
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