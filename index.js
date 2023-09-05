const TelegramApi = require(`node-telegram-bot-api`);
<<<<<<< HEAD
const token = ``; // NEW TOKEN
=======
const token = ``; // INSERT YOUR TOKEN
>>>>>>> 861d199e42020b3cd5e6dbd83657917f593c22f3
const bot = new TelegramApi(token, { polling: true });
const fs = require(`fs`);


let dataJson = require('./ids.json')
let templateJson = require('./template.json')
const Options = {
    disable_web_page_preview: true,
    parse_mode: `HTML`
}

bot.setMyCommands([{ command: '/start', description: 'Запустити бота' },
                   { command: '/schedule_create', description: 'Приєднати розклад до чату' },
                   { command: '/schedule_today', description: 'Розклад на сьогодні' },
                   { command: '/schedule_tomorrow', description: 'Розклад на завтра' },
                   { command: '/schedule_saturday', description: 'Підглянути, що буде у субботу' },
                   { command: '/schedule_settings', description: 'Налаштувати розклад' },
                   { command: '/help', description: 'Допомога' }
                ])

// Database after restart of a bot 

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


    if (text != `/q`) {
        var CurrTime = Date.now() / 1000;
        if (CurrTime - msg.date <= 300) {
            console.log(`Replied!`)
            console.log("Sender: "+ msg.from.first_name + " with id: " + chatId +"\n" + text);

            if(text === `/start` || text === `/start@schedly_bot`){
                return bot.sendMessage(chatId, "Привіт😉 \nЗ цим ботом лінки будуть завжди під рукою!\nСтвори свій розклад та економ свій час." 
                + "/schedule_create - Створити розклад \n/schedule_settings - Налаштувати розклад \n" 
                + "/schedule_today - Розклад на сьогодні \n/schedule_tomorrow - Розклад на завтра \n/help - якщо треба допомога", Options);
            }

            if(text === `/schedule_create` || text === `/schedule_create@schedly_bot`){
                if(isNewChat(chatId)){
                    addNewChat(chatId)
                    return bot.sendMessage(chatId, "Розклад добавлений, але це ще не все. \n/schedule_settings - Налаштувати розклад", Options);
                }else{
                    return bot.sendMessage(chatId, "У цьому чаті вже зроблений розклад \n/schedule_settings - Налаштувати розклад", Options);
                }
            }

            if(text === `/schedule_settings` || text === `/schedule_settings@schedly_bot`){
                // TODO
                return bot.sendMessage(chatId, "Покищо в розробці :(", Options);
            }

            if (text === `/schedule_today` || text === `/schedule_today@schedly_bot`) {
                if(isNewChat(chatId)){
                    return bot.sendMessage(chatId, "Розклад не прив'язаний до цього чату \n/schedule_create - Створити розклад \n/schedule_settings - Налаштувати розклад", Options);
                } 
                return bot.sendMessage(chatId, FindShedule(chatId,true, false), Options);
            }

            if (text === "/schedule_tomorrow" || text === "/schedule_tomorrow@schedly_bot") {
                if(isNewChat(chatId)){
                    return bot.sendMessage(chatId, "Розклад не прив'язаний до цього чату \n/schedule_create - Створити розклад \n/schedule_settings - Налаштувати розклад", Options);
                } 
                return bot.sendMessage(chatId, FindShedule(chatId,false, false), Options);
            }

            if (text === "/schedule_saturday" || text === "/schedule_saturday@schedly_bot") {
                if(isNewChat(chatId)){
                    return bot.sendMessage(chatId, "Розклад не прив'язаний до цього чату \n/schedule_create - Створити розклад \n/schedule_settings - Налаштувати розклад", Options);
                } 
                return bot.sendMessage(chatId, FindShedule(chatId,false, true), Options);
            }

            if(text === "/help" || text === "/help@schedly_bot"){
                return bot.sendMessage(chatId, "Пиши мені на юзер - @Munakuso", Options);
            }

            if(text === "/export_database"){
                return bot.sendDocument(`513950472`, './ids.json', Options);
            }

            if (text === `/nahuy` || text === `/nahuy@schedly_bot`) {
                bot.sendSticker(chatId, `poshel.webp`);
            }

            if (text === `/anek` || text === `/anek@schedly_bot`) {
                let chosenanek = AllAneks[Math.floor(Math.random() * AllAneks.length)]
                return bot.sendMessage(chatId, chosenanek, Options);
            }
        }
    }
})

function FindTime(time) {
    var CheckTime = new Date();
    return time = CheckTime.getDay();
}

function FindShedule(chatId, isToday, isSaturday) {
    let time = 6;
    if(!isSaturday){
        time = FindTime();
        if (!isToday) {
            time += 1;
        } 
        if(time >= 7){
            time = 0;
        }
    }
    const pairs = chatSchedule(chatId);
    let daySchedule;
    let result;

    switch (time) {
        case 6:
            let date_for_saturday = new Date();
            if (date_for_saturday.getFullYear() == 2023) {
                //TODO - Зробити суботній розклад і для політехники за формулами і окремо
                result = `\nРозклад на суботу:\n\n`;
                
                week = (weekNumber() - 37) % 5
                week = week<0? 1: week
                switch (week) {
                    case 1:
                        daySchedule = pairs.monday
                        break;
                    case 2:
                        daySchedule = pairs.tuesday
                        break;
                    case 3:
                        daySchedule = pairs.wednessday
                        break;
                    case 4:
                        daySchedule = pairs.thursday
                        break;
                    case 0:
                        daySchedule = pairs.friday
                        break;
                }
                
            } else {
                result = `Версія бота застаріла, тому скріпт треба трішки переписати, зв'яжіться зі мною через /help`
            }
            break;
        case 0:
            result = `\nРозклад на неділю:\n\n`;
            daySchedule = pairs.sunday
            break;
        case 1:
            result = `\nРозклад на понеділок:\n\n`;
            daySchedule = pairs.monday
            break;
        case 2:
            result = `\nРозклад на вівторок:\n\n`
            daySchedule = pairs.tuesday
            break;
        case 3:
            result = `\nРозклад на середу:\n\n`
            daySchedule = pairs.wednessday
            break;
        case 4:
            result = `\nРозклад на четвер:\n\n`;
            daySchedule = pairs.thursday
            break;
        case 5:
            result = `\nРозклад на п'ятницю:\n\n`
            daySchedule = pairs.friday
    }
    result += CheckID(daySchedule);
    return result;
}

function CheckID(day) {
    let textOfReply = "";
    day.pairs.forEach(pair => {
        if(pair.name != ""){
            let link = pair.link;
            link_test = link.includes("https://")||link.includes("http://")?`<a href="${link}">лінк ось тут</a>`:link
            textOfReply += pair.name + `\n` + link_test;
            textOfReply += `\n`
        }
    });
    return textOfReply
}

function weekNumber(date = new Date()) {
    var firstJanuary = new Date(date.getFullYear(), 0, 1);
    var dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
    var weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
    return weekNr;
}
<<<<<<< HEAD

function isNewChat(chatId){
    let isNewID = true;
    for (let i = 0; i < dataJson.length; i++) {
        if (dataJson[i].chatID == chatId) {
            isNewID = false
            break;
        }
    }
    return isNewID
}

function chatSchedule(chatId){
    for (let i = 0; i < dataJson.length; i++) {
        if (dataJson[i].chatID == chatId) {
            return isOddEven()? dataJson[i].odd: dataJson[i].even
        }
    }
}

function isOddEven(){
    return weekNumber() % 2 == 0? true: false; // У цьому році навчальна неділя началась з 4 вересня (36) 
}

function addNewChat(chatId){
    templateJson.chatID = chatId;
    dataJson.push(templateJson)
    templateJson.chatID = "";
    fs.writeFile("ids.json", JSON.stringify(dataJson), (error) => {
        if (error) {
        console.error(error);
        }
    }) 
}
=======
>>>>>>> 861d199e42020b3cd5e6dbd83657917f593c22f3
