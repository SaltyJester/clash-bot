const {getSlackers} = require('./scripts/manage-war-reminder');
const discord = require('discord.js');
const client = new discord.Client();
const {linkPlayer} = require('./scripts/link-accounts');
const {updatePlayers} = require('./scripts/maintain-roster');
require('./db/mongoose');

const botToken = process.env.BOT_TOKEN;

client.login(botToken);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', async (msg) => {
    if(!msg.content.startsWith(process.env.PREFIX) || msg.author.bot){
        return;
    }

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Link discord ID to clash player tag
    if(command === 'linkplayer'){ // Manually add someone else
        try{
            if(args.length != 2){
                return msg.reply('!linkplayer requires two arguments!');
            }
            const result = await linkPlayer(args[0], args[1]);
            msg.reply(result);
        }catch(e){
            msg.reply('Something went wrong with linking');
        }
    }
    
    else if(command === 'linkme'){ // Adds whoever sent the message
        try{
            if(args.length != 1){
                return msg.reply('!linkme requires your player tag');
            }
            const result = await linkPlayer(msg.author.id, args[0]);
            const user = client.channels.cache.get(msg.author.id);
            msg.reply(result);
        }catch(e){
            msg.reply("Something went wrong with linking");
        }
    }
    
    else if(command === "setreminders"){
        try{
            msg.reply('Setting war reminders!');
            await updatePlayers();
            const result = await getSlackers(process.env.CLAN_TAG, 1.5);
            // do something with result, send messages out
        }catch(e){
            msg.reply('Something went wrong with war reminders');
        }
    }
    
    else if(command === 'cancelreminders'){
        // use event emitter here
    }
});