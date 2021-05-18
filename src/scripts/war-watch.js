const clashApi = require('../utils/clash-api');

// This should return a list of players that need to be DM'd to attack
// Debating if I need a database (MongoDB or Postgres)
const remindPlayers = async(clanTag) => {
    try{
        const currentWar = await clashApi.getCurrentWar(clanTag);
        if(currentWar.data.state === 'warEnded'){
            console.log('not currently in war');
            console.log(currentWar.data.clan.members);
            return;
        }


    }catch(e){
        throw new Error('Something went wrong in war-watch.js');
    }
    const currentWar = await clashApi.getCurrentWar(clanTag);
}

module.exports = {
    remindPlayers
}