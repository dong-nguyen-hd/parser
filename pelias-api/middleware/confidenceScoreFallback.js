/**
 *
 * Basic confidence score should be computed and returned for each item in the results.
 * The score should range between 0-1, and take into consideration as many factors as possible.
 *
 * Some factors to consider:
 *
 * - number of results from ES
 * - fallback status (aka layer match between expected and actual)
 */

const _ = require('lodash');

function setup() {
  return computeScores;
}

function computeScores(req, res, next) {
  //console.log(res);
  // do nothing if no result data set or if the query is not of the fallback variety
  // later add disambiguation to this list
  if (_.isUndefined(req.clean) || _.isUndefined(res) ||
    _.isUndefined(res.data) || _.isUndefined(res.meta)) {
    return next();
  }

  if (['search_fallback', 'address_search_with_ids', 'structured'].includes(res.meta.queryType)) {
    return next();
  }

  // loop through data items and determine confidence scores
  res.data = res.data.map(computeConfidenceScore.bind(null, req));

  // sort by confidence 
  res.data = filterHitValid(res.data);

  next();
}

function filterHitValid(data) {
  if (data.length) {
    let validArr = data.filter(x => x.confidence != 0);
    return validArr.sort(function (a, b) { return b.confidence - a.confidence });
  }

  return [];
}

/**
 * Check all types of things to determine how confident we are that this result
 * is correct.
 *
 * @param {object} req
 * @param {object} hit
 * @returns {object}
 */
function computeConfidenceScore(req, hit) {
  hit.confidence = 0.1;

  // if parsed text doesn't exist, which it never should, just assign a low confidence and move on
  if (!req.clean.hasOwnProperty('parsed_text')) {
    hit.match_type = 'unknown';
    return hit;
  }

  // in the case of fallback there might be deductions
  let confidence = checkFallbackLevel(req, hit);
  if (confidence) {
    hit.confidence += confidence;
    hit.match_type = 'exact';
    hit.confidence = Number((hit.confidence).toFixed(3));
  } else hit.confidence = 0;

  return hit;
}

function checkFallbackLevel(req, hit) {
  try {
    var lengthKeys = Object.keys(req.clean.parsed_text).length;
    if (lengthKeys === 1 || (lengthKeys === 2 && req.clean.parsed_text.isNonAccent)) return 0.1; // Parser not working

    var baseConfidence = 0;

    if (!!req.clean.parsed_text.region_arr && hit.parent.region) {
      baseConfidence += computeBaseConfidence(req.clean.parsed_text.region_arr, hit.parent.region, 0.9, 0.4);
    }

    if (!!req.clean.parsed_text.county_arr && hit.parent.county) {
      baseConfidence += computeBaseConfidence(req.clean.parsed_text.county_arr, hit.parent.county, 0.7, 0.3);
    }

    if (!!req.clean.parsed_text.locality_arr && hit.parent.locality) {
      baseConfidence += computeBaseConfidence(req.clean.parsed_text.locality_arr, hit.parent.locality, 0.5, 0.2);
    }

    if ((!!req.clean.parsed_text.region || !!req.clean.parsed_text.county || !!req.clean.parsed_text.locality) && !baseConfidence) return baseConfidence; // Remove hit not match adminstrative

    if (!!req.clean.parsed_text.street_arr) {
      let temp = [];
      if (Array.isArray(hit.name.default)) {
        let arrTemp = hit.name.default;
        let maxLenght = 0;
        let indexMaxLenght = 0;
        for (let i = 0; i < arrTemp.length; i++) {
          if (arrTemp[i].length > maxLenght) {
            maxLenght = arrTemp[i].length;
            indexMaxLenght = i;
          }
        }
        temp.push(hit.name.default[indexMaxLenght]);
      } else {
        temp.push(hit.name.default);
      }

      if (temp) {
        baseConfidence += computeBaseConfidence(req.clean.parsed_text.street_arr, temp, 0.9, 0.4);
      }
    }

    if (!!req.clean.parsed_text.venue_arr) {
      let temp = [];
      if (Array.isArray(hit.name.default)) {
        let arrTemp = hit.name.default;
        let maxLenght = 0;
        let indexMaxLenght = 0;
        for (let i = 0; i < arrTemp.length; i++) {
          if (arrTemp[i].length > maxLenght) {
            maxLenght = arrTemp[i].length;
            indexMaxLenght = i;
          }
        }
        temp.push(hit.name.default[indexMaxLenght]);
      } else {
        temp.push(hit.name.default);
      }

      if (temp) {
        baseConfidence += computeBaseConfidence(req.clean.parsed_text.venue_arr, temp, 0.9, 0.4);
      }
    }

    return baseConfidence;
  }
  catch {
    return 0;
  }
}

/**
 * 
 * @param {*} parsedText 
 * Array component address in pelias-parser
 * @param {*} hitLayer 
 * Array component address in database response
 * @param {*} absoluteScore 
 * Score when exact match
 * @param {*} relativeScore 
 * Score when relative match
 * @returns 
 */
function computeBaseConfidence(parsedText, hitLayer, absoluteScore, relativeScore) {
  var baseConfidence = 0;

  if (hitLayer.length) {
    hitLayer.every(elementHit => {
      let hit = normalizeProcess(elementHit);
      let hitNonAccent = toLowerCaseNonAccentVietnamese(hit);

      for (let index = 0; index < parsedText.length; index++) {
        const elementParsed = parsedText[index];

        if (hit.includes(elementParsed)) {
          baseConfidence += (absoluteScore / (index + 1));
          return false;
        } else if (hitNonAccent.includes(toLowerCaseNonAccentVietnamese(elementParsed))) {
          baseConfidence += (relativeScore / (index + 1));
          return false;
        }
      }
    });
  }

  return baseConfidence;
}

/**
 * This function converts the string to lowercase, then perform the conversion
 * Thanks for: https://gist.github.com/jarvisluong/f01e108e963092336f04c4b7dd6f7e45
 * @param {*} str
 * @returns 
 */
function toLowerCaseNonAccentVietnamese(str) {
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

function normalizeProcess(src) {
  var temp = src.normalize('NFC').toLowerCase().trim().replace(/ +(?= )/g, '');
  return temp;
}

module.exports = setup;
