const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place + 2 slot]
    confidence: 0.82,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
    ]
  },
  {
    // [place + 3 slot]
    confidence: 0.83,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
    ]
  },
  {
    // [place + 4 slot]
    confidence: 0.84,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
    ]
  },
  {
    // [1 slot + place]
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
  {
    // [2 slot + place]
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
  {
    // [3 slot + place]
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
  {
    // [4 slot + place]
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['VenueClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['PlaceClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
]
