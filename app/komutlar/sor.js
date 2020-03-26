const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const Cleverbot = require('cleverbot.io');
var bot = new Cleverbot('');
exports.run = (client, message, params) => {
bot.setNick('GamerBOT');
let yazi = params.slice(0).join(' ');
 if (!yazi) return message.reply('Bir mesaj yazmalısın.');
   message.channel.send(`<a:yukleniyor:529644969930129420> | Cevap Yükleniyor...`).then(msg => {
    bot.create(function (err, session) {
    bot.ask(yazi, function (err, response) {
        
    
        msg.edit(response)
    });
});
})}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'sor',
  description: 'RitararyCode Sunusuna Aittir',
  usage: 'sor'
}; 
