const cleaningDutyBL = require('./CleaningDutyBL');

let getCleaners = (callback) => {

    cleaningDutyBL.getCleaners(callback);
}

var CleaningDutyRHApi = {

    'getCleaners': getCleaners
}

module.exports = CleaningDutyRHApi;