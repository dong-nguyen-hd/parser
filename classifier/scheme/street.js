const StreetClassification = require('../../classification/StreetClassification')

module.exports = [
  {
    // [street-prefix + number/alphaNumeric]
    confidence: 0.81,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      }
    ]
  },
  {
    // [number/alphaNumeric + street-prefix + number/alphaNumeric]
    confidence: 0.81,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      }
    ]
  },
  {
    // [street-prefix + obscure + number]
    confidence: 0.81,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['StopWordClassification', 'ObscureClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      }
    ]
  },
  {
    // [numeric/alphaNumeric + street-prefix + obscure + numeric/alphaNumeric]
    confidence: 0.81,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['StopWordClassification', 'ObscureClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      }
    ]
  },
  {
    // [numeric/alphaNumeric + 1 area]
    confidence: 0.82,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['AreaClassification', 'VenueClassification'],
        not: ['VillageClassification', 'PlaceClassification']
      },
    ]
  },
  {
    // [street-prefix + 2 area]
    confidence: 0.82,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['AreaClassification'],
        not: ['VillageClassification']
      },
      {
        is: ['AreaClassification'],
        not: ['VillageClassification']
      }
    ]
  },
  {
    // [numeric/alphaNumeric + street-prefix + 2 area]
    confidence: 0.82,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['AreaClassification'],
        not: ['VillageClassification']
      },
      {
        is: ['AreaClassification'],
        not: ['VillageClassification']
      }
    ]
  },
  {
    // [numeric/alphaNumeric + 2 slot + numeric]
    confidence: 0.82,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetNameClassification', 'AreaClassification', 'SurnameClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['StreetNameClassification', 'AreaClassification', 'AlphaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['NumericClassification'],
        not: []
      },
    ]
  },
  {
    // [numeric/alphaNumeric + 2 slot]
    confidence: 0.83,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['StreetNameClassification', 'AreaClassification', 'AlphaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      }
    ]
  },
  {
    // [numeric/alphaNumeric + 3 slot]
    confidence: 0.83,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      }
    ]
  },
  {
    // [numeric/alphaNumeric + 4 slot]
    confidence: 0.83,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      },
      {
        is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification', 'VillageClassification']
      }
    ]
  },
  {
    // [generic surname]
    confidence: 0.84,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetNameClassification'],
        not: ['PlaceClassification', 'RoadTypeClassification']
      }
    ]
  },
  {
    // [numeric/alphaNumeric + generic surname]
    confidence: 0.84,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetNameClassification'],
        not: ['PlaceClassification', 'RoadTypeClassification']
      }
    ]
  },
  {
    // [street-prefix + generic surname]
    confidence: 0.84,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['StreetNameClassification'],
        not: ['PlaceClassification', 'RoadTypeClassification']
      }
    ]
  },
  {
    // [numeric/alphaNumeric + street-prefix + generic surname]
    confidence: 0.84,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['StreetNameClassification'],
        not: ['PlaceClassification', 'RoadTypeClassification']
      }
    ]
  },
  {
    //  [street-prefix + toponyms]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
    ]
  },
  {
    //  [street-prefix + toponyms + numeric]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['NumericClassification'],
        not: []
      },
    ]
  },
  {
    //  [numeric/alphaNumeric + street-prefix + toponyms]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      }
    ]
  },
  {
    //  [numeric/alphaNumeric + toponyms]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
    ]
  },
  {
    //  [numeric/alphaNumeric + toponyms + numeric]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['NumericClassification'],
        not: []
      },
    ]
  },
  {
    // [street-prefix + date]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['DateClassification'],
        not: []
      },
    ]
  },
  {
    // [numeric/alphaNumeric + street-prefix + date]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['DateClassification'],
        not: []
      },
    ]
  },
  {
    // [street-prefix + numeric + date_word + numeric]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['NumericClassification', 'AlphaClassification'],
        not: []
      },
      {
        is: ['DateWordClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaClassification'],
        not: []
      },
    ]
  },
  {
    // [numeric/alphaNumeric + street-prefix + numeric + date_word + numeric]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['StreetPrefixClassification', 'RoadTypeClassification'],
        not: []
      },
      {
        is: ['NumericClassification'],
        not: []
      },
      {
        is: ['DateWordClassification'],
        not: []
      },
      {
        is: ['NumericClassification'],
        not: []
      },
    ]
  },
  {
    // [numeric/alphaNumeric + numeric + date_word + numeric]
    confidence: 0.85,
    Class: StreetClassification,
    scheme: [
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaClassification'],
        not: []
      },
      {
        is: ['DateWordClassification'],
        not: []
      },
      {
        is: ['NumericClassification', 'AlphaClassification'],
        not: []
      },
    ]
  },
]
