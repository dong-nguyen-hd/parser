const logger = require('pelias-logger').get('api');
const Debug = require('../helper/debug');
const debugLog = new Debug('santizer:text:pelias_parser');
const unicode = require('../helper/unicode');
const Tokenizer = require('pelias-parser/tokenization/Tokenizer');
const Solution = require('pelias-parser/solver/Solution');
const AddressParser = require('pelias-parser/parser/AddressParser');
const Abbreviation = require('pelias-parser/resources/abbreviation/abbreviation')
const parser = new AddressParser();
const _ = require('lodash');

/**
  this module provides fulltext parsing using the pelias/parser module.
  see: https://github.com/pelias/parser

  'pelias parser' provides the following fields:
  'venue', 'street',
  'locality', 'county', 'region', 'country',
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

    // Tokenizer for request ES
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
    var mapRegion = Abbreviation.setContentRegionToMap();
    var mapCounty = Abbreviation.setContentCountyToMap();
    var mapStreet = Abbreviation.setContentStreetToMap();
    var parsed_text = parse(tokenizer, mapRegion, mapCounty, mapStreet);
    var parsed_text_arr = mappingAbbreviated(parsed_text, tokenizer.solution, mapRegion, mapCounty, mapStreet);

    if (!!parsed_text.region || !!parsed_text.county || !!parsed_text.locality) {
      clean.parsed_text = parsed_text_arr;
    } else {
      // Tokenizer support non-accent
      const nonAccentTokenizer = new Tokenizer(text, true);
      parser.classify(nonAccentTokenizer);
      parser.solve(nonAccentTokenizer);
      clean.parsed_text = supportNonAccent(parsed_text_arr, nonAccentTokenizer.solution);
    }

    if (isAdmin(clean.parsed_text)) clean.parsed_text.admin = renderAdmin(clean.parsed_text);

    // // Debug
    // console.log("DongND");
    // console.log(clean.parsed_text);
    // console.log("DongND");
  }

  return messages;
}

/**
 * Render string administrative
 * @param {*} src - clean.parsed_text
 * @returns 
 */
function renderAdmin(src) {
  var tempAdmin = [];
  if (!!src.locality_arr) {
    src.locality_arr.forEach(element => {
      if (element != src.subject) tempAdmin.push(element);
    });
  }

  if (!!src.county_arr) {
    src.county_arr.forEach(element => {
      if (element != src.subject && tempAdmin.findIndex(x => x == element) == -1) tempAdmin.push(element);
    });
  }

  if (!!src.region_arr) {
    src.region_arr.forEach(element => {
      if (element != src.subject && tempAdmin.findIndex(x => x == element) == -1) tempAdmin.push(element);
    });
  }

  if (src.country && src.subject != src.country) {
    tempAdmin.push(src.country);
  }

  return tempAdmin.toString();
}

function isAdmin(src) {
  if (!!src.region_arr || !!src.county_arr || !!src.locality_arr) return true;
  return false;
}

/**
 * Mapping word abbreviated with all solutions
 * @param {*} parsed_text 
 * @param {*} solutions 
 * @param {*} mapRegion 
 * @param {*} mapStreet 
 * @returns 
 */
function mappingAbbreviated(parsed_text, solutions, mapRegion, mapCounty, mapStreet) {
  if (!solutions.length) return parsed_text;

  solutions.forEach(element => {
    let parseredObj = mappingLabel(element);

    // region
    if (parseredObj.region) {
      let abbreviated = mapRegion.get(parseredObj.region);
      if (!!parsed_text.region_arr) {
        if (!!abbreviated) parsed_text.region_arr = [...parsed_text.region_arr, ...abbreviated];
        else parsed_text.region_arr.push(parseredObj.region);
      } else {
        if (!!abbreviated) parsed_text.region_arr = abbreviated;
        else parsed_text.region_arr = [parseredObj.region];
      }

      parsed_text.region_arr = [...new Set(parsed_text.region_arr)];
    }

    // county
    if (parseredObj.county) {
      let abbreviated = mapCounty.get(parseredObj.county);
      if (!!parsed_text.county_arr) {
        if (!!abbreviated) parsed_text.county_arr = [...parsed_text.county_arr, ...abbreviated];
        else parsed_text.county_arr.push(parseredObj.county);
      } else {
        if (!!abbreviated) parsed_text.county_arr = abbreviated;
        else parsed_text.county_arr = [parseredObj.county];
      }

      parsed_text.county_arr = [...new Set(parsed_text.county_arr)];
    }

    // locality
    if (parseredObj.locality) {
      let abbreviated = undefined; // TODO: mapLocality.get(parseredObj.region);
      if (!!parsed_text.locality_arr) {
        if (!!abbreviated) parsed_text.locality_arr = [...parsed_text.locality_arr, ...abbreviated];
        else parsed_text.locality_arr.push(parseredObj.locality);
      } else {
        if (!!abbreviated) parsed_text.locality_arr = abbreviated;
        else parsed_text.locality_arr = [parseredObj.locality];
      }

      parsed_text.locality_arr = [...new Set(parsed_text.locality_arr)];
    }

    // street
    if (parseredObj.street) {
      let abbreviated = [mappingAbbreviatedStreetOrVenue(parseredObj.street, mapStreet)];
      if (!!parsed_text.street_arr) {
        if (!!abbreviated) parsed_text.street_arr = [...parsed_text.street_arr, ...abbreviated];
        else parsed_text.street_arr.push(parseredObj.street);
      } else {
        if (!!abbreviated) parsed_text.street_arr = abbreviated;
        else parsed_text.street_arr = [parseredObj.street];
      }

      parsed_text.street_arr = [...new Set(parsed_text.street_arr)];
    }

    // venue
    if (parseredObj.venue) {
      let abbreviated = [mappingAbbreviatedStreetOrVenue(parseredObj.venue, mapStreet)];
      if (!!parsed_text.venue_arr) {
        if (!!abbreviated) parsed_text.venue_arr = [...parsed_text.venue_arr, ...abbreviated];
        else parsed_text.venue_arr.push(parseredObj.venue);
      } else {
        if (!!abbreviated) parsed_text.venue_arr = abbreviated;
        else parsed_text.venue_arr = [parseredObj.venue];
      }

      parsed_text.venue_arr = [...new Set(parsed_text.venue_arr)];
    }
  });

  return parsed_text;
}

/**
 * Mapping the output of the parser in to parsed_text
 * @param {*} element 
 */
function mappingLabel(element) {
  let solution = new Solution();
  solution = element;

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

  return parsed_text;
}

/**
 * Support case misspelled
 * @param {*} srcParsed 
 * @param {*} nonAccentSolution 
 * @returns 
 */
function supportNonAccent(srcParsed, nonAccentSolution) {
  if (!nonAccentSolution.length) return srcParsed;

  let parseredObj = mappingLabel(nonAccentSolution[0]);

  if (parseredObj.region && !srcParsed.hasOwnProperty('reion_arr')) {
    srcParsed.reion_arr = [parseredObj.region];
    srcParsed.isNonAccent = true;
  }
  if (parseredObj.county && !srcParsed.hasOwnProperty('county_arr')) {
    srcParsed.county_arr = [parseredObj.county];
    srcParsed.isNonAccent = true;
  }
  if (parseredObj.locality && !srcParsed.hasOwnProperty('locality_arr')) {
    srcParsed.locality_arr = [parseredObj.locality];
    srcParsed.isNonAccent = true;
  }

  return srcParsed;
}

function parse(t, mapRegion, mapCounty, mapStreet) {
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

  // squash multiple adjacent whitespace characters into a single space
  prefix = prefix.replace(/\s+/g, ' ').trim();
  postfix = postfix.replace(/\s+/g, ' ').trim();

  // 3. store the unparsed characters in fields which can be used for querying
  // DongND: not use
  // if (prefix.length) { parsed_text.name = prefix; }
  // if (postfix.length) { parsed_text.admin = postfix; }

  // 4. set 'subject', this is the text which will target the 'name.*'
  // fields in elasticsearch queries

  // parser not working
  let lengthKeys = Object.keys(parsed_text).length;
  if (lengthKeys === 1 || lengthKeys == 2) {
    parsed_text.subject = mappingAbbreviatedStreetOrVenue(body, mapStreet);
  }
  // a venue query
  else if (!_.isEmpty(parsed_text.venue) && parsed_text.venue.split(' ').length <= 4 && !_.isEmpty(parsed_text.street)) {
    parsed_text.subject = mappingAbbreviatedStreetOrVenue(parsed_text.venue, mapStreet);
  }
  // a street query
  else if (!_.isEmpty(parsed_text.street)) {
    parsed_text.subject = mappingAbbreviatedStreetOrVenue(parsed_text.street, mapStreet);
  }
  // a venue query
  else if (!_.isEmpty(parsed_text.venue) && parsed_text.venue.split(' ').length <= 4) {
    parsed_text.subject = mappingAbbreviatedStreetOrVenue(parsed_text.venue, mapStreet);
  }
  // a locality query
  else if (!_.isEmpty(parsed_text.locality)) {
    parsed_text.subject = parsed_text.locality;
  }
  // a county query
  else if (!_.isEmpty(parsed_text.county)) {
    let subject = parsed_text.county;

    if (!!mapCounty.get(subject)) {
      subject = mapCounty.get(subject)[0];
    }

    parsed_text.subject = subject;
  }
  // a region query
  else if (!_.isEmpty(parsed_text.region)) {
    let subject = parsed_text.region;

    if (!!mapRegion.get(subject)) {
      subject = mapRegion.get(subject)[0];
    }

    parsed_text.subject = subject;
  }
  // a country query
  else if (!_.isEmpty(parsed_text.country)) {
    parsed_text.subject = parsed_text.country;
  }
  // unknown query type
  else {
    parsed_text.subject = t.span.body;
  }

  return parsed_text;
}

function mappingAbbreviatedStreetOrVenue(value, mapStreet) {
  let subject = value;
  for (const key of mapStreet.keys()) {
    let strRegex = key.replace(".", "\\.");
    let isMatchRegex = new RegExp(`(?<=\\s|^)(${strRegex})(?=\\s+|$)`, 'g');
    if (isMatchRegex.test(subject)) {
      subject = subject.replace(isMatchRegex, mapStreet.get(key)[0]);
      return subject;
    }
  }

  return subject;
}

function _expected() {
  return [{ name: 'text' }];
}

// export function
module.exports = () => ({
  sanitize: _sanitize,
  expected: _expected
});
