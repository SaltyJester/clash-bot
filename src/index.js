const clashApi = require('./utils/clash-api');
const warWatch = require('./scripts/war-watch');
// const discord = require('discord.js');
// const client = new discord.Client();
require('./db/mongoose');

const maintainDB = require('./scripts/maintain-db');

const botToken = process.env.BOT_TOKEN;

// client.login(botToken);

// client.once('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);

//     // maintainDB.updatePlayerDB();

//     // try{
//     //     const checkWarLoop = setInterval(async () => {
//     //         warWatch.remindPlayers(process.env.CLAN_TAG);
//     //     }, 5000);
//     // }catch(e){
//     //     console.log(e);
//     // }
//   });

// client.on('message', () => {

// });



maintainDB.updatePlayers();



// client.on('ready', () => {
//     client.channels.cache.get(process.env.CHANNEL_ID).send('Fuck you');
// })

// client.on('message', msg => {
//     let state = {
//         remind: false
//     }
//     if(msg.content === '!remind'){
//         state.remind = true;
//         try{
//             const requestLoop = setInterval(async () => {
//                 const response = await clashApi.getCurrentWar(process.env.CLAN_TAG);
//                 msg.channel.send(response.data.state);
//             }, 10000);
//         }catch(e){
//             msg.channel.send('error has occured');
//         }
//         console.log('I can still continue');
//     }else if(msg.content === "!status"){
//         msg.channel.send('Status is ' + state.remind);
//     }
// });

// const requestLoop = setInterval(async () => {
//     const response = await clashApi.getCurrentWar(process.env.CLAN_TAG);
//     if(response.data.state === 'warEnded'){
//         console.log(response.data.state);
//         msg.channel(response.data.state);
//     }
// }, 1000);