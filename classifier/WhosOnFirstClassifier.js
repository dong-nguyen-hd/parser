const PhraseClassifier = require('./super/PhraseClassifier')
const AreaClassification = require('../classification/AreaClassification')
const CountryClassification = require('../classification/CountryClassification')
const LocalityClassification = require('../classification/LocalityClassification')
const VillageClassification = require('../classification/VillageClassification')
const RegionClassification = require('../classification/RegionClassification')
const CountyClassification = require('../classification/CountyClassification')
const whosonfirst = require('../resources/whosonfirst/whosonfirst')
const normalizeNonAccent = require('../tokenization/normalizer')({ lowercase: true, removeHyphen: true, removeAccents: true })
const normalize = require('../tokenization/normalizer')({ lowercase: true, removeHyphen: true, removeAccents: false })

// databases sourced from the "hanhchinhvn" project
// see: https://github.com/madnh/hanhchinhvn

// note: these should be defined from most granular to least granular
const placetypes = {
  village: {
    files: ['name_vi_x_preferred.txt'],
    classifications: [AreaClassification, VillageClassification]
  },
  locality: {
    files: ['name_vi_x_preferred.txt'],
    classifications: [AreaClassification, LocalityClassification]
  },
  county: {
    files: ['name_vi_x_preferred.txt'],
    classifications: [AreaClassification, CountyClassification]
  },
  region: {
    files: ['name_vi_x_preferred.txt'],
    classifications: [AreaClassification, RegionClassification]
  },
  country: {
    files: ['name_vi_x_preferred.txt'],
    classifications: [AreaClassification, CountryClassification]
  }
}

class WhosOnFirstClassifier extends PhraseClassifier {
  setup() {
    this.tokens = {}
    Object.keys(placetypes).forEach(placetype => {
      this.tokens[placetype] = new Set()
      whosonfirst.load(this.tokens[placetype], [placetype], placetypes[placetype].files, {
        minlength: 2,
        normalizer: normalize
      })

      // general blacklist
      // this.tokens[placetype].delete('đường')
      // this.tokens[placetype].delete('huyện')
      // this.tokens[placetype].delete('xã')
      // this.tokens[placetype].delete('north')
      // this.tokens[placetype].delete('south')
      // this.tokens[placetype].delete('east')
      // this.tokens[placetype].delete('west')
      // this.tokens[placetype].delete('street')
      // this.tokens[placetype].delete('city')
      // this.tokens[placetype].delete('king')
      // this.tokens[placetype].delete('at')
      // this.tokens[placetype].delete('rue')
      // this.tokens[placetype].delete('one')
      // this.tokens[placetype].delete('two')
      // this.tokens[placetype].delete('three')
      // this.tokens[placetype].delete('four')
      // this.tokens[placetype].delete('five')
      // this.tokens[placetype].delete('six')
      // this.tokens[placetype].delete('seven')
      // this.tokens[placetype].delete('eight')
      // this.tokens[placetype].delete('nine')
      // this.tokens[placetype].delete('ten')
      // this.tokens[placetype].delete('cafe')
      // this.tokens[placetype].delete('small')
      // this.tokens[placetype].delete('town')
      // this.tokens[placetype].delete('city')
      // this.tokens[placetype].delete('grand')

      // placetype specific modifications
      // if (placetype === 'locality') {
      //   // remove locality names that sound like streets
      //   const remove = ['đường', 'avenue', 'lane', 'terrace', 'street', 'road', 'crescent', 'furlong', 'broadway']
      //   this.tokens.locality.forEach(token => {
      //     const split = token.split(/\s/)
      //     //const lastWord = split[split.length - 1]
      //     const firstWord = split[0]
      //     if (remove.includes(firstWord)) {
      //       this.tokens.locality.delete(token)
      //     }
      //   })
      // }
    })
  }

  each(span) {
    let confidence = 0.1;
    let baseConfidence = 0.35;

    // do not classify tokens preceeded by an 'IntersectionClassification' or add a penality to 'StopWordClassification'
    //const firstChild = span.graph.findOne('child:first') || span
    //const prev = firstChild.graph.findOne('prev')

    // if (prev) {
    //   if (prev.classifications.hasOwnProperty('IntersectionClassification')) {
    //     return
    //   } else if (prev.classifications.hasOwnProperty('StopWordClassification')) {
    //     confidence = confidence / 2
    //   }
    // }

    // do not classify tokens preceeding 'StreetSuffixClassification' or 'PlacePrefixClassification' or 'PlaceSuffixClassification'
    // const lastChild = span.graph.findOne('child:last') || span
    // const next = lastChild.graph.findOne('next')
    // if (
    //   next && (
    //     next.classifications.hasOwnProperty('StreetSuffixClassification') ||
    //     next.classifications.hasOwnProperty('PlaceSuffixClassification') ||
    //     next.classifications.hasOwnProperty('PlacePrefixClassification')
    //   )) {
    //   return
    // }

    const nonAccentSpan = normalizeNonAccent(span.norm)
    const normalizedSpan = normalize(span.norm)
    Object.keys(placetypes).forEach(placetype => {
      if (this.tokens[placetype].has(normalizedSpan)) {
        let tempConfidence = Number(span.end) / 140 * baseConfidence;

        if (placetype == "country") confidence = 0.85 + tempConfidence;
        if (placetype == "region") confidence = 0.84 + tempConfidence;
        if (placetype == "county") confidence = 0.63 + tempConfidence;
        if (placetype === "locality") confidence = 0.62 + tempConfidence;
        if (placetype == "village") confidence = 0.61 + tempConfidence;

        // do not classify tokens if they already have a 'StopWordClassification'
        // if (
        //   span.classifications.hasOwnProperty('StopWordClassification') || (
        //     span.graph.length('child') > 0 &&
        //     span.graph.findOne('child').classifications.hasOwnProperty('StopWordClassification')
        //   )
        // ) { return }

        // classify tokens
        placetypes[placetype].classifications.forEach(Class => span.classify(new Class(confidence)))
      } else if (this.tokens[placetype].has(nonAccentSpan)) {
        let tempConfidence = Number(span.end) / 140 * baseConfidence;

        if (placetype == "country") confidence = 0.85 / 2 + tempConfidence;
        if (placetype == "region") confidence = 0.84 / 2 + tempConfidence;
        if (placetype == "county") confidence = 0.63 / 2 + tempConfidence;
        if (placetype === "locality") confidence = 0.62 / 2 + tempConfidence;
        if (placetype == "village") confidence = 0.61 / 2 + tempConfidence;

        // classify tokens
        placetypes[placetype].classifications.forEach(Class => span.classify(new Class(confidence)))
      }
    })
  }
}

module.exports = WhosOnFirstClassifier
module.exports.placetypes = placetypes
