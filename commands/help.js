const fs = require('fs');
const Discord = require('discord.js');

const Command = require('./../command-class.js');

module.exports = new Command('Lists all commands with a little description', (msg, _args) => {
    const commandListText = fs.readdirSync('./commands')
        .map(file =>
            `${"``"}!${file.slice(0,-3)}${"``"} ${require(`./${file}`).help}`)
        .join("\n");
    const helpEmbed = new Discord.MessageEmbed()
        .setColor('#ff0040')
        .addField('Список команд',commandListText)
        .setTimestamp();
    msg.channel.send(helpEmbed);
});