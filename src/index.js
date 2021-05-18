const clashApi = require('./utils/clash-api');
const {remindPlayers} = require('./scripts/war-watch');
const discord = require('discord.js');
const client = new discord.Client();
const {linkPlayer} = require('./scripts/link-accounts');
require('./db/mongoose');

const {updatePlayers} = require('./scripts/maintain-db');

const botToken = process.env.BOT_TOKEN;

client.login(botToken);

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // adds clan memebers to db, and checks for current war constantly
    try{
        const loop = setInterval(async () => {
            await updatePlayers();
            await remindPlayers(process.env.CLAN_TAG);
        }, 5000);
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
    }
});