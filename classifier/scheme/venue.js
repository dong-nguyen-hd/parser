const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place + 2 slot]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
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
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      },
      {
        is: ['PlaceClassification'],
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
        is: ['PlaceClassification'],
        not: []
      },
      {
        is: ['ToponymClassification'],
        not: ['NumericClassification', 'PlaceClassification', 'VenueClassification']
      }
    ]
  },
]
