const StreetClassification = require('../../classification/StreetClassification')

module.exports = [
  {
    // [street-prefix + date]
    confidence: 0.71,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['IntersectionClassification', 'PlaceClassification']
      },
      {
        is: ['DateClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
    ]
  },
  {
    // [street-prefix + date_word]
    confidence: 0.71,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['IntersectionClassification', 'PlaceClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['DateWordClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
    ]
  },
  {
    // [street-prefix + word + number]
    confidence: 0.71,
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
  {
    // [generic surname]
    confidence: 0.72,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetNameClassification'],
        not: ['IntersectionClassification', 'PlaceClassification', 'RoadTypeClassification']
      }
    ]
  },
  {
    // [street-prefix + 1 area]
    confidence: 0.73,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification']
      },
      {
        is: ['AreaClassification', 'VenueClassification'],
        not: ['IntersectionClassification']
      },
    ]
  },
  {
    // [street-prefix + 2 slot/2 area]
    confidence: 0.74,
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
    confidence: 0.75,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['StreetNameClassification', 'AreaClassification', 'SurnameClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['StreetNameClassification', 'AreaClassification', 'AlphaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      }
    ]
  },
  {
    // [numeric + 3 slot]
    confidence: 0.76,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification']
      },
      {
        is: ['SurnameClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
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
        is: ['SurnameClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['IntersectionClassification', 'VenueClassification', 'PlaceClassification', 'ObscureClassification']
      }
    ]
  },
]
