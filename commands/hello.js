module.exports = {
    description = 'Sends a wellcoming message in Russian',
    run = function (msg) {
        msg.channel.send(`Привет, товарищ <@${msg.author.id}>!`);
    }
}