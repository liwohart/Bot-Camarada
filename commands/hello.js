module.exports = function (msg) {
    msg.channel.send(`Привет, товарищ <@${msg.author.id}>!`);
}