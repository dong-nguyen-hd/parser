const StreetNameClassification = require('../../classification/StreetNameClassification')

module.exports = [
  {
    //  [surname + 1 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      }
    ]
  },
  {
    //  [surname + 2 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      }
    ]
  },
  {
    //  [surname + 3 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      }
    ]
  },
  {
    //  [surname + 4 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      }
    ]
  },
]
