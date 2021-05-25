const {getCurrentWar} = require('../utils/clash-api');
const Player = require('../models/player');

// This should return a list of players that need to be DM'd to attack
// n hours before war ends
const getSlackers = async(currentWar, hoursInMilliseconds) => {
    return new Promise (async (resolve, reject) => {
        try{
            // need to reformat endTime into a usable standard, such as Unix Time
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

            const endTime = formatedEndTime.getTime();
            const currentTime = new Date().getTime();
            const waitTime = endTime - currentTime;
            setTimeout(() => {
                // wait for time to elapse
            }, waitTime - hoursInMilliseconds);

            const updatedWarInfo = await getCurrentWar(process.env.CLAN_TAG);
            const slackers = updatedWarInfo.data.clan.members.filter((member) => {
                if(!member.attacks || member.attacks.length !== 2){
                    return member;
                }
            });
            let toMessage = [];
            for(let i = 0; i < slackers.length; i++){
                const member = await Player.findOne({
                    playerTag: slackers[i].tag,
                    discordID: { $exists: true }
                });
                if(member !== null){
                    toMessage.push(member.discordID);
                }
            }
            // console.log(toMessage);
            return resolve(toMessage);

        }catch(e){
            reject(new Error ('Something went wrong in war-reminders.js'));
        }
    });
}

module.exports = {
    getSlackers
}