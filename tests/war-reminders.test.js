const {getMessageList, doubleCheckList} = require('../src/scripts/war-reminders');

test('getMessageList() should return a list of people to message 1 hour before war ends', async () => {
    const reminderList = await getMessageList(process.env.CLAN_TAG, 1);
    reminderList.forEach((reminder) => {
        expect(reminder.endTime - reminder.remindTime).toBe(60*60*1000);
    });
});

test('doubleCheckList()', async () => {
    let reminderList = await getMessageList(process.env.CLAN_TAG, 1);
    reminderList = await doubleCheckList(reminderList);
});