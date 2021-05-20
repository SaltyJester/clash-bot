const mongoose = require('mongoose');

// This is no longer needed, delete this
const botStateSchema = new mongoose.Schema({
    isManageWarRunning: {
        type: Boolean,
        required: true
    },
    successfulStartUp: {
        type: Boolean,
        required: true
    }
});

const BotState = mongoose.model('botState', botStateSchema);
module.exports = BotState;