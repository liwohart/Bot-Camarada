require("dotenv").config();

const authorize = require('./../authorize.js');
const {google} = require('googleapis');
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const foldersId = JSON.parse(process.env.GOOGLE_DRIVE_FOLDERS_ID);
const Discord = require('discord.js');

module.exports = function (msg,args) {
	const folder = ((args.length)? args[0] : "images");
	go = (auth) => {
		const drive = google.drive({version: 'v3', auth});
		drive.files.list({
			q: `parents='${foldersId[folder]}' and trashed = false`,
			fields: 'nextPageToken, files(*)',
		}, (err, res) => {
			if (err) return console.log('The API returned an error:', err);
			const files = res.data.files;
            const text = ((files.length)?
                files
                    .map(file => file.name)
                    .join("\n") :
                'No files found.');
            const listEmbed = new Discord.MessageEmbed()
                .setColor('#ff0040')
                .addField(`Список файлов в ${"``"}${folder}${"``"}`,text,true)
                .setTimestamp();
            msg.channel.send(listEmbed);
		});
	}
	return authorize(credentials,go);
}