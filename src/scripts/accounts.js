const Player = require('../models/player');
const clashApi = require('../utils/clash-api');

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
                
                // Should update player if fields have changed (or not since tags don't change)

                // this resolve callback might be called before all the player updates are completed
                // use map and promise.all instead
                resolve('Successfully updated database!');
            });            
        }catch(e){
            reject(new Error('Something went wrong in ./scripts/maintain-db.js'));
        }
    });
}

// Links discord id to clash player tag in database
// returns string
const linkPlayer = async (discordID, playerTag) => {
    return new Promise(async (resolve, reject) => {
        try{
            const player = await Player.findOne({ playerTag: playerTag });
            if(!player){
                return resolve("Could not locate player tag!");
            }
            player.discordID = discordID;
            player.save();
            resolve("Successful Link!");
        }catch(e){
            reject(new Error('Something went wrong in link-acounts.js'));
        }
    });
}

module.exports = {
    linkPlayer,
    updatePlayers
}