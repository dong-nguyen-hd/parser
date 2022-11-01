const StreetClassification = require('../../classification/StreetClassification')

module.exports = [
  {
    // [generic surname]
    confidence: 0.88,
    Class: StreetClassification,
    scheme: [
      {
        is: ['StreetNameClassification'],
        not: ['IntersectionClassification']
      }
    ]
  },
  // {
  //   // đường Trường Chinh
  //   confidence: 0.88,
  //   Class: StreetClassification,
  //   scheme: [
  //     {
  //       is: ['StreetPrefixClassification', 'RoadTypeClassification'],
  //       not: ['IntersectionClassification']
  //     },
  //     {
  //       is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
  //       not: ['IntersectionClassification']
  //     },
  //     {
  //       is: ['AlphaClassification', 'StreetNameClassification', 'AreaClassification'],
  //       not: ['IntersectionClassification']
  //     }
  //   ]
  // },
  // {
  //   // đường Cách mạng tháng Tám
  //   confidence: 0.88,
  //   Class: StreetClassification,
  //   scheme: [
  //     {
  //       is: ['AlphaClassification', 'StreetPrefixClassification', 'RoadTypeClassification', 'SurnameClassification'],
  //       not: ['CommuneClassification']
  //     },
  //     {
  //       is: ['AlphaClassification', 'StreetNameClassification'],
  //       not: []
  //     },
  //     {
  //       is: ['AlphaClassification', 'StreetNameClassification'],
  //       not: []
  //     },
  //     {
  //       is: ['AlphaClassification', 'StreetNameClassification'],
  //       not: []
  //     },
  //     {
  //       is: ['AlphaClassification', 'StreetNameClassification'],
  //       not: []
  //     }
  //   ]
  // },
  // {
  //   // Ngõ 56 Lê Văn Hiến
  //   confidence: 0.88,
  //   Class: StreetClassification,
  //   scheme: [
  //     {
  //       is: ['StreetPrefixClassification', 'StartTokenClassification'],
  //       not: ['StreetClassification', 'IntersectionClassification']
  //     },
  //     {
  //       is: ['AlphaNumericClassification', 'NumericClassification', 'HouseNumberClassification'],
  //       not: ['StreetClassification', 'IntersectionClassification']
  //     },
  //     {
  //       is: ['StreetNameClassification'],
  //       not: ['StreetClassification', 'IntersectionClassification']
  //     },
  //   ]
  // },
  // {
  //   // Ngõ 56, Lê Văn Hiến
  //   confidence: 0.88,
  //   Class: StreetClassification,
  //   scheme: [
  //     {
  //       is: ['StreetNameClassification', 'AlphaNumericClassification', 'SurnameClassification'],
  //       not: ['StreetClassification', 'IntersectionClassification']
  //     },
  //     {
  //       is: ['StreetNameClassification', 'AlphaClassification', 'StreetClassification'],
  //       not: ['IntersectionClassification']
  //     },
  //   ]
  // },
]
