const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place + 1 slot]
    confidence: 0.81,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification', 'VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification', 'VenueClassification', 'ObscureClassification']
      }
    ]
  },
  {
    // [place + 2 slot]
    confidence: 0.81,
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
    confidence: 0.82,
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
    confidence: 0.83,
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
    confidence: 0.84,
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
    confidence: 0.85,
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
    confidence: 0.86,
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
    confidence: 0.87,
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
