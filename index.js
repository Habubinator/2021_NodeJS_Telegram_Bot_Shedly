const TelegramApi = require(`node-telegram-bot-api`);
const token = `2135685566:AAG-5wGTWgL7r0PBolPgbGxilqe1QqCL82s`; // NEW TOKEN
const bot = new TelegramApi(token, { polling: true });
const fs = require(`fs`);
const { send } = require("express/lib/response");
let sender = 'aboba';
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

bot.setMyCommands([{ command: '/schedule_today', description: 'Расписание' },
                   { command: '/schedule_tomorrow', description: 'Расписание на завтра' },
                   { command: '/anek', description: 'Смешной (или нет) анек' },
                   { command: '/nahuy', description: 'ЛЕША ШЛЕТ НАХУЙ'}])

// Database after restart of a bot 

var AllData = [[``, ``]]
let Fcontent = fs.readFileSync("ids_even.txt", "utf8");
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

var re = /\\n/gi;
let tempaneks = fs.readFileSync("aneks.txt", "utf-8")
tempaneks = tempaneks.split('\'')
var AllAneks = tempaneks.filter((e, i) => (i % 2))
for (i = 0; i < AllAneks.length; i++) {
    AllAneks[i] = AllAneks[i].replace(re, `
`)
}
console.log("Анекдоты вставлены")

bot.on(`message`, async msg => {
    var text = msg.text;
    var chatId = msg.chat.id;

    //чекалка сообщений 

    if (`${chatId}` == `${sender}`) {
        console.log(msg)
        bot.sendMessage(`513950472`, text, Options);
    }


    if (text != `/q`) {
        var CurrTime = Date.now() / 1000;
        if (CurrTime - msg.date <= 300) {
            console.log(`Replied!`)
            console.log(msg);

            // MAIN COMMAND

            if (text === `/schedule_today` || text === `/schedule_today@JekichSheduleBot`) {

                // Check week number, read Id and create array

                if (weekNumber() % 2 == 0) {
                    let Fcontent = fs.readFileSync("ids_odd.txt", "utf8");
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
                } else {
                    let Fcontent = fs.readFileSync("ids_even.txt", "utf8");
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
                    if (weekNumber() % 2 == 0) {
                        fs.writeFileSync("ids_odd.txt", writedata);
                    }
                    else {
                        fs.writeFileSync("ids_even.txt", writedata);
                    }
                }

                // Test

                //console.log(AllData);
                //console.log(isNewID);
                //console.log(NumOfIDS[0]);
                //console.log(AllData);

                // Send answear
                return bot.sendMessage(chatId, FindShedule(chatId,true), Options); //await

            }
            if (text === "/schedule_tomorrow" || text === "/schedule_tomorrow@JekichSheduleBot") {
                // Check week number, read Id and create array

                if (weekNumber() % 2 == 0) {
                    let Fcontent = fs.readFileSync("ids_odd.txt", "utf8");
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
                } else {
                    let Fcontent = fs.readFileSync("ids_even.txt", "utf8");
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
                    if (weekNumber() % 2 == 0) {
                        fs.writeFileSync("ids_odd.txt", writedata);
                    }
                    else {
                        fs.writeFileSync("ids_even.txt", writedata);
                    }
                }
                return bot.sendMessage(chatId, FindShedule(chatId,false), Options);
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

            if (text != undefined &&
                chatId == '513950472') {

                //CHANGE TO WHO WE SEND

                if (text == 'jchsnd') {
                    return bot.sendMessage(chatId, `Now sending msg to ${sender}`, Options);
                } else
                    if (text.indexOf(`jchsnd `) > -1) {
                        sender = text.substring(7);
                        return bot.sendMessage(chatId, `Now sending msg to ${sender}`, Options);
                    }

                // WRITE CUSTOM MSG

                if (text.indexOf(`j123 `) > -1) {
                    //return bot.sendMessage(chatId, `Скайнет поздравляет <a href="tg://user?id=513950472">Жекича Браввиссимо</a> с Днём Рождения`, Options);
                    // await to make it sync
                    let temp = text.substring(5)
                    return bot.sendMessage(sender, temp, Options);
                    // await to make it sync
                }
            }


            //Было временно стало постоянно

            if (text === `/nahuy` || text === `/nahuy@JekichSheduleBot`) {
                bot.sendSticker(chatId, `poshel.webp`);
            }
            if (text === `/anek` || text === `/anek@JekichSheduleBot`) {
                let chosenanek = AllAneks[Math.floor(Math.random() * AllAneks.length)]
                return bot.sendMessage(chatId, chosenanek, Options);
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

function FindShedule(chatId, isToday) {
    let PosOfId;
    for (let i = 0; i < NumOfIDS[0]; i++) {
        if (AllData[i][1] == chatId) {
            PosOfId = i;
            break;
        }
    }
    let time = FindTime();
    if (!isToday) {
        time += 1;
    } 
    let result;
    let firstnum;
    let secondnum;
    switch (time) {
        case 6:
            let date_for_saturday = new Date();
            if (date_for_saturday.getFullYear() == 2022) {
                result = `\nСуботнее расписание:\n\n`;
                
                week = (weekNumber() - 35) % 5
                switch (week) {
                    case 1:
                        firstnum = 2;
                        secondnum = 9;
                        break;
                    case 2:
                        firstnum = 10;
                        secondnum = 17;
                        break;
                    case 3:
                        firstnum = 18;
                        secondnum = 25;
                        break;
                    case 4:
                        firstnum = 26;
                        secondnum = 33;
                        break;
                    case 0:
                        firstnum = 34;
                        secondnum = 41;
                        break;
                }
                
            } else {
                result = `Версия бота устарела, во избежание проблем скрипт расчёта расписания на субботу приостановлен`
            }
            break;
        case 0:
        case 1:
            result = `\nЕбучий понедельник:\n\n`;
            firstnum = 2;
            secondnum = 9;
            break;
        case 2:
            result = `\nЕбучий вторник:\n\n`
            firstnum = 10;
            secondnum = 17;
            break;
        case 3:
            result = `\nСреда - половина недели:\n\n`
            firstnum = 18;
            secondnum = 25;
            break;
        case 4:
            result = `\nЧетверг - почти отдых:\n\n`;
            firstnum = 26;
            secondnum = 33;
            break;
        case 5:
            result = `\nПятница - скоро отдых:\n\n`
            firstnum = 34;
            secondnum = 41;
    }
    result = CheckID(firstnum,secondnum, PosOfId, result);
    return result;
}

// ECONOM SPACE IN CODE 
function CheckID(startint, lastint, PosOfId, result) {
    for (let i = startint; i <= lastint; i++) {
        if (AllData[PosOfId][i]) {
            result += `${AllData[PosOfId][i]}\n`
            /*
            if (i % 2 == 1) {
                result += `\n`
            }
            */
        }
    }
    return result;
}

function weekNumber(date = new Date()) {
    var firstJanuary = new Date(date.getFullYear(), 0, 1);
    var dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    var weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
    return weekNr;
}