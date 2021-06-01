const {getRemindList, updateRemindList, attacksLeft} = require('../src/scripts/war-reminders');
const {linkPlayer, updatePlayers} = require('../src/scripts/accounts');
require('../src/db/mongoose');

beforeEach(async () => {
    updatePlayers();
});

test('getRemindList() should return a list of people to message 1 hour before war ends', async () => {
    const remindList = await getRemindList(process.env.CLAN_TAG, 1);
    remindList.forEach((reminder) => {
        expect(reminder.endTime - reminder.remindTime).toBe(60*60*1000);
    });
    console.log(remindList);
});

// test('attacksLeft()', async () => {
//     // await attacksLeft();
// });

test('updateRemindList()', async () => {
    const hoursBefore = 1
    const currentTime = new Date();
    const endTime = currentTime.getTime() + hoursBefore*60*60*1000;
    const expiredEndTime = currentTime.getTime() - hoursBefore*60*60*1000;
    const remindTime = currentTime.getTime() + 7000; // remind time in seven seconds from current time
    const expiredRemindTime = expiredEndTime - hoursBefore*60*60*1000;
    // Example reminder list you would expect from getMessageList()
    let exampleList = [ // Make sure these guys actually exist in the database
        {
            tag: '#80U20UPV',
            name: '♎️Blake♉️',
            discordID: undefined,
            remindTime,
            endTime,
            attacks: undefined
        },
        {
            tag: '#200YJ80CU',
            name: 'deathrider100',
            discordID: undefined,
            remindTime,
            endTime,
            attacks: undefined
        },
        {
            tag: '##9V280YP29',
            name: 'シ S K Y',
            discordID: undefined,
            remindTime,
            endTime,
            attacks: undefined
        },
        {
            tag: '#9VR8VQVVQ',
            name: 'supernoob',
            discordID: undefined,
            remindTime,
            endTime,
            attacks: undefined
        },
        {
            tag: '#8LV9LRPYP',
            name: 'Artic_Knight',
            discordID: undefined,
            remindTime: expiredRemindTime,
            endTime: expiredEndTime,
            attacks: undefined
        }
    ]
    const remindList = await updateRemindList(exampleList);
    console.log(remindList);
});