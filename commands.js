require('dotenv').config()

const fs = require('fs')

const commands = fs.readdirSync('commands').reduce((obj,file) => {
    obj[file.slice(0,-3)] = require(`./commands/${file}`)
    return obj
}, {})

module.exports = function (msg) {
    let tokens = msg.content.split(" ")
    let command = tokens.shift()
    if (command.charAt(0) === process.env.BOT_PREFIX){
        command = command.substring(1)
        console.log(
            `${new Date().toLocaleString("pt-BR", {
                timeZone: process.env.TMZ
            })} ${msg.author.username}: ${msg.content.substring(1)}`)
        try {
            commands[command].run(msg,tokens)
        } catch (e) {
            msg.channel.send(`CommandError: ${e}`)
            console.error(e);
        }
    }
}