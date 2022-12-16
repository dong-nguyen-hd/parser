const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place-prefix + 1 slot]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlacePrefixClassification'],
        not: []
      },
      {
        is: ['AlphaClassification', 'AreaClassification'],
        not: ['ObscureClassification', 'VillageClassification']
      },
    ]
  },
  {
    // [place-prefix + 1 slot + numeric/alphaNumeric]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlacePrefixClassification'],
        not: []
      },
      {
        is: ['AlphaClassification', 'AreaClassification'],
        not: ['ObscureClassification', 'VillageClassification']
      },
      {
        is: ['NumericClassification', 'AlphaNumericClassification'],
        not: []
      },
    ]
  },
  {
    // [place-prefix + 2 slot]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlacePrefixClassification'],
        not: []
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ['ObscureClassification']
      },
    ]
  },
  {
    // [place-prefix + 3 slot]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlacePrefixClassification'],
        not: []
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ["ObscureClassification"]
      },
    ]
  },
  {
    // [place-prefix + 4 slot]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlacePrefixClassification'],
        not: []
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: []
      },
      {
        is: ['AlphaClassification'],
        not: []
      },
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ['ObscureClassification']
      },
    ]
  },
  {
    // [1 slot + place-suffix]
    confidence: 0.72,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['PlaceSuffixClassification'],
        not: []
      },
    ]
  },
  {
    // [2 slot + place-suffix]
    confidence: 0.72,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['PlaceSuffixClassification',],
        not: ['ObscureClassification']
      },
    ]
  },
  {
    // [3 slot + place-suffix]
    confidence: 0.72,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['PlaceSuffixClassification'],
        not: []
      },
    ]
  },
  {
    // [4 slot + place-suffix]
    confidence: 0.72,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification', 'AlphaNumericClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: []
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
      {
        is: ['PlaceSuffixClassification'],
        not: []
      },
    ]
  },
  {
    // [toponyms + place-suffix]
    confidence: 0.73,
    Class: VenueClassification,
    scheme: [
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification']
      },
      {
        is: ['PlaceSuffixClassification'],
        not: []
      },
    ]
  },
  {
    // [place-prefix + toponyms]
    confidence: 0.73,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlacePrefixClassification'],
        not: []
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlacePrefixClassification', 'PlaceSuffixClassification', 'VenueClassification']
      }
    ]
  },
]
