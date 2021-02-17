require('dotenv').config();

const fs = require('fs');
const path = require('path');

const Command = require('./../command-class.js');

const foldersId = JSON.parse(fs.readFileSync('folders-id.json'));

module.exports = new Command("Gets a file given its folder.", (msg, args) => {
    const folder = args[0];
    if (foldersId[folder]) {
        const file = args[1];
        const filePath = path.join(folder,file);
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
});