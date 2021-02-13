require("dotenv").config();

const authorize = require('./authorize.js');
const {google} = require('googleapis');
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const foldersId = JSON.parse(process.env.GOOGLE_DRIVE_FOLDERS_ID);

function listFiles(folder) {
    return (auth) => {
        const drive = google.drive({version: 'v3', auth});
        console.log(`Folder: ${folder}, ID: ${foldersId[folder]}`);
        drive.files.list({
            q: `parents='${foldersId[folder]}' and trashed = false`,
            fields: 'nextPageToken, files(*)',
        }, (err, res) => {
            if (err) return console.log('The API returned an error:', err);
            const files = res.data.files;
            const text = ((files.length)?
                files
                    .map(file => `${file.name} (${file.id})`)
                    .join("\n") :
                'No files found.');
            console.log(text);
        });
    }
}

authorize(credentials,listFiles("portugol"));