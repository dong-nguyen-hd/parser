const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place + 1 slot + numeric/alphaNumeric]
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
    // [place + 2 slot]
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
    // [place + 3 slot]
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
    // [place + 4 slot]
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
    // [1 slot + place]
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
    // [2 slot + place]
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
    // [3 slot + place]
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
    // [4 slot + place]
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
    // [toponyms + place]
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
    // [place + toponyms]
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
