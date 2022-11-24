// enforce a maximum span distance between classifications
// eg. {housenumber} should not be more than n chars from {street}

const MAX_DISTANCE = 2;
const MAX_DISTANCE_LOCALITY_COUNTY = 8;
const MAX_DISTANCE_COUNTY_REGION = 8;

class TokenDistanceFilter {
  solve (tokenizer) {
    tokenizer.solution = tokenizer.solution.filter(s => {
      //const housenumber = s.pair.filter(p => p.classification.constructor.name === 'HouseNumberClassification')
      //const street = s.pair.filter(p => p.classification.constructor.name === 'StreetClassification');
      //const venue = s.pair.filter(p => p.classification.constructor.name === 'VenueClassification');
      const locality = s.pair.filter(p => p.classification.constructor.name === 'LocalityClassification');
      const county = s.pair.filter(p => p.classification.constructor.name === 'CountyClassification');
      const region = s.pair.filter(p => p.classification.constructor.name === 'RegionClassification');

      // both locality and county classified
      // ensure tokens are less than n distance apart
      if (locality.length > 0 && county.length > 0) {
        if (county[0].span.distance(locality[0].span) > MAX_DISTANCE_LOCALITY_COUNTY) { 
          return false
        }
      }

      // both region and county classified
      // ensure tokens are less than n distance apart
      if (region.length > 0 && county.length > 0) {
        if (county[0].span.distance(region[0].span) > MAX_DISTANCE_COUNTY_REGION) { 
          return false
        }
      }

      // DongND: not use
      // // housenumber with no street
      // // note: remove this as a postcode classification may be more relevant
      // // note: this functionality may no longer be valid in an autocomplete context
      // if (housenumber.length > 0 && street.length === 0) {
      //   s.pair = s.pair.filter(p => p.classification.constructor.name !== 'HouseNumberClassification')
      //   return s.pair.length > 0
      // }

      // DongND: not use
      // // both housenumber and street classified
      // // ensure tokens are less than n distance apart
      // if (housenumber.length > 0 && street.length > 0) {
      //   if (street[0].span.distance(housenumber[0].span) > MAX_DISTANCE) {
      //     return false
      //   }
      // }

      return true
    })
  }
}

module.exports = TokenDistanceFilter
