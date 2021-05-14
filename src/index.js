const clashApi = require('./utils/clash-api');
const discord = require('discord.js');
const bot = new discord.Client();

const botToken = process.env.BOT_TOKEN;

bot.login(botToken);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

bot.on('message', msg => {
if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');
}
});

// clashApi.getClanInfo(process.env.CLAN_TAG).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });