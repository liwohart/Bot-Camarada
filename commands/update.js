require('dotenv').config();

const fs = require('fs');
const authorize = require('./../authorize.js');
const {google} = require('googleapis');
const path = require('path');
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const foldersId = JSON.parse(process.env.GOOGLE_DRIVE_FOLDERS_ID);

/**
* @param {string} filePath Path where file will be stored locally.
* @param {string} fileId File ID.
* @param {google.auth.OAuth2} auth An authorized OAuth2 client.
*/
function getFile(filePath,fileId,auth){
	go = (auth) => {
		const drive = google.drive({version: 'v3', auth});
		drive.files.get({ fileId: fileId, alt: 'media'}, {responseType: 'stream'})
		.then(res => {
			return new Promise((resolve, reject) => {
				console.log(`\nwriting to ${filePath}`);
				const dest = fs.createWriteStream(filePath);
				let progress = 0;
				res.data
				.on('end', () => {
					console.log(`\nDone downloading ${filePath}.`);
					resolve(filePath);
				})
				.on('error', err => {
					console.error(`Error downloading ${filePath}.`);
					reject(err);
				})
				.on('data', d => {
					progress += d.length;
					if (process.stdout.isTTY) {
						process.stdout.clearLine();
						process.stdout.cursorTo(0);
						process.stdout.write(`Downloaded ${progress} bytes from ${filePath}`);
					}
				})
				.pipe(dest);
			});
		});
	}
	return (auth? go(auth) : authorize(credentials,go));
}

module.exports = function (msg,args) {
	const folder = ((args.length)? args[0] : "images");
	go = (auth) => {
		const drive = google.drive({version: 'v3', auth});
		drive.files.list({
			q: `parents='${foldersId[folder]}' and trashed = false`,
			fields: 'nextPageToken, files(id, name)',
		}, (err, res) => {
			if (err) return console.log('The API returned an error:', err);
			const files = res.data.files;
			files.map((file) => {
				getFile(path.join(folder,file.name),file.id,auth);
			});
            msg.channel.send(`полное обновление, загружено ${files.length} файлов`);
		});
	}
    msg.channel.send("начало обновления");
	return authorize(credentials,go);
}