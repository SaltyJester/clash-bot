const {getCurrentWar} = require('../utils/clash-api');
const Player = require('../models/player');

/*
This returns a list of potential players to remind at a certain time (endTime - hours).
The parameter "hours" indicate how many hours before the war ends should a player be reminded.
Each index in the list contains an object with the following fields: tag, name, remindTime, endTime
*/
const getRemindList = (clanTag, hours) => {
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

            // Get list of players with discordID from db
            let playerDB = await Player.find({});
            playerDB = playerDB.filter((player) => {
                if(player.discordID){
                    return player;
                }
            });

            const messageList = [];
            const members = currentWar.data.clan.members;
            members.forEach((member) => {
                const findMatch = playerDB.find((entry) => { // this might have a time complexity of n^2
                    if(entry.playerTag === member.tag){
                        return entry;
                    }
                });
                let discordID = undefined;
                if(findMatch){
                    discordID = findMatch.discordID
                }
                const messageObject = {
                    tag: member.tag,
                    name: member.name,
                    discordID,
                    remindTime,
                    endTime,
                    // attacks: member.attacks
                }
                messageList.push(messageObject);
            });
            // console.log(messageList);
            resolve(messageList);
        }catch(e){
            console.log(e);
            reject(new Error (e));
        }
    });
}

const updateRemindList = (remindList) => {
    return new Promise(async (resolve, reject) => {
        try{
            // for(let i = 0; i < remindList.length; )
            const currentWar = await getCurrentWar(process.env.CLAN_TAG)
            let members = currentWar.data.clan.members;
            let dict = {};
            members.forEach((member) => {
                if(member.attacks === undefined || member.attacks.length !== 2){
                    dict[member.tag] = member.attacks;
                }
            });

            // console.log(dict);
            let newRemindList = remindList.filter((player) => {
                if(dict[player.tag]){
                    return player;
                }
            });

            /* 
            If player added discordID to db, update remind list
            This might be too slow to implement
            */
            // for(let i = 0; i < newRemindList.length; i++){
            //     if(!newRemindList[i].discordID){
            //         const playerDB = await Player.findOne({playerTag: newRemindList[i].tag});
            //         newRemindList[i].discordID = playerDB.discordID;
            //     }
            // }
            
            resolve(newRemindList);
        }catch(e){
            reject(new Error (e));
        }
    });
}

// Checks to see if players has remaining attacks
const attacksLeft = (player) => {
    return new Promise(async (resolve, reject) => {
        try{
            const currentWar = await getCurrentWar(process.env.CLAN_TAG);
            // console.log(currentWar.clan.members);
            resolve(true);
        }catch(e){
            reject(new Error(e));
        }

    });
}

module.exports = {
    getRemindList,
    updateRemindList,
    attacksLeft
}