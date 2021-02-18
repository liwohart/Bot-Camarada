const fs = require('fs');
const Discord = require('discord.js');

const Command = require('./../command-class.js');

module.exports = new Command('Lists all commands with a little description', [], [],
    (_nOpts, _opts) => '',
    (msg, _args) => {
        const commandListText = fs.readdirSync('./commands')
            .map(file => {
                const command = require(`./${file}`);
                const varText = command.getVarText();
                const holeText = `${"``"}!${file.slice(0,-3)}${varText}${"``"} : ${command.help}`;
                return holeText;
            })
            .join("\n");
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#ff0040')
            .addField('Список команд',commandListText)
            .setTimestamp();
        msg.channel.send(helpEmbed);
    }
);