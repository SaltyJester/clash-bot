const axios = require('axios');
// const MockAdapter = require('axios-mock-adapter');
const clashApi = require('../src/utils/clash-api');

test('getClanInfo() should return status code 200', async () => {
    // const mock = new MockAdapter(axios);
    // const data = { response: 'hello there' };
    // mock.onGet('https://api.clashofclans.com/v1/clans/' + process.env.CLAN_TAG).reply(200, data);

    const response = await clashApi.getClanInfo(process.env.CLAN_TAG);
    // console.log(response)
    expect(response.status).toBe(200);
});

test('getMembers() should return status code 200', async () => {
    const response = await clashApi.getMembers(process.env.CLAN_TAG);
    expect(response.status).toBe(200);
});

// test('getPlayer() should return status code 200', async () => {
//     const response = await clashApi.getMembers(process.env.CLAN_TAG);
//     expect(response.status).toBe(200);
// });

test('getWarLog() should return status code 200', async () => {
    const response = await clashApi.getWarLog(process.env.CLAN_TAG);
    expect(response.status).toBe(200);
});

test('getCurrentWar() should return status code 200', async () => {
    const response = await clashApi.getCurrentWar(process.env.CLAN_TAG);
    expect(response.status).toBe(200);
});