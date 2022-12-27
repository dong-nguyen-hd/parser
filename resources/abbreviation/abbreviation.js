const fs = require('fs');
const path = require('path')
const filepathRegion = path.join(__dirname, './whosonfirst/region.txt');
const filepathCounty = path.join(__dirname, './whosonfirst/county.txt')
const filepathLocality = path.join(__dirname, './whosonfirst/locality.txt')
const filepathStreet = path.join(__dirname, './whosonfirst/street.txt')

function setContentRegionToMap() {
    let mapObj = new Map();
    
    if (!fs.existsSync(filepathRegion)) { return }

    const dict = fs.readFileSync(filepathRegion, 'utf8');
    dict.split('\n').forEach(row => {
        let temp = row.split('=>');
        if (temp.length && temp[0].trim()) {
            let valueMap = _normalize(temp[0]);
            let keyArrMap = temp[1].split('|');
            keyArrMap.forEach(key => {
                if (!!mapObj.get(_normalize(key))) {
                    mapObj.set(_normalize(key), [valueMap, ...mapObj.get(_normalize(key))]);
                } else {
                    mapObj.set(_normalize(key), [valueMap]);
                }
            });
        }
    }, this)

    return mapObj;
}

function setContentCountyToMap() {
    let mapObj = new Map();
    
    if (!fs.existsSync(filepathCounty)) { return }

    const dict = fs.readFileSync(filepathCounty, 'utf8');
    dict.split('\n').forEach(row => {
        let temp = row.split('=>');
        if (temp.length && temp[0].trim()) {
            let valueMap = _normalize(temp[0]);
            let keyArrMap = temp[1].split('|');
            keyArrMap.forEach(key => {
                if (!!mapObj.get(_normalize(key))) {
                    mapObj.set(_normalize(key), [valueMap, ...mapObj.get(_normalize(key))]);
                } else {
                    mapObj.set(_normalize(key), [valueMap]);
                }
            });
        }
    }, this)

    return mapObj;
}

function setContentLocalityToMap() {
    let mapObj = new Map();
    
    if (!fs.existsSync(filepathLocality)) { return }

    const dict = fs.readFileSync(filepathLocality, 'utf8');
    dict.split('\n').forEach(row => {
        let temp = row.split('=>');
        if (temp.length && temp[0].trim()) {
            let valueMap = _normalize(temp[0]);
            let keyArrMap = temp[1].split('|');
            keyArrMap.forEach(key => {
                if (!!mapObj.get(_normalize(key))) {
                    mapObj.set(_normalize(key), [valueMap, ...mapObj.get(_normalize(key))]);
                } else {
                    mapObj.set(_normalize(key), [valueMap]);
                }
            });
        }
    }, this)

    return mapObj;
}

function setContentStreetToMap() {
    let mapObj = new Map();
    
    if (!fs.existsSync(filepathStreet)) { return }

    const dict = fs.readFileSync(filepathStreet, 'utf8');
    dict.split('\n').forEach(row => {
        let temp = row.split('=>');
        if (temp.length && temp[0].trim()) {
            let valueMap = _normalize(temp[0]);
            let keyArrMap = temp[1].split('|');
            keyArrMap.forEach(key => {
                if (!!mapObj.get(_normalize(key))) {
                    mapObj.set(_normalize(key), [valueMap, ...mapObj.get(_normalize(key))]);
                } else {
                    mapObj.set(_normalize(key), [valueMap]);
                }
            });
        }
    }, this)

    return mapObj;
}

function _normalize(cell) {
    if (cell) return cell.trim().toLowerCase().normalize('NFC');

    return cell;
}

module.exports.setContentRegionToMap = setContentRegionToMap
module.exports.setContentStreetToMap = setContentStreetToMap
module.exports.setContentCountyToMap = setContentCountyToMap
module.exports.setContentLocalityToMap = setContentLocalityToMap