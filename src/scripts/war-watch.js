const clashApi = require('../utils/clash-api');

// This should return a list of players that need to be DM'd to attack
// Debating if I need a database (MongoDB or Postgres)
const remindPlayers = async(clanTag) => {
    try{
        const currentWar = await clashApi.getCurrentWar(clanTag);
        if(currentWar.data.state === 'warEnded'){
            // console.log('not currently in war');
            // console.log(currentWar.data.clan.members);

            // I DONT KNOW WHAT I'M DOING, Look up UNIX time to solve this problem

            const warEndTimeOBject = {
                year: currentWar.data.endTime.slice(0, 4),
                month: currentWar.data.endTime.slice(4, 6),
                day: currentWar.data.endTime.slice(6, 8),
                hour: currentWar.data.endTime.slice(9, 11),
                minute: currentWar.data.endTime.slice(11, 13),
                second: currentWar.data.endTime.slice(13, 15)
            }

            console.log(warEndTimeOBject);
            // const warEndTime = new Date();
            // warEndTime.setFullYear(warEndTimeOBject.year);
            // warEndTime.setMonth(warEndTimeOBject.month);
            // warEndTime.setDate(warEndTimeOBject.day);
            // warEndTime.setHours(warEndTimeOBject.hour);
            // warEndTime.setMinutes(warEndTimeOBject.minute);
            // warEndTime.setSeconds(warEndTimeOBject.second);
            // console.log(warEndTime.toISOString() + ' HEY');
            // const date = new Date().toISOString();
            // const currentTime = {
            //     year: date.slice(0, 4),
            //     month: date.slice(5, 7),
            //     day: date.slice(8, 10),
            //     hour: date.slice(11, 13),
            //     minute: date.slice(14, 16),
            //     second: date.slice(17, 19)
            // }
            // console.log(currentWar.data.endTime.slice(0, 4));
            // const date = new Date();
            // console.log(date.toISOString());
            // date.setMinutes(date.getMinutes() - 120);
            // console.log(date.toISOString());
            return;
        }


    }catch(e){
        throw new Error('Something went wrong in war-watch.js');
    }
}

module.exports = {
    remindPlayers
}