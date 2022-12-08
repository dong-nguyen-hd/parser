const Parser = require('./Parser')
const AlphaNumericClassifier = require('../classifier/AlphaNumericClassifier')
const TokenPositionClassifier = require('../classifier/TokenPositionClassifier')
//const HouseNumberClassifier = require('../classifier/HouseNumberClassifier')
//const PostcodeClassifier = require('../classifier/PostcodeClassifier')
const StreetPrefixClassifier = require('../classifier/StreetPrefixClassifier')
const StreetSuffixClassifier = require('../classifier/StreetSuffixClassifier')
const StreetProperNameClassifier = require('../classifier/StreetProperNameClassifier')
const RoadTypeClassifier = require('../classifier/RoadTypeClassifier')
const ToponymClassifier = require('../classifier/ToponymClassifier')
//const CompoundStreetClassifier = require('../classifier/CompoundStreetClassifier')
//const DirectionalClassifier = require('../classifier/DirectionalClassifier')
//const OrdinalClassifier = require('../classifier/OrdinalClassifier')
const StopWordClassifier = require('../classifier/StopWordClassifier')
const ObscureClassifier = require('../classifier/ObscureClassifier')
//const PersonClassifier = require('../classifier/PersonClassifier')
//const GivenNameClassifier = require('../classifier/GivenNameClassifier')
const SurnameClassifier = require('../classifier/SurnameClassifier')
// const MiddleInitialClassifier = require('../classifier/MiddleInitialClassifier')
// const PersonalSuffixClassifier = require('../classifier/PersonalSuffixClassifier')
// const PersonalTitleClassifier = require('../classifier/PersonalTitleClassifier')
// const ChainClassifier = require('../classifier/ChainClassifier')
const PlaceClassifier = require('../classifier/PlaceClassifier')
// const IntersectionClassifier = require('../classifier/IntersectionClassifier')
// const MultiStreetClassifier = require('../classifier/MultiStreetClassifier')
//const CentralEuropeanStreetNameClassifier = require('../classifier/CentralEuropeanStreetNameClassifier')
const CompositeClassifier = require('../classifier/CompositeClassifier')
const WhosOnFirstClassifier = require('../classifier/WhosOnFirstClassifier')
// const AdjacencyClassifier = require('../classifier/AdjacencyClassifier')
const ExclusiveCartesianSolver = require('../solver/ExclusiveCartesianSolver')
const LeadingAreaDeclassifier = require('../solver/LeadingAreaDeclassifier')
const MultiStreetSolver = require('../solver/MultiStreetSolver')
//const InvalidSolutionFilter = require('../solver/InvalidSolutionFilter')
const TokenDistanceFilter = require('../solver/TokenDistanceFilter')
const OrphanedUnitTypeDeclassifier = require('../solver/OrphanedUnitTypeDeclassifier')
//const MustNotPreceedFilter = require('../solver/MustNotPreceedFilter')
const MustNotFollowFilter = require('../solver/MustNotFollowFilter')
const SubsetFilter = require('../solver/SubsetFilter')
//const HouseNumberPositionPenalty = require('../solver/HouseNumberPositionPenalty')
//const PostcodePositionPenalty = require('../solver/PostcodePositionPenalty')

class AddressParser extends Parser {
  constructor(options) {
    super(
      // classifiers
      [
        // generic word classifiers
        new AlphaNumericClassifier(),
        new TokenPositionClassifier(),

        // word classifiers
        //new HouseNumberClassifier(),
        //new PostcodeClassifier(),
        new StreetPrefixClassifier(),
        new StreetSuffixClassifier(),
        new StreetProperNameClassifier(),
        // new CompoundStreetClassifier(),
        // new DirectionalClassifier(),
        // new OrdinalClassifier(),
        new StopWordClassifier(),
        new ObscureClassifier(),
        new SurnameClassifier(),

        // phrase classifiers
        new ToponymClassifier(),
        new RoadTypeClassifier(),
        new PlaceClassifier(),
        //new IntersectionClassifier(),
        //new PersonClassifier(),
        //new GivenNameClassifier(),
        //new MiddleInitialClassifier(),
        //new PersonalSuffixClassifier(),
        //new PersonalTitleClassifier(),
        //new ChainClassifier(),
        new WhosOnFirstClassifier(),

        // composite classifiers
        //new CompositeClassifier(require('../classifier/scheme/person')),
        new CompositeClassifier(require('../classifier/scheme/venue')),
        new CompositeClassifier(require('../classifier/scheme/street_name')),
        new CompositeClassifier(require('../classifier/scheme/street')),
        //new CompositeClassifier(require('../classifier/scheme/intersection')),

        // additional classifiers which act on unclassified tokens
        //new CentralEuropeanStreetNameClassifier()
      ],
      // solvers
      [
        new ExclusiveCartesianSolver(),
        new LeadingAreaDeclassifier(),
        new MultiStreetSolver(),
        new SubsetFilter(),

        // new InvalidSolutionFilter([
        //   ['VenueClassification', 'RegionClassification'],
        //   ['VenueClassification', 'CountryClassification'],
        // ]),

        new MustNotFollowFilter('RegionClassification', 'CountryClassification'),
        new MustNotFollowFilter('CountyClassification', 'CountryClassification'),
        new MustNotFollowFilter('LocalityClassification', 'CountryClassification'),
        new MustNotFollowFilter('VillageClassification', 'CountryClassification'),

        new MustNotFollowFilter('CountyClassification', 'RegionClassification'),
        new MustNotFollowFilter('LocalityClassification', 'RegionClassification'),
        new MustNotFollowFilter('VillageClassification', 'RegionClassification'),

        new MustNotFollowFilter('LocalityClassification', 'CountyClassification'),
        new MustNotFollowFilter('VillageClassification', 'CountyClassification'),

        new MustNotFollowFilter('VenueClassification', 'CountryClassification'),
        new MustNotFollowFilter('VenueClassification', 'RegionClassification'),
        new MustNotFollowFilter('VenueClassification', 'CountyClassification'),
        new MustNotFollowFilter('VenueClassification', 'LocalityClassification'),
        new MustNotFollowFilter('VenueClassification', 'VillageClassification'),

        new MustNotFollowFilter('StreetClassification', 'CountryClassification'),
        new MustNotFollowFilter('StreetClassification', 'RegionClassification'),
        new MustNotFollowFilter('StreetClassification', 'CountyClassification'),
        new MustNotFollowFilter('StreetClassification', 'LocalityClassification'),
        new MustNotFollowFilter('StreetClassification', 'VillageClassification'),

        //new HouseNumberPositionPenalty(),
        //new PostcodePositionPenalty(),
        new TokenDistanceFilter(),
        new OrphanedUnitTypeDeclassifier(),
        new SubsetFilter()
      ],
      options
    )
  }
}

module.exports = AddressParser
