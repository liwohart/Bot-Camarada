require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

const authorize = require('./../authorize.js');

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const foldersId = JSON.parse(fs.readFileSync('folders-id.json'));

/**
* @param {string} filePath Path where file will be stored locally.
* @param {string} fileId File ID.
* @param {google.auth.OAuth2} auth An authorized OAuth2 client.
*/
function getFile(filePath,fileId,auth){
	const go = (auth) => {
		const drive = google.drive({version: 'v3', auth});
		drive.files.get({ fileId: fileId, alt: 'media'}, {responseType: 'stream'})
		.then(res => {
			return new Promise((resolve, reject) => {
				console.log(`\nwriting to ${filePath}`);
				const dest = fs.createWriteStream(filePath);
				res.data
				.on('end', () => {
					console.log(`Done downloading ${filePath}.`);
					resolve(filePath);
				})
				.on('error', err => {
					console.error(`Error downloading ${filePath}.`);
					reject(err);
				})
				.pipe(dest);
			});
		});
	}
	return (auth? go(auth) : authorize(credentials,go));
}

module.exports.help = 'Updates files in a certain folder',
module.exports.run = function (msg,args) {
	const folder = args[0];
	if (foldersId[folder]) {
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);
		msg.channel.send("начало обновления");
		return authorize(credentials, (auth) => {
			const localFiles = fs.readdirSync(`./${folder}`);
			const drive = google.drive({version: 'v3', auth});
			drive.files.list({
				q: `parents='${foldersId[folder]}' and trashed = false`,
				fields: 'nextPageToken, files(id, name)',
			}, (err, res) => {
				if (err) return console.log('The API returned an error:', err);
				const files = res.data.files;
				const filesToDownload = files
					.filter(file =>
						localFiles.every(local => !(local === file.name)))
				filesToDownload
					.map((file) => {
						getFile(path.join(folder,file.name),file.id,auth);
					});
				msg.channel.send(`полное обновление, загружено ${filesToDownload.length} файлов`);
			});
		});
	} else {
		msg.channel.send("Error: no such folder.");
	}
}