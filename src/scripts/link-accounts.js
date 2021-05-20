const Player = require('../models/player');

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
    linkPlayer
}