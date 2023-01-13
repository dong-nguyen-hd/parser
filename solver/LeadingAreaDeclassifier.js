// enforce that 'area' tokens (admin places) must come after
// less granular components such as street or housenumber
// @todo: this is not globally true, but works well in the Western Hemisphere

const NETURAL_CLASSIFICATIONS = [
  'PostcodeClassification'
]

const ADMIN_CLASSIFICATIONS = [
  'LocalityClassification',
  'CountyClassification',
  'RegionClassification',
  'CountryClassification'
]

class LeadingAreaDeclassifier {
  solve(tokenizer) {
    tokenizer.solution = tokenizer.solution.filter(s => {
      // // record the position of the last non-admin cursor position
      // let lastNonAdminCursorPosition = 0

      // for (let i = 0; i < s.pair.length; i++) {
      //   const isAdmin = ADMIN_CLASSIFICATIONS.some(c => s.pair[i].classification.constructor.name === c)
      //   if (!isAdmin) {
      //     lastNonAdminCursorPosition = s.pair[i].span.end
      //   }
      // }

      // s.pair = s.pair.filter(p => {
      //   const isAdmin = ADMIN_CLASSIFICATIONS.some(c => p.classification.constructor.name === c)
      //   if (isAdmin && p.span.end < lastNonAdminCursorPosition) {
      //     return false
      //   }
      //   return true
      // })

      // Filter invalid solutions
      // Case: region abbreviation
      var area = {};
      s.pair.forEach(p => {
        if (p.classification.constructor.name === ADMIN_CLASSIFICATIONS[2]) area.region = p;
        if (p.classification.constructor.name === ADMIN_CLASSIFICATIONS[1]) area.county = p;
        if (p.classification.constructor.name === ADMIN_CLASSIFICATIONS[0]) area.locality = p;
      })

      var keys = Object.keys(area);
      if (!!area.region && keys.length > 1 && area.region.span.start == 0 && area.region.span.body.length < 10) return false
      
      return true
    })

    tokenizer.solution.sort((a, b) => b.score - a.score) // sort results by score desc
    tokenizer.solution.forEach(s => s.pair.sort((a, b) => a.span.start - b.span.start)) // sort by span start
  }
}

module.exports = LeadingAreaDeclassifier
