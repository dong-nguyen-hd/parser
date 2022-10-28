const Parser = require('./Parser')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const TokenPositionClassifier = require('../classifier/TokenPositionClassifier')
const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetPrefixClassifier = require('../classifier/StreetPrefixClassifier')
const StreetSuffixClassifier = require('../classifier/StreetSuffixClassifier')
const StreetProperNameClassifier = require('../classifier/StreetProperNameClassifier')
const RoadTypeClassifier = require('../classifier/RoadTypeClassifier')
const ToponymClassifier = require('../classifier/ToponymClassifier')
const CompoundStreetClassifier = require('../classifier/CompoundStreetClassifier')
const DirectionalClassifier = require('../classifier/DirectionalClassifier')
const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const StopWordClassifier = require('../classifier/StopWordClassifier')
const PersonClassifier = require('../classifier/PersonClassifier')
const GivenNameClassifier = require('../classifier/GivenNameClassifier')
const SurnameClassifier = require('../classifier/SurnameClassifier')
const MiddleInitialClassifier = require('../classifier/MiddleInitialClassifier')
const PersonalSuffixClassifier = require('../classifier/PersonalSuffixClassifier')
const PersonalTitleClassifier = require('../classifier/PersonalTitleClassifier')
const ChainClassifier = require('../classifier/ChainClassifier')
const PlaceClassifier = require('../classifier/PlaceClassifier')
const IntersectionClassifier = require('../classifier/IntersectionClassifier')
// const MultiStreetClassifier = require('../classifier/MultiStreetClassifier')
const CentralEuropeanStreetNameClassifier = require('../classifier/CentralEuropeanStreetNameClassifier')
const CompositeClassifier = require('../classifier/CompositeClassifier')
const WhosOnFirstClassifier = require('../classifier/WhosOnFirstClassifier')
// const AdjacencyClassifier = require('../classifier/AdjacencyClassifier')
const ExclusiveCartesianSolver = require('../solver/ExclusiveCartesianSolver')
const LeadingAreaDeclassifier = require('../solver/LeadingAreaDeclassifier')
const MultiStreetSolver = require('../solver/MultiStreetSolver')
const InvalidSolutionFilter = require('../solver/InvalidSolutionFilter')
const TokenDistanceFilter = require('../solver/TokenDistanceFilter')
const OrphanedUnitTypeDeclassifier = require('../solver/OrphanedUnitTypeDeclassifier')
const MustNotPreceedFilter = require('../solver/MustNotPreceedFilter')
const MustNotFollowFilter = require('../solver/MustNotFollowFilter')
const SubsetFilter = require('../solver/SubsetFilter')
const HouseNumberPositionPenalty = require('../solver/HouseNumberPositionPenalty')
const PostcodePositionPenalty = require('../solver/PostcodePositionPenalty')

class AddressParser extends Parser {
  constructor (options) {
    super(
      // classifiers
      [
        // generic word classifiers
        new AlphaNumericClassifier(),
        new TokenPositionClassifier(),

        // word classifiers
        new HouseNumberClassifier(),
        new PostcodeClassifier(),
        new StreetPrefixClassifier(),
        new StreetSuffixClassifier(),
        new StreetProperNameClassifier(),
        new RoadTypeClassifier(),
        new ToponymClassifier(),
        new CompoundStreetClassifier(),
        new DirectionalClassifier(),
        new OrdinalClassifier(),
        new StopWordClassifier(),

        // phrase classifiers
        new IntersectionClassifier(),
        new PersonClassifier(),
        new GivenNameClassifier(),
        new SurnameClassifier(),
        new MiddleInitialClassifier(),
        new PersonalSuffixClassifier(),
        new PersonalTitleClassifier(),
        new ChainClassifier(),
        new PlaceClassifier(),
        new WhosOnFirstClassifier(),

        // composite classifiers
        new CompositeClassifier(require('../classifier/scheme/person')),
        new CompositeClassifier(require('../classifier/scheme/street_name')),
        new CompositeClassifier(require('../classifier/scheme/street')),
        new CompositeClassifier(require('../classifier/scheme/venue')),
        new CompositeClassifier(require('../classifier/scheme/intersection')),

        // additional classifiers which act on unclassified tokens
        new CentralEuropeanStreetNameClassifier()
      ],
      // solvers
      [
        new ExclusiveCartesianSolver(),
        new LeadingAreaDeclassifier(),
        new MultiStreetSolver(),
        new SubsetFilter(),
        new InvalidSolutionFilter([
          ['HouseNumberClassification', 'DistrictClassification'],
          ['HouseNumberClassification', 'DistrictClassification', 'ProvinceClassification'],
          ['HouseNumberClassification', 'DistrictClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'DistrictClassification', 'ProvinceClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'ProvinceClassification'],
          ['HouseNumberClassification', 'ProvinceClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'CountryClassification'],
          ['HouseNumberClassification', 'PostcodeClassification'],
          ['HouseNumberClassification', 'PostcodeClassification', 'DistrictClassification'],
          ['HouseNumberClassification', 'PostcodeClassification', 'ProvinceClassification'],
          ['HouseNumberClassification', 'PostcodeClassification', 'CountryClassification'],
          ['VenueClassification', 'HouseNumberClassification'],
          ['VenueClassification', 'PostcodeClassification']
        ]),
        new MustNotFollowFilter('VenueClassification', 'HouseNumberClassification'),
        new MustNotFollowFilter('VenueClassification', 'StreetClassification'),
        new MustNotFollowFilter('VenueClassification', 'DistrictClassification'),
        new MustNotFollowFilter('VenueClassification', 'ProvinceClassification'),
        new MustNotFollowFilter('VenueClassification', 'CountryClassification'),
        new MustNotFollowFilter('VenueClassification', 'PostcodeClassification'),
        new MustNotPreceedFilter('PostcodeClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('PostcodeClassification', 'StreetClassification'),
        new MustNotPreceedFilter('DistrictClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('DistrictClassification', 'StreetClassification'),
        new MustNotPreceedFilter('ProvinceClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('ProvinceClassification', 'StreetClassification'),
        new MustNotPreceedFilter('CountryClassification', 'ProvinceClassification'),
        new MustNotPreceedFilter('CountryClassification', 'DistrictClassification'),
        new MustNotPreceedFilter('CountryClassification', 'PostcodeClassification'),
        new MustNotPreceedFilter('CountryClassification', 'StreetClassification'),
        new MustNotPreceedFilter('CountryClassification', 'HouseNumberClassification'),
        new MustNotPreceedFilter('VenueClassification', 'UnitClassification'),
        new MustNotFollowFilter('DistrictClassification', 'ProvinceClassification'),
        new MustNotFollowFilter('DistrictClassification', 'CountryClassification'),
        new HouseNumberPositionPenalty(),
        new PostcodePositionPenalty(),
        new TokenDistanceFilter(),
        new OrphanedUnitTypeDeclassifier(),
        new SubsetFilter()
      ],
      options
    )
  }
}

module.exports = AddressParser
