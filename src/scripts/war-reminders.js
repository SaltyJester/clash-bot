const {getCurrentWar} = require('../utils/clash-api');
const Player = require('../models/player');

/*
This returns a list of potential players to remind at a certain time (endTime - hours).
The parameter "hours" indicate how many hours before the war ends should a player be reminded.
Each index in the list contains an object with the following fields: tag, name, remindTime, endTime
*/
const getMessageList = async(clanTag, hours) => {
    return new Promise (async (resolve, reject) => {
        try{
            const currentWar = await getCurrentWar(clanTag);

            // This reformats endTime into a usable standard, Unix Time
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
            const remindTime = endTime - ((hours*60)*60)*1000;

            const messageList = [];
            const members = currentWar.data.clan.members;
            members.forEach((member) => {
                const messageObject = {
                    tag: member.tag,
                    name: member.name,
                    remindTime,
                    endTime
                }
                messageList.push(messageObject);
            });

            resolve(messageList);
        }catch(e){
            console.log(e);
            reject(new Error ('Something went wrong in war-reminders.js'));
        }
    });
}

const doubleCheckList = async (reminderList) => {
    console.log(reminderList)
}

module.exports = {
    getMessageList,
    doubleCheckList
}