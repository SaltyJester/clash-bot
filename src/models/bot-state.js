const mongoose = require('mongoose');

// This is needed to control manage-war.js globally
// not sure if this is best practice
const botStateSchema = new mongoose.Schema({
    isManageWarRunning: {
        type: Boolean,
        required: true
    }
});

const BotState = mongoose.model('botState', botStateSchema);
module.exports = BotState;