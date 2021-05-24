const {getCurrentWar} = require('../utils/clash-api');
const Player = require('../models/player');

// This should return a list of players that need to be DM'd to attack
// n hours before war ends
const getSlackers = async(currentWar, hours) => {
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
            }, waitTime)
            const newCurrentWar = await getCurrentWar(process.env.CLAN_TAG);
            console.log(newCurrentWar)

        }catch(e){
            reject(new Error ('Something went wrong in war-reminders.js'));
        }
        
        // const
        // try{
        //     const loop = setInterval(async () => {
        //         getCurrentWar();
        //     },1000); // change to 30 seconds for production
        // }catch(e){
        //     throw new Error('Something went wrong in war-reminders.js!');
        // }





        // try{
            // const loop = setInterval(async () => {
            //     // need a way to retry getCurrentWar() if it fails
            //     const currentWar = await clashApi.getCurrentWar(clanTag);
            //     const currentTime = new Date();
            //     const hoursInMilliseconds = ((hours*60)*60)*1000;
    
            //     if(currentWar.data.state === 'warEnded'){
            //         console.log('currently NOT in war: ' + currentTime.toISOString());
            //     }
                
            //     else if(currentWar.data.state === 'preparation'){
            //         console.log('currently in preparation: ' + currentTime.toISOString());
            //     }
                
            //     else if(currentWar.data.state === 'inWar'){ // change back to else if
            //         console.log('currently in war: ' + currentTime.toISOString());
                    
            //         const warEndTime = {
            //             year: currentWar.data.endTime.slice(0, 4),
            //             month: currentWar.data.endTime.slice(4, 6),
            //             date: currentWar.data.endTime.slice(6, 8),
            //             hour: currentWar.data.endTime.slice(9, 11),
            //             minute: currentWar.data.endTime.slice(11, 13),
            //             second: currentWar.data.endTime.slice(13, 15),
            //         }
            
            //         const formatedEndTime = new Date();
            //         formatedEndTime.setUTCFullYear(parseInt(warEndTime.year));
            //         formatedEndTime.setUTCMonth(parseInt(warEndTime.month) - 1);
            //         formatedEndTime.setUTCDate(parseInt(warEndTime.date));
            //         formatedEndTime.setUTCHours(parseInt(warEndTime.hour));
            //         formatedEndTime.setUTCMinutes(parseInt(warEndTime.minute));
            //         formatedEndTime.setUTCSeconds(parseInt(warEndTime.second));
            //         formatedEndTime.setUTCMilliseconds(0);
            
            //         if(currentTime.getTime() > (formatedEndTime.getTime() - hoursInMilliseconds)){                
            //             clearInterval(loop);

            //             // find people in war and return list of discord id's to message
            //             const slackerList = currentWar.data.clan.members.filter((member) => {
            //                 if(!member.attacks || member.attacks.length !== 2){
            //                     return member;
            //                 }
            //             });

            //             let toMessage = [];
            //             for(let i = 0; i < slackerList.length; i++){
            //                 const member = await Player.findOne({
            //                     playerTag: slackerList[i].tag,
            //                     discordID: { $exists: true }
            //                 });

            //                 if(member !== null){
            //                     toMessage.push(member.discordID);
            //                 }
            //             }

            //             return resolve(toMessage);
            //         }
            //     }
            // }, 1000);
             // change time to 5 sceonds in production

            // add event listener here to stop the loop

        // }catch(e){
        //     reject (new Error('Something went wrong in war-watch.js'));
        // }
    });
}

module.exports = {
    getSlackers
}