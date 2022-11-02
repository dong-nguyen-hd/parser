const StreetClassification = require('../../classification/StreetClassification')

module.exports = [
  {
    // [generic surname]
    confidence: 0.88,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetNameClassification'],
        not: ['IntersectionClassification']
      }
    ]
  },
  {
    // [street-prefix + word + number]
    confidence: 0.88,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['IntersectionClassification']
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
  {
    // [alphanumeric + 2 slot]
    confidence: 0.88,
    Class: StreetClassification,
    scheme: [
      {
        is: ['AlphaNumericClassification', 'NumericClassification'],
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
    // [alphanumeric + 3 slot]
    confidence: 0.88,
    Class: StreetClassification,
    scheme: [
      {
        is: ['AlphaNumericClassification', 'NumericClassification'],
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
  {
    // [alphanumeric + 4 slot]
    confidence: 0.88,
    Class: StreetClassification,
    scheme: [
      {
        is: ['AlphaNumericClassification', 'NumericClassification'],
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
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      }
    ]
  },
]
