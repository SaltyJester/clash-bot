const referenceTime = new Date();

/**
 * Need to format referenceTime into the one that the clash api sends
 * Clash API Time Format: YYYYMMDDTHHMMSS.000Z 
 * e.g. 20210704T042042.000Z would be 2021-07-04T04:20:42.000Z (ISO 8601)
 * Clash API seems to always zero out milliseconds
 */
const formatTime = (dateObject) => {
    let formatedTime = new Date(dateObject.valueOf());
    formatedTime = formatedTime.toISOString();
    formatedTime = formatedTime.replace(/-/g, '');
    formatedTime = formatedTime.replace(/:/g, '');
    return formatedTime;
}

/**
 * Mock JSON of current war in preparation state
 * NOTE: This mock data isn't complete, it only contains what the test cases need
 * Every war lasts for 47 hours (23 hour preparation + 24 hour battle day)
 */
const startTime = formatTime(referenceTime);
let endTime = new Date(referenceTime.valueOf);
console.log(endTime.toISOString())

const preperationState = {
    state: 'preparation',
    preparationStartTime: undefined,
    startTime,
    endTime: undefined,
    data: {
        clan: {
            members: [
                {
                    tag: undefined,
                    name: undefined,
                    // attacks:
                },
                {
                    tag: undefined
                }
            ]
        }
    },
    state: 200
}