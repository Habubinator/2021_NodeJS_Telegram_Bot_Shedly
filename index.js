const TelegramApi = require(`node-telegram-bot-api`);
const token = `2135685566:AAFJwFL7o5e4mi8OQ2kgEZFMn5dws0mbNi4`;
const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([{ command: '/schedule', description: 'Get schedule'}])

bot.on(`message`, async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg);
    if (text === `/schedule`) {
    return bot.sendMessage(chatId, FindShedule()) //await 
    }
})

function FindTime(time) {
    var CheckTime = new Date();
    return time = CheckTime.getDay();
}

function FindShedule(time) {
    time = FindTime();
    let result;
    switch (time){
        case 6:
        case 0:
        case 1:
            result = `
Shedule for Monday:

Programming
Recording on el opu

Math
Discord
`;
            break;
        case 2:
            result = `
Empty

OPI
https://www.youtube.com/channel/UC-A9s_ueFdyA72OOW1mi0NA

KDM
https://us02web.zoom.us/j/85839059739?pwd=Zm1EVURwWTFuZFN4MlN3ZlA5eWtOQT09#success

SIOD 2/4
https://us04web.zoom.us/j/7883985166?pwd=VXNSd2RXeGNqNUdlU3RQTjFrcFFIdz09
`
            break
        case 3:
            result = `
Empty

English (Diachenko)
https://test8poly.jimdofree.com/
https://vocaroo.com

KDM
https://us02web.zoom.us/j/86480818332?pwd=eHd0VVJzaW5pR00veGRtb09zYi8wZz09
`
            break
        case 4:
            result = `
Shedule for Thursday:

History
https://zoom.us/j/3405314296?pwd=ZmpwelhzLzVkd3ZvQTF4SVJDdDNvQT09

SIOD
https://us04web.zoom.us/j/7883985166?pwd=VXNSd2RXeGNqNUdlU3RQTjFrcFFIdz09

English (Gvozd/Diachenko)
https://test8poly.jimdofree.com/
https://vocaroo.com

History 1/3
https://zoom.us/j/3405314296?pwd=ZmpwelhzLzVkd3ZvQTF4SVJDdDNvQT09
`;
            break;
        case 5:
            result = `
Programming
https://us04web.zoom.us/j/2017517539?pwd=T0tUTnB1L1JNc0tmZ0NaT2IwMmx1QT09

SIOD 1/3
https://us04web.zoom.us/j/7883985166?pwd=VXNSd2RXeGNqNUdlU3RQTjFrcFFIdz09

OPI 2/4
https://us04web.zoom.us/j/5029942117?pwd=a1hMWTdPZk42Q0xiMW80ZFUzWWhjUT09

Math
Discord
`
    }
    return result;
}
