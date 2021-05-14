const clashApi = require('./utils/clash-api');

clashApi.getClanInfo(process.env.CLAN_TAG).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});