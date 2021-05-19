const clashApi = require('./utils/clash-api');
const {checkWarLoop} = require('./scripts/manage-war');
const discord = require('discord.js');
const client = new discord.Client();
const {linkPlayer} = require('./scripts/link-accounts');
const BotState = require('./models/bot-state');
require('./db/mongoose');

const {updatePlayers} = require('./scripts/maintain-roster');

const botToken = process.env.BOT_TOKEN;

client.login(botToken);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    await BotState.deleteMany();
    const botState = {
        isManageWarRunning: false
    }
    await new BotState(botState).save();

    // adds clan memebers to db, and checks for current war constantly
    try{
        const test = await BotState.findOne();
        test.isManageWarRunning = true;
        // this must be set to true for loop to run
        await test.save();
        await updatePlayers();
        await checkWarLoop(process.env.CLAN_TAG, 2);
    }catch(e){
        console.log(e);
    }
  });

client.on('message', async (msg) => {
    if(!msg.content.startsWith(process.env.PREFIX) || msg.author.bot){
        return;
    }

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Link discord ID to clash player tag
    if(command === 'linkplayer'){ // Manually add someone else
        if(args.length != 2){
            return msg.reply('!linkplayer requires two arguments!');
        }
        const result = await linkPlayer(args[0], args[1]);
        msg.reply(result);
    }else if(command === 'linkme'){ // Adds whoever sent the message
        if(args.length != 1){
            return msg.reply('!linkme requires your player tag');
        }
        const result = await linkPlayer(msg.author.id, args[0]);
        const user = client.channels.cache.get(msg.author.id);
        msg.reply(result);
    }else if(command === "sendreminders"){
        const test = await BotState.findOne();
        msg.reply(test.isManageWarRunning);
    }else if(command === 'cancelreminders'){
        const botState = await BotState.findOne();
        botState.isManageWarRunning = false;
        await botState.save();
    }
});