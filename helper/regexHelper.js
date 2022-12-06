/**
 * Separate house number from address
 * @param {*} src 
 * @returns 
 */
function separateHouseNumber(src) {
    var regexPattern = /^(\d+|\w*\d+\w*)(?=\s+(?!$))/g;
    var houseNumber = src.match(regexPattern);

    if (!!houseNumber) {
        let address = src.substring(houseNumber[0].length, src.length);

        if (address) {
            return {
                address: address.trim(),
                houseNumber: houseNumber[0].trim()
            }
        }
    }

    return {
        address: src
    }
}

module.exports.separateHouseNumber = separateHouseNumber