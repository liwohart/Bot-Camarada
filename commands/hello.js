const Command = require('./../command-class.js');

module.exports = new Command('Sends a wellcoming message in Russian', (msg, _args) => {
    msg.channel.send(`Привет, товарищ <@${msg.author.id}>!`);
});