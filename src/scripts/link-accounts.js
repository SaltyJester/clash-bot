const Player = require('../models/player');

// Links discord id to clash player tag in database
// returns string ("success" or "failure")
const linkPlayer = async (discordID, playerTag) => {
    const player = await Player.findOne({ playerTag: playerTag });
    if(!player){
        return "Could not find Player Tag in Database";
    }
    player.discordID = discordID;
    player.save();
    return "Successful Link!"
}

module.exports = {
    linkPlayer
}