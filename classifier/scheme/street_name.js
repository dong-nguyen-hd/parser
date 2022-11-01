const StreetNameClassification = require('../../classification/StreetNameClassification')

module.exports = [
  {
    //  [surname + 2 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      }
    ]
  },
  {
    //  [surname + 3 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      }
    ]
  },
  {
    //  [surname + 4 slot]
    confidence: 0.5,
    Class: StreetNameClassification,
    scheme: [
      {
        is: ['SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      },
      {
        is: ['AlphaClassification', 'SurnameClassification'],
        not: ['NumericClassification']
      }
    ]
  },
]
