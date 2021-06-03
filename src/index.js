const {getRemindList, updateRemindList,attacksLeft} = require('./scripts/war-reminders');
const {getCurrentWar} = require('./utils/clash-api');
const discord = require('discord.js');
const client = new discord.Client();
const {linkPlayer, updatePlayers} = require('./scripts/accounts');
// const {updatePlayers} = require('./scripts/roster');
const events = require('events');
const { get } = require('http');
require('./db/mongoose');

let remindList = [];

const botToken = process.env.BOT_TOKEN;
client.login(botToken);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await updatePlayers();
    const remindLoop = setInterval(() => {
        // set a flag here to see if reminders are active
        const currentTime = new Date().getTime();
        let newRemindList = []
        for(let i = 0; i < remindList.length; i++){
            if(currentTime > remindList[i].remindTime){
                if(remindList[i].discordID){
                    client.channels.cache.get(process.env.CHANNEL_ID).send('<@'+ 
                        remindList[i].discordID + '>' + 'You have one or more attacks remaining in war, please attack!');
                    console.log('need to check up on ' + remindList[i].name);
                }else{
                    client.channels.cache.get(process.env.CHANNEL_ID).send(remindList[i].name +
                         ' has attacks remaining in war!');
                }
            }else{
                newRemindList.push(remindList[i]);
            }
        }
        remindList = newRemindList;
    }, 5000) // change to check less frequently for production
    const updateLoop = setInterval(async () => {
        try{
            remindList = await updateRemindList(remindList)
            console.log(remindList)
        }catch(e){
            console.log(e);
        }
    }, 5000); // check this way less freqently
});

// let eventEmitter = new events.EventEmitter();
// let yellHalt = () => {
//     eventEmitter.emit('halt');
// }

// Global Variables, oh lord help me
// let reminderFlag = 'down';

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
            // const user = client.channels.cache.get(msg.author.id);
            msg.reply(result);
        }catch(e){
            msg.reply("Something went wrong with linking");
        }
    }
    
    else if(command === "remind"){
        if(args.length != 1){
            return msg.reply('Incorrect Usage: !remind <hours>');
        }

        try{
            const currentWar = await getCurrentWar(process.env.CLAN_TAG);
            // if(currentWar.data.state === 'warEnded'){
            //     return msg.reply('Not currently in war!');
            // }
            
            const playerList = await getRemindList(process.env.CLAN_TAG, args[0]);
            playerList.forEach((player) => {
                remindList.push(player);
            });
            msg.reply('Reminders have been set!');
        }catch(e){
            console.log(e);
        }

        // if there is a current reminder running, stop it
        // yellHalt();

        // try{
        //     const currentWar = await getCurrentWar(process.env.CLAN_TAG);
        //     if(currentWar.data.state !== 'warEnded'){ //change to !== in production
        //         eventEmitter.on('halt', () => {
        //             msg.channel.send('Halting current reminders!');
        //             return;
        //         });

        //         msg.reply('Setting war reminders!');
        //         await updatePlayers();
        //         const messageList = await getSlackers(currentWar, args[0]);
        //         messageList.forEach((member) => {
        //             const user = client.users.cache.get(member);
        //             msg.channel.send(`${user} War is about to end in ${args[0]} hour(s). You still have to attack!`);
        //         });
        //         eventEmitter.removeAllListeners();
        //     }else{msg.reply('Not currently in war!')}
        // }catch(e){
        //     console.log(e);
        //     msg.reply('Something went wrong with war reminders!');
        // }
    }
    
    else if(command === 'cancelreminders'){
        // yellHalt();
    }
});