const LocalityClassification = require('../../classification/LocalityClassification')
const CountyClassification = require('../../classification/CountyClassification')
const RegionClassification = require('../../classification/RegionClassification')

module.exports = [
  {
    //  [prefix + locality]
    confidence: 1.0,
    Class: LocalityClassification,
    scheme: [
      {
        is: ['LocalityPrefixClassification'],
        not: []
      },
      {
        is: ['LocalityClassification'],
        not: []
      }
    ]
  },
  {
    //  [prefix + county]
    confidence: 1.0,
    Class: CountyClassification,
    scheme: [
      {
        is: ['CountyPrefixClassification'],
        not: []
      },
      {
        is: ['CountyClassification'],
        not: []
      }
    ]
  },
  {
    //  [prefix + region]
    confidence: 1.0,
    Class: RegionClassification,
    scheme: [
      {
        is: ['RegionPrefixClassification'],
        not: []
      },
      {
        is: ['RegionClassification'],
        not: []
      }
    ]
  }
]
