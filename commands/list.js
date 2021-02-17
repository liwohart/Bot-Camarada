require("dotenv").config();

const fs = require('fs');
const Discord = require('discord.js');
const {google} = require('googleapis');

const authorize = require('./../authorize.js');
const Command = require('./../command-class.js');

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const foldersId = JSON.parse(fs.readFileSync('folders-id.json'));

module.exports = new Command('Lists all files in a certain folder', (msg,args) => {
	const folder = args[0];
	if (foldersId[folder]) {
		return authorize(credentials, (auth) => {
			const drive = google.drive({version: 'v3', auth});
			drive.files.list({
				q: `parents='${foldersId[folder]}' and trashed = false`,
				fields: 'nextPageToken, files(name)',
			}, (err, res) => {
				if (err) return console.log('The API returned an error:', err);
				const files = res.data.files;
				const text = ((files.length)?
					files.map(file => file.name).join("\n") :
					'No files found.');
				const listEmbed = new Discord.MessageEmbed()
					.setColor('#ff0040')
					.addField(`Список файлов в ${"``"}${folder}${"``"}`,text,true)
					.setTimestamp();
				msg.channel.send(listEmbed);
			});
		});
	} else {
		msg.channel.send("Error: no such folder.")
	}
});