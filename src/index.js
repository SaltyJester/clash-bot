const {getSlackers} = require('./scripts/war-reminders');
const {getCurrentWar} = require('./utils/clash-api');
const discord = require('discord.js');
const client = new discord.Client();
const {linkPlayer} = require('./scripts/accounts');
const {updatePlayers} = require('./scripts/roster');
require('./db/mongoose');

const botToken = process.env.BOT_TOKEN;

client.login(botToken);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await updatePlayers();
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
                return msg.reply('Incorrect Usage: !linkplayer <discord_id> <player_tag>');
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
                return msg.reply('Incorrect Usage: !linkme <player_tag>');
            }
            const result = await linkPlayer(msg.author.id, args[0]);
            const user = client.channels.cache.get(msg.author.id);
            msg.reply(result);
        }catch(e){
            msg.reply("Something went wrong with linking");
        }
    }
    
    else if(command === "autoremind"){
        try{
            // if reminders are already running, you need to emit something to tell it to stop
            if(args.length != 1){
                return msg.reply('Incorrect Usage: !autoremind <hours>');
            }

            msg.reply('Setting war reminders!');
            while(true){
                try{
                    let currentWar = await getCurrentWar(process.env.CLAN_TAG);
                    if(currentWar.data.state === 'warEnded'){ // change to !== in production
                        msg.channel.send('We have entered a war!');
                        await updatePlayers();
                        await getSlackers(currentWar, args[0]);
                    }
                }catch(e){
                    console.log(e);
                }
                setTimeout(() => {
                    // not sure if using while loop and setTimeOut is considered best practice
                },1000);
            }

            // memberList.forEach((member) => {
            //     const user = client.users.cache.get(member);
            //     msg.channel.send(`${user} War is about to end in ${args[0]} hour(s). You still have to attack!`);
            // });
        }catch(e){
            console.log(e);
            msg.reply('Something went wrong with war reminders');
        }
    }
    
    else if(command === 'cancelreminders'){
        // use event emitter here
    }
});