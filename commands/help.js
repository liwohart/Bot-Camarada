const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    description = 'lists all command with a little description',
    run = function (msg, args) {
        const commandListText = fs.readdirSync('./commands')
            .map(file => `!${file.slice(0,-3)}`)
            .join("\n");
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#ff0040')
            .addField('Список команд',`${"```"}${commandListText}${"```"}`)
            .setTimestamp();
        msg.channel.send(helpEmbed);
    }
}