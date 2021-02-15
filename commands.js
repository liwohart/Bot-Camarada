const fs = require('fs');

const commands = fs.readdirSync('commands').reduce((obj,file) => {
    obj[file.slice(0,-3)] = require(`./commands/${file}`);
    return obj;
}, {})

module.exports = function (msg) {
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    if (command.charAt(0) === "!"){
        command = command.substring(1);
        console.log(Date(),command, msg.author.username);
        try {
            commands[command].run(msg,tokens);
        } catch (e) {
            const text =  ((e instanceof TypeError)? "no such command" : e);
            msg.channel.send(`CommandError: ${text}`)
        }
    }
}