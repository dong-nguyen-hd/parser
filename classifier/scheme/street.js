const StreetClassification = require('../../classification/StreetClassification')

module.exports = [
  {
    // [generic surname]
    confidence: 0.76,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetNameClassification'],
        not: ['IntersectionClassification', 'PlaceClassification', 'RoadTypeClassification']
      }
    ]
  },
  {
    // [street-prefix + word + number]
    confidence: 0.77,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['IntersectionClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StopWordClassification'],
        not: ['IntersectionClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification']
      }
    ]
  },
  ,
  {
    // [street-prefix + 2 slot/2 area]
    confidence: 0.77,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['IntersectionClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification'],
        not: ['IntersectionClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification'],
        not: ['IntersectionClassification']
      }
    ]
  },
  {
    // [numeric + 2 slot]
    confidence: 0.77,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['SurnameClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      }
    ]
  },
  {
    // [numeric + 3 slot]
    confidence: 0.77,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['SurnameClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      }
    ]
  },
  {
    // [numeric + 4 slot]
    confidence: 0.77,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['SurnameClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      }
    ]
  },
]
