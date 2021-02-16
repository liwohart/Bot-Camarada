require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

const foldersId = JSON.parse(fs.readFileSync('folders-id.json'));

module.exports.help = "Gets a file given its folder.";
module.exports.run = function (msg, args) {
    const folder = args[0];
    if (foldersId[folder]) {
        const file = args[1];
        const filePath = `./${folder}/${file}`;
        if (fs.existsSync(filePath)) {
            msg.channel.send("вот файл, который вы просили",{
                files: [filePath]
            })
        } else {
            msg.channel.send(`Error: no such file.\nFix: try checking the name of the file or update using this:\n${"``"}!update ${folder}${"``"}`);
        }
    } else {
        msg.channel.send("Error: no such folder.");
    }
}