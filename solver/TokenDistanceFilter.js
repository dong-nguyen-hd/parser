// enforce a maximum span distance between classifications
// eg. {housenumber} should not be more than n chars from {street}

const MAX_DISTANCE = 2
const MAX_DISTANCE_COMMUNE_DISTRICT = 6
const MAX_DISTANCE_DISTRICT_PROVINCE = 6

class TokenDistanceFilter {
  solve (tokenizer) {
    tokenizer.solution = tokenizer.solution.filter(s => {
      const housenumber = s.pair.filter(p => p.classification.constructor.name === 'HouseNumberClassification')
      const street = s.pair.filter(p => p.classification.constructor.name === 'StreetClassification')
      const commune = s.pair.filter(p => p.classification.constructor.name === 'CommuneClassification');
      const district = s.pair.filter(p => p.classification.constructor.name === 'DistrictClassification');
      const province = s.pair.filter(p => p.classification.constructor.name === 'ProvinceClassification');

      // both commune and district classified
      // ensure tokens are less than n distance apart
      if (commune.length > 0 && district.length > 0) {
        if (district[0].span.distance(commune[0].span) > MAX_DISTANCE_COMMUNE_DISTRICT) { 
          return false
        }
      }

      // both province and district classified
      // ensure tokens are less than n distance apart
      if (province.length > 0 && district.length > 0) {
        if (district[0].span.distance(province[0].span) > MAX_DISTANCE_DISTRICT_PROVINCE) { 
          return false
        }
      }

      // housenumber with no street
      // note: remove this as a postcode classification may be more relevant
      // note: this functionality may no longer be valid in an autocomplete context
      if (housenumber.length > 0 && street.length === 0) {
        s.pair = s.pair.filter(p => p.classification.constructor.name !== 'HouseNumberClassification')
        return s.pair.length > 0
      }

      // both housenumber and street classified
      // ensure tokens are less than n distance apart
      if (housenumber.length > 0 && street.length > 0) {
        if (street[0].span.distance(housenumber[0].span) > MAX_DISTANCE) {
          return false
        }
      }

      return true
    })
  }
}

module.exports = TokenDistanceFilter
