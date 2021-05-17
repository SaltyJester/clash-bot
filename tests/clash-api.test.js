const axios = require('axios');
// const MockAdapter = require('axios-mock-adapter');
const clashApi = require('../src/utils/clash-api');

test('test', async () => {
    // const mock = new MockAdapter(axios);
    // const data = { response: 'hello there' };
    // mock.onGet('https://api.clashofclans.com/v1/clans/' + process.env.CLAN_TAG).reply(200, data);

    const response = await clashApi.getClanInfo(process.env.CLAN_TAG);
    // console.log(response)
    expect(response.status).toBe(200);
});