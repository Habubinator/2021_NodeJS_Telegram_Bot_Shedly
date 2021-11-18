const TelegramApi = require(`node-telegram-bot-api`);
const token = `2135685566:AAFJwFL7o5e4mi8OQ2kgEZFMn5dws0mbNi4`; // OLD TOKEN
const bot = new TelegramApi(token, { polling: true });
const fs = require(`fs`);

bot.setMyCommands([{ command: '/schedule', description: 'Get schedule' }])

bot.on(`message`, async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    let AllData = [[``, ``]]

    if (text != `/q`) {

        console.log(msg);

        if (text === `/schedule` || text === `/schedule@JekichSheduleBot`) {
            var CurrTime = Date.now() / 1000;
            if (CurrTime - msg.date <= 300) {
                console.log(
                    `
/////////
Replied!
/////////`
                )

                // Read Id and create array

                let Fcontent = fs.readFileSync("ids.txt", "utf8");
                let NumOfIDS = Fcontent.split(`|`);
                for (let i = 0; i < NumOfIDS[0] - 1; i++) {
                    AllData.push([``, ``])
                }
                PeopleSChat = NumOfIDS[1].split(`/`);
                if (PeopleSChat) {
                    for (i = 0; i < PeopleSChat.length; i++) {
                        temptask = PeopleSChat[i].split(` `)
                        for (let j = 0; j < 2; j++) {
                            AllData[i][j] = temptask[j];
                        }
                    }
                }


                // Check id 

                let isNewID = true;
                for (let i = 0; i < NumOfIDS[0]; i++) {
                    if (AllData[i][1] == chatId) {
                        isNewID = false
                    }
                }
                if (isNewID === true) {
                    NumOfIDS[0]++
                    switch (msg.chat.type) {
                        case "supergroup":
                            let inp1 = msg.chat.title.split(` `);
                            AllData.push([`${inp1[0]}`, `${chatId}`])
                            break
                        case "private":
                            let inp2 = msg.chat.first_name.split(` `);
                            AllData.push([`${inp2[0]}`, `${chatId}`])
                            break
                    }


                    // write data

                    let writedata = `${NumOfIDS[0]}|`
                    for (let i = 0; i < NumOfIDS[0]; i++) {
                        writedata += `${AllData[i][0]} ${AllData[i][1]}`
                        if ((NumOfIDS[0] - i) > 1) {
                            writedata += `/`
                        }
                    }
                    fs.writeFileSync("ids.txt", writedata);
                }

                // Test

                //console.log(isNewID);
                //console.log(NumOfIDS[0]);
                //console.log(AllData);

                // Send answear
                return bot.sendMessage(chatId, FindShedule(), {disable_web_page_preview: true}) //await
            }
        }

        // FAN COMMANDS

        // WRITE 1000-7

        if (text === `jghoul`) {
            let i = 993;
            let timerId = setInterval(function ghoul() {
                if (i >= 0) {
                    try {
                        bot.sendMessage(`513950472`, `${i + 7}-7 = ${i}`); i -= 7; //id = 377270472 Î∏ı‡ 513950472 ÏÓÈ 1277561606 nokit
                    } catch (error) {
                        console.log(error)
                        return
                    }
                }
                else {
                    bot.sendMessage(`513950472`, `ya ghoul`);
                    clearInterval(timerId);
                }
            }, 400);
        }

        // WRITE CUSTOM MSG

        if (text === `j123`) {
            return bot.sendMessage(`616950133`, `loh`) // await to make it sync

        }
    }
})

// CHECK DAY 

function FindTime(time) {
    var CheckTime = new Date();
    return time = CheckTime.getDay();
}

// FORM SCHEDULE 

function FindShedule(time) {
    time = FindTime();
    let result;
    switch (time){
        case 6:
        case 0:
        case 1:
            result = `
SÒhedule for Monday:

Programming
Recording on el opu

Math
Discord
`;
            break;
        case 2:
            result = `
Shedule for Tuesday

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
Shedule for Wednessday

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
Shedule for Friday

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
