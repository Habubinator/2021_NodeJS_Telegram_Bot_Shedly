const TelegramApi = require(`node-telegram-bot-api`);
const token = `2135685566:AAG-5wGTWgL7r0PBolPgbGxilqe1QqCL82s`; // NEW TOKEN
const bot = new TelegramApi(token, { polling: true });
const fs = require(`fs`);

// Чтобы сервак не падал

/* 
// ПЫТАЛСЯ СДЕЛАТЬ АВТОПИНГ БОТА НО ВСЁ ПОШЛО ПО ПИЗДЕ
// Впустую потрачено часов на фикс: 4 - Обновить если в будущем потянет заниматься хуйнёй

// Ищем порт
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Порт - ${PORT}`);
});

// сбрасываем идл хероку
var http = require('http');

function KeepAlive() {
    setInterval(function () {
        var KeepAliveOptions = {
            host: 'shedule-as-212.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(KeepAliveOptions, function (res) {
            res.on('data', function (chunk) {
                try {
                    console.log('Heroku responded - ' + chunk)
                }
                catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function (err) {
            console.log('Error: ' + err.message);
        });
    }, 20*60*1000) // 20 minutes
}
*/
//
const Options = {
    disable_web_page_preview: true,
    parse_mode: `HTML`
}

bot.setMyCommands([{ command: '/schedule', description: 'Get schedule' }])

// Database after restart of a bot 

let AllData = [[``, ``]]
let Fcontent = fs.readFileSync("ids.txt", "utf8");
let NumOfIDS = Fcontent.split(`|i|`);
PeopleSChat = NumOfIDS[1].split(`|r|`);
if (PeopleSChat) {
    for (let i = 0; i < NumOfIDS[0] - 1; i++) {
        if (AllData[i] != undefined) {
            AllData.push([``, ``])
        }
    }
    for (i = 0; i < PeopleSChat.length; i++) {
        temptask = PeopleSChat[i].split(`|n|`)
        if (AllData[i] != undefined) {
            for (let j = 0; j < 42; j++) {
                AllData[i][j] = temptask[j];
            }
        }

    }
}

bot.on(`message`, async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text != `/q`) {
        var CurrTime = Date.now() / 1000;
        if (CurrTime - msg.date <= 300) {
            console.log(`Replied!`)
            console.log(msg);

            // MAIN COMMAND

            if (text === `/schedule` || text === `/schedule@JekichSheduleBot`) {

                // Пока нет расписания то отправляется стикер (см.ниже)

                /*
                // Read Id and create array

                let Fcontent = fs.readFileSync("ids.txt", "utf8");
                let NumOfIDS = Fcontent.split(`|i|`);
                PeopleSChat = NumOfIDS[1].split(`|r|`);
                if (PeopleSChat) {
                    for (i = 0; i < PeopleSChat.length; i++) {
                        temptask = PeopleSChat[i].split(`|n|`)
                        if (AllData[i] != undefined) {
                            for (let j = 0; j < 42; j++) {
                                AllData[i][j] = temptask[j];
                            }
                        }
                    }
                }

                // Check id data and add element on new id

                let isNewID = true;
                for (let i = 0; i < NumOfIDS[0]; i++) {
                    if (AllData[i][1] == chatId) {
                        isNewID = false
                        break;
                    }
                }
                if (isNewID == true) {
                    NumOfIDS[0]++
                    switch (msg.chat.type) {
                        case `group`:
                        case "supergroup":
                            let inp1 = msg.chat.title.split(`|`);
                            AllData.push([`${inp1[0]}`, `${chatId}`,
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', ''])
                            break
                        case "private":
                            let inp2 = msg.chat.first_name.split(`|`);
                            AllData.push([`${inp2[0]}`, `${chatId}`,
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                                '', '', '', '', '', '', '', '', '', '', ''])
                            break
                    }

                    // write id data 

                    let writedata = `${NumOfIDS[0]}|i|`
                    for (let i = 0; i < NumOfIDS[0]; i++) {
                        for (j = 0; j < 42; j++) {
                            if (AllData[i][j] != undefined) {
                                writedata += `${AllData[i][j]}`
                            }
                            writedata += `|n|`
                        }
                        if ((NumOfIDS[0] - i) > 1) {
                            writedata += `\r\n|r|`
                        }
                    }
                    fs.writeFileSync("ids.txt", writedata);
                }

                // Test

                //console.log(AllData);
                //console.log(isNewID);
                //console.log(NumOfIDS[0]);
                //console.log(AllData);

                // Send answear
                return bot.sendMessage(chatId, FindShedule(chatId), Options) //await
                */
            }

            // FAN COMMANDS

            // WRITE 1000-7

            if (text === `jghoul`) {
                let i = 993;
                let timerId = setInterval(function ghoul() {
                    if (i >= 0) {
                        try {
                            bot.sendMessage(`513950472`, `${i + 7}-7 = ${i}`); i -= 7; //id = 377270472 лёха 513950472 мой 1277561606 nokit
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
                //return bot.sendMessage(chatId, `Скайнет поздравляет <a href="tg://user?id=513950472">Жекича Браввиссимо</a> с Днём Рождения`, Options); 
                // await to make it sync
                return bot.sendMessage(`-1001356898340`, `Ставьте лайк чтобы я понял что надо переписать расписание на бота`, Options);
                // await to make it sync
            }

            //ВРЕМЕННО, пока нет расписания

            if (text === `/schedule` || text === `/schedule@JekichSheduleBot`) {
                bot.sendSticker(chatId, `poshel.webp`);
            }
        }
    }
})

// CHECK DAY 

function FindTime(time) {
    var CheckTime = new Date();
    return time = CheckTime.getDay();
}

// FORM SCHEDULE 

function FindShedule(chatId) {
    let PosOfId;
    for (let i = 0; i < NumOfIDS[0]; i++) {
        if (AllData[i][1] == chatId) {
            PosOfId = i;
            break;
        }
    }
    let time = FindTime();
    let result;
    switch (time) {
        case 6:
        case 0:
        case 1:
            result = `
Schedule for Monday:

`;
            result = CheckID(2, 9, PosOfId, result);
            break;
        case 2:
            result = `
Schedule for Tuesday

`
            result = CheckID(10, 17, PosOfId, result);
            break;
        case 3:
            result = `
Schedule for Wednessday

`
            result = CheckID(18, 25, PosOfId, result);
            break;
        case 4:
            result = `
Schedule for Thursday:

`;
            result = CheckID(26, 33, PosOfId, result);
            break;
        case 5:
            result = `
Schedule for Friday

`
            result = CheckID(34, 41, PosOfId, result);
    }
    return result;
}

// ECONOM SPACE IN CODE 
function CheckID(startint, lastint, PosOfId, result) {
    for (let i = startint; i <= lastint; i++) {
        if (AllData[PosOfId][i]) {
            result += `${AllData[PosOfId][i]}
`
            if (i % 2 == 1) {
                result += `
`
            }
        }
    }
    return result;
}