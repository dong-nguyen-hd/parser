const StreetNameClassification = require('../../classification/StreetNameClassification')

module.exports = [
  {
    //  [surname + 1 slot]
    confidence: 0.51,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: []
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      }
    ]
  },
  {
    //  [surname + 2 slot]
    confidence: 0.52,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: []
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      }
    ]
  },
  {
    //  [surname + 3 slot]
    confidence: 0.53,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: []
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      }
    ]
  },
  {
    //  [surname + 4 slot]
    confidence: 0.54,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: []
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification',, 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification', 'ObscureClassification']
      }
    ]
  },
]
