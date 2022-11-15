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
  res.data.sort(function (a, b) { return b.confidence - a.confidence });

  next();
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
  hit.confidence += checkFallbackLevel(req, hit);
  if (hit.confidence > 0.1) hit.match_type = 'exact';
  hit.confidence = Number((hit.confidence).toFixed(3));

  return hit;
}

function checkFallbackLevel(req, hit) {
  var baseConfidence = 0;

  if (req.clean.parsed_text.hasOwnProperty("region") && hit.parent.region) {
    baseConfidence += computeBaseConfidence(req.clean.parsed_text.region, hit.parent.region, 0.8, 0.4);
  }

  if (req.clean.parsed_text.hasOwnProperty("county") && hit.parent.county) {
    baseConfidence += computeBaseConfidence(req.clean.parsed_text.county, hit.parent.county, 0.6, 0.3);
  }

  if (req.clean.parsed_text.hasOwnProperty("locality") && hit.parent.locality) {
    baseConfidence += computeBaseConfidence(req.clean.parsed_text.locality, hit.parent.locality, 0.4, 0.2);
  }

  if (req.clean.parsed_text.hasOwnProperty("street")) {
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
      baseConfidence += computeBaseConfidence(req.clean.parsed_text.street, temp, 0.2, 0.1);
    }
  }

  if (req.clean.parsed_text.hasOwnProperty("venue")) {
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
      baseConfidence += computeBaseConfidence(req.clean.parsed_text.venue, temp, 0.1, 0.05);
    }
  }

  return baseConfidence;
}

/**
 * 
 * @param {*} parsedText 
 * Component address in pelias-parser
 * @param {*} hitLayer 
 * Component address in database response
 * @param {*} absoluteScore 
 * Score when exact match
 * @param {*} relativeScore 
 * Score when relative match
 * @returns 
 */
function computeBaseConfidence(parsedText, hitLayer, absoluteScore, relativeScore) {
  var baseConfidence = 0;

  if (hitLayer.length) {
    hitLayer.every(element => {
      let src = normalizeProcess(element);
      if (src.includes(parsedText)) {
        baseConfidence += absoluteScore;
        return false;
      } else if (toLowerCaseNonAccentVietnamese(src).includes(parsedText)) {
        baseConfidence += relativeScore;
        return false;
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
