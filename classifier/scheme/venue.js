const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place + 2 slot]
    confidence: 0.71,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['ObscureClassification']
      },
    ]
  },
  {
    // [place + 3 slot]
    confidence: 0.72,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ["ObscureClassification"]
      },
    ]
  },
  {
    // [place + 4 slot]
    confidence: 0.73,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ["ObscureClassification"]
      },
    ]
  },
  {
    // [1 slot + place]
    confidence: 0.74,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification', 'ObscureClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification', 'VenueClassification']
      },
    ]
  },
  {
    // [2 slot + place]
    confidence: 0.75,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification', 'ObscureClassification']
      },
    ]
  },
  {
    // [3 slot + place]
    confidence: 0.76,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
  {
    // [4 slot + place]
    confidence: 0.77,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification', 'PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'ObscureClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
]
