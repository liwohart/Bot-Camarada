require('dotenv').config();

const commandHandler = require('./commands.js')
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

console.log("beep beep");

client.on('ready', () => {
	console.log("Agora vai");
});

client.on('message', commandHandler);