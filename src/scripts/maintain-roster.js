const clashApi = require('../utils/clash-api');
const Player = require('../models/player');

// I should make a seperate util file that handles all direct interaction with database

const updatePlayers = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await clashApi.getMembers(process.env.CLAN_TAG);
            const players = response.data.items;

            players.forEach(async (member) => {
                // Add player to DB if they already haven't been
                const playerExists = await Player.exists({ playerTag: member.tag });
                if(!playerExists){
                    const player = {
                        playerTag: member.tag,
                        name: member.name
                    }
                    await new Player(player).save()
                }
                
                resolve('Successfully updated database!');
                // Should update player if fields have changed (or not since tags don't change)
            });            
        }catch(e){
            reject(new Error('Something went wrong in ./scripts/maintain-db.js'));
        }
    });
}

module.exports = {
    updatePlayers
}