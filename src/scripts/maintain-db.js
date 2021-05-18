const clashApi = require('../utils/clash-api');
const Player = require('../models/player');

const updatePlayers = async () => {
    const response = await clashApi.getMembers(process.env.CLAN_TAG);
    const players = response.data.items;

    try{
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

            // Should update player if fields have changed (or not since tags don't change)
        });
    }catch(e){
        throw new Error('Something went wrong in ./scripts/maintain-db.js');
    }
}

module.exports = {
    updatePlayers
}