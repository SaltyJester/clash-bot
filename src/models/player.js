const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerTag: {
        type: String,
        required: true,
    },
    discordID: {
        type: String
    },
    name: {
        type: String,
        required: true
    }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;