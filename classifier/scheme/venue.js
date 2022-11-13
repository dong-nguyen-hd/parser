const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // [place + 2 slot]
    confidence: 0.8,
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
    ]
  },
  {
    // [place + 3 slot]
    confidence: 0.8,
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
    ]
  },
  {
    // [place + 4 slot]
    confidence: 0.8,
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
        not: ['PlaceClassification']
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
    // [3 slot + place]
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
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
  {
    // [4 slot + place]
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
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
        not: ['PlaceClassification']
      },
      {
        is: ['PlaceClassification'],
        not: ['StreetClassification', 'StreetNameClassification']
      },
    ]
  },
]
