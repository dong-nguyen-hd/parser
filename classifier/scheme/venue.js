const VenueClassification = require('../../classification/VenueClassification')

module.exports = [
  {
    // TTTM Vincom Bắc Ninh
    confidence: 0.5,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification', 'VenueClassification', 'PlaceClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Tầng 2 và 3 
    confidence: 0.5,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification', 'HouseNumberClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification', 'NumericClassification'],
        not: ['StreetClassification', 'HouseNumberClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification', 'NumericClassification', 'StopWordClassification'],
        not: ['StreetClassification', 'HouseNumberClassification']
      },
      {
        is: ['AlphaClassification', 'AreaClassification', 'NumericClassification'],
        not: ['StreetClassification', 'HouseNumberClassification']
      }
    ]
  },
  {
    // University Hospital
    confidence: 0.9,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // +++ Park
    confidence: 0.7,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Mt +++ Park
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: []
      }
    ]
  },
  {
    // Air & Space Museum
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: []
      }
    ]
  },
  {
    // National Air & Space Museum
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification']
      },
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: []
      }
    ]
  },
  {
    // Stop 10792
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification', 'IntersectionClassification', 'StopWordClassification', 'HouseNumberClassification']
      },
      {
        is: ['NumericClassification'],
        not: ['HouseNumberClassification']
      }
    ]
  },
  {
    // University of Somewhere
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AreaClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Ecole Jules Vernes
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PersonClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // Donald W Reynolds Stadium
    // boost confidence slightly above street for "Donald W"
    confidence: 0.82,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PersonClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // ZAC du Pré
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetNameClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // ZAC de la Tuilerie
    confidence: 0.8,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StopWordClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['StreetNameClassification'],
        not: ['StreetClassification']
      }
    ]
  },
  {
    // ZA Entraigues
    confidence: 0.7,
    Class: VenueClassification,
    scheme: [
      {
        is: ['PlaceClassification', 'VenueClassification'],
        not: ['StreetClassification']
      },
      {
        is: ['AlphaClassification'],
        not: ['StreetClassification']
      }
    ]
  }
]
