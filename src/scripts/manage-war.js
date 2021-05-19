const clashApi = require('../utils/clash-api');
const BotState = require('../models/bot-state');

// This should return a list of players that need to be DM'd to attack
// n hours before war ends
const checkWarLoop = async(clanTag, hours) => {
    try{
        const loop = setInterval(async () => {
            const currentWar = await clashApi.getCurrentWar(clanTag);
            if(currentWar.data.state === 'warEnded'){
                return;
            }
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
    
            const botState = await BotState.findOne();
            const hoursInMilliseconds = ((hours*60)*60)*1000;
            const currentTime = new Date();
            if(currentTime.getTime() > (formatedEndTime.getTime() - hoursInMilliseconds)){
                console.log('Final Hour'); // return list here

                // find people in war and return list of discord id's to message

                botState.isManageWarRunning = false;
                botState.save();
                clearInterval(loop);
            }else if(botState.isManageWarRunning === false){
                console.log('MANUAL STOP');
                clearInterval(loop);
            }
            console.log('Loop is running!!! ');
            console.log(botState.isManageWarRunning);
        }, 1000); // change time to 5 sceonds in production
    }catch(e){
        throw new Error('Something went wrong in war-watch.js');
    }
}

module.exports = {
    checkWarLoop
}