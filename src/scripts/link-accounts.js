const Player = require('../models/player');

// Links discord id to clash player tag in database
// returns string
const linkPlayer = async (discordID, playerTag) => {
    const player = await Player.findOne({ playerTag: playerTag });
    if(!player){
        return "Could not locate player tag!";
    }
    player.discordID = discordID;
    player.save();
    return "Successful Link!"
}

module.exports = {
    linkPlayer
}