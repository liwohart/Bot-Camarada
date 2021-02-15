module.exports.help = 'Sends a wellcoming message in Russian',
module.exports.run = function (msg) {
    msg.channel.send(`Привет, товарищ <@${msg.author.id}>!`);
}