require('dotenv').config();

const commandHandler = require('./commands.js')
const Discord = require('discord.js');
const client = new Discord.Client();

console.log("beep beep");

client.on('ready', () => {
	console.log("Agora vai");
});

client.on('message', commandHandler);

client.login(process.env.BOT_TOKEN);