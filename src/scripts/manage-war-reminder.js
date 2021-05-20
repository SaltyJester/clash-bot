const clashApi = require('../utils/clash-api');

// This should return a list of players that need to be DM'd to attack
// n hours before war ends
const getSlackers = async(clanTag, hours) => {
    return new Promise (async (resolve, reject) => {
        try{
            const loop = setInterval(async () => {
                // need a way to retry getCurrentWar() if it fails
                const currentWar = await clashApi.getCurrentWar(clanTag);
                const currentTime = new Date();
                const hoursInMilliseconds = ((hours*60)*60)*1000;
    
                if(currentWar.data.state === 'warEnded'){
                    console.log('currently NOT in war: ' + currentTime.toISOString());
                }
                
                else if(currentWar.data.state === 'preparation'){
                    console.log('currently in preparation: ' + currentTime.toISOString());
                }
                
                else if(currentWar.data.state === 'inWar'){
                    console.log('currently in war: ' + currentTime.toISOString());
                    
                    const warEndTime = {
                        year: currentWar.data.endTime.slice(0, 4),
                        month: currentWar.data.endTime.slice(4, 6),
                        date: currentWar.data.endTime.slice(6, 8),
                        hour: currentWar.data.endTime.slice(9, 11),
                        minute: currentWar.data.endTime.slice(11, 13),
                        second: currentWar.data.endTime.slice(13, 15),
                    }
            
                    const formatedEndTime = new Date();
                    formatedEndTime.setUTCFullYear(parseInt(warEndTime.year));
                    formatedEndTime.setUTCMonth(parseInt(warEndTime.month) - 1);
                    formatedEndTime.setUTCDate(parseInt(warEndTime.date));
                    formatedEndTime.setUTCHours(parseInt(warEndTime.hour));
                    formatedEndTime.setUTCMinutes(parseInt(warEndTime.minute));
                    formatedEndTime.setUTCSeconds(parseInt(warEndTime.second));
                    formatedEndTime.setUTCMilliseconds(0);
            
                    if(currentTime.getTime() > (formatedEndTime.getTime() - hoursInMilliseconds)){
                        console.log('Final Hour');
        
                        // find people in war and return list of discord id's to message
                        
                        clearInterval(loop);
                        return resolve('dummy data');
                    }
                }
            }, 1000); // change time to 5 sceonds in production

            // add event listener here to stop the loop

        }catch(e){
            reject (new Error('Something went wrong in war-watch.js'));
        }
    });
}

module.exports = {
    getSlackers
}