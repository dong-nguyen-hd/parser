const logger = require('pelias-logger').get('api');
const Debug = require('../helper/debug');
const debugLog = new Debug('santizer:text:pelias_parser');
const unicode = require('../helper/unicode');
const Tokenizer = require('pelias-parser/tokenization/Tokenizer');
const Solution = require('pelias-parser/solver/Solution');
const AddressParser = require('pelias-parser/parser/AddressParser');
const parser = new AddressParser();
const _ = require('lodash');

/**
  this module provides fulltext parsing using the pelias/parser module.
  see: https://github.com/pelias/parser

  'pelias parser' provides the following fields:
  'name',
  'housenumber', 'street', 'postcode',
  'locality', 'region', 'country',
  'admin'
**/

// validate texts, convert types and apply defaults
function _sanitize(raw, clean, req) {
  // error & warning messages
  var messages = { errors: [], warnings: [] };

  // normalize unicode marks
  let text = unicode.normalize(raw.text);

  // remove superfluous whitespace
  text = _.trim(text);

  // validate input 'text'
  if (!_.isString(text) || _.isEmpty(text)) {
    messages.errors.push(`invalid param 'text': text length, must be > 0`);
  }

  // valid input 'text'
  else {
    // tokenize text
    const start = new Date();
    const tokenizer = new Tokenizer(text);
    parser.classify(tokenizer);
    parser.solve(tokenizer);

    // log summary info
    logger.info('pelias_parser', {
      response_time: (new Date()) - start,
      params: clean,
      solutions: tokenizer.solution.length,
      text_length: _.get(clean, 'text.length', 0)
    });

    // add debugging info with all parser solutions
    if (req) {
      debugLog.push(req, () => {
        try {
          return tokenizer.solution.map(s => _.reduce(
            s.pair,
            (text, c, i) => {
              const delim = (i === 0) ? '' : ',';
              return `${text}${delim} ${c.classification.label}='${c.span.body}'`;
            },
            `${s.score.toFixed(2)} ➜`
          ));
        } catch (e) {
          return e.message;
        }
      });
    }

    // parse text with pelias/parser
    clean.text = text;
    clean.parser = 'pelias';
    clean.parsed_text = parse(tokenizer);

    console.log("DongND");
    console.log(clean);
    console.log("DongND");
  }

  return messages;
}

function parse(t) {
  // only use the first solution generated
  // @todo: we could expand this in the future to accomodate more solutions
  let solution = new Solution();
  if (t.solution.length) { solution = t.solution[0]; }

  // 1. map the output of the parser in to parsed_text
  let parsed_text = { subject: undefined };

  solution.pair.forEach(p => {
    let field = p.classification.label;

    // handle intersections
    if (field === 'street') {
      field = (!parsed_text.street) ? 'street' : 'cross_street';
    }

    // set field
    parsed_text[field] = p.span.body;
  });

  // 2. find any unclassified characters:

  // generate a classification mask, eg:
  // 'Foo Cafe 10 Main St London 10010 Earth'
  // '    VVVV NN SSSSSSS AAAAAA PPPPP      '
  let mask = solution.mask(t);

  // the entire input text as seen by the parser with any postcode classification(s) removed
  let body = t.span.body.split('')
    .map((c, i) => (mask[i] !== 'P') ? c : ' ')
    .join('');

  // scan through the input text and 'bucket' characters in to one of two buckets:
  // prefix: all unparsed characters that came before any parsed fields
  // postfix: all characters from the first admin field to the end of the string

  // set cursor to the first classified character from selected classes
  let cursor = mask.search(/[NSAP]/);

  // >> solution includes venue classification
  // set cursor after the venue name
  if (mask.includes('V')) { cursor = mask.lastIndexOf('V') + 1; }

  if (cursor === -1) { cursor = body.length; }
  let prefix = _.trim(body.substr(0, cursor), ' ,');

  // solution includes address classification
  // set cursor after the last classified address character
  if (mask.search(/[NS]/) > -1) {
    cursor = Math.max(mask.lastIndexOf('N'), mask.lastIndexOf('S')) + 1;
  }
  // solution includes admin classification
  // set cursor to the first classified admin character
  else if (mask.includes('A')) { cursor = mask.indexOf('A'); }
  // >> solution includes venue classification
  // set cursor after the venue name
  else if (mask.includes('V')) { cursor = mask.lastIndexOf('V') + 1; }
  // else set cursor to end-of-text
  else { cursor = body.length; }
  let postfix = _.trim(body.substr(cursor), ' ,');

  // clean up spacing around commas
  prefix = prefix.split(/[,\n\t]/).join(', ');
  postfix = postfix.split(/[,\n\t]/).join(', ');

  // handle the case where 'parsed_text' is completely empty
  // ie. the parser was not able to classify anything at all
  // note: this is common for venue names
  // note: length == 1 accounts for 'subject'
  if (Object.keys(parsed_text).length === 1) {
    if (prefix.length && !postfix.length) {
      // if the prefix contains a comma
      // then only use the first part for the prefix for the
      // name and use the remaining tokens for the postfix
      // eg. 'Friendly Cafe, Footown'
      // note: this is how the old 'naive' parser worked
      let split = prefix.split(',');
      if (split.length > 1) {
        prefix = split[0].trim();
        postfix = split.slice(1).join(', ').trim();
      }
    }
  }

  /**
   * Validate adminstrative-component is duplicate
   * @returns true/false
   */
  function isDuplicateAdmin() {
    let tempValue = 1;
    for (const property in parsed_text) {
      if (property != "subject" && property != "admin") {
        if (tempValue === 1) tempValue = parsed_text[property];
        if (tempValue != parsed_text[property]) return false;
      }
    }

    return true;
  }

  function getAdminClosest(){
    if(parsed_text.region) return `, ${parsed_text.region}`;
    if(parsed_text.county) return `, ${parsed_text.county}`;
    if(parsed_text.locality) return `, ${parsed_text.locality}`;

    return '';
  }

  // squash multiple adjacent whitespace characters into a single space
  prefix = prefix.replace(/\s+/g, ' ').trim();
  postfix = postfix.replace(/\s+/g, ' ').trim();

  // 3. store the unparsed characters in fields which can be used for querying
  // if (prefix.length) { parsed_text.name = prefix; }
  if (postfix.length) { parsed_text.admin = postfix; }

  // 4. set 'subject', this is the text which will target the 'name.*'
  // fields in elasticsearch queries

  // only contain two component or component same name
  if (Object.keys(parsed_text).length === 1 || isDuplicateAdmin()) {
    parsed_text.subject = body;
  }
  // a venue query
  else if (!_.isEmpty(parsed_text.venue)) {
    parsed_text.subject = `${parsed_text.venue}${getAdminClosest()}`;
  }
  // a street query
  else if (!_.isEmpty(parsed_text.street)) {
    parsed_text.subject = `${parsed_text.street}${getAdminClosest()}`;
  }
  // query with a $prefix such as a venue query
  else if (!_.isEmpty(prefix)) {
    parsed_text.subject = prefix;
  }
  //
  // a locality query
  else if (!_.isEmpty(parsed_text.locality)) {
    parsed_text.subject = `${parsed_text.locality}${getAdminClosest()}`;

    // remove the locality name from $admin
    if (parsed_text.admin) {
      let width = parsed_text.subject.length;
      let cut = parsed_text.admin.substr(0, width);
      if (cut === parsed_text.subject) {
        parsed_text.admin = _.trim(parsed_text.admin.substr(width), ', ');
        if (!parsed_text.admin.length) { delete parsed_text.admin; }
      }
    }
  }
  // a county query
  else if (!_.isEmpty(parsed_text.county)) {
    parsed_text.subject = `${parsed_text.county}${getAdminClosest()}`;

    // remove the county name from $admin
    if (parsed_text.admin) {
      let width = parsed_text.subject.length;
      let cut = parsed_text.admin.substr(0, width);
      if (cut === parsed_text.subject) {
        parsed_text.admin = _.trim(parsed_text.admin.substr(width), ', ');
        if (!parsed_text.admin.length) { delete parsed_text.admin; }
      }
    }
  }
  // a region query
  else if (!_.isEmpty(parsed_text.region)) {
    parsed_text.subject = `${parsed_text.region}${getAdminClosest()}`;

    // remove the region name from $admin
    if (parsed_text.admin) {
      let width = parsed_text.subject.length;
      let cut = parsed_text.admin.substr(0, width);
      if (cut === parsed_text.subject) {
        parsed_text.admin = _.trim(parsed_text.admin.substr(width), ', ');
        if (!parsed_text.admin.length) { delete parsed_text.admin; }
      }
    }
  }
  // a country query
  else if (!_.isEmpty(parsed_text.country)) {
    parsed_text.subject = parsed_text.country;

    // remove the country name from $admin
    if (parsed_text.admin) {
      let width = parsed_text.subject.length;
      let cut = parsed_text.admin.substr(0, width);
      if (cut === parsed_text.subject) {
        parsed_text.admin = _.trim(parsed_text.admin.substr(width), ', ');
        if (!parsed_text.admin.length) { delete parsed_text.admin; }
      }
    }
  }
  // unknown query type
  else {
    parsed_text.subject = t.span.body;
  }

  return parsed_text;
}

function _expected() {
  return [{ name: 'text' }];
}

// export function
module.exports = () => ({
  sanitize: _sanitize,
  expected: _expected
});
