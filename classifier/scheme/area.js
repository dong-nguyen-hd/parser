const LocalityClassification = require('../../classification/LocalityClassification')
const CountyClassification = require('../../classification/CountyClassification')
const RegionClassification = require('../../classification/RegionClassification')

module.exports = [
  {
    //  [prefix + locality]
    confidence: 0.97,
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
    confidence: 0.98,
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
    confidence: 0.99,
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
