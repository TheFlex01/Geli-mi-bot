const Discord = require('discord.js');
exports.run = function(client, message, args) {
    if (message.author.id === "459621456612032513") {
    let dmkisi = message.mentions.users.first();
    if (!dmkisi) return message.channel.send(':x: **DM Atacağın Kişiyi Seçmelisin**');
    let dm = args.slice(1).join(' ');
    if (!dm) return message.channel.send(':x: **DM Atcağım Yazıyı Unuttun!**');
    message.delete();
    const dmat = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle('Star Acedemy dan Sana Mesaj Geldi !')
    .addField('DM Atan :', `➽ Awea`)
    .addField('DM Mesajı :', `➽ ${dm}`)
    .setFooter('Direk Mesaj | Awea Bot')
    dmkisi.sendEmbed(dmat);
    const dmtamam = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle('İşlem Tamamlandı ⚡')
    .setFooter('Direk Mesaj | Awea Bot')
    message.channel.sendEmbed(dmtamam);
    } else {
        message.channel.send(':x: **Bu Komutu Sadece Yapımcım Kullanabilir!**');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mesajat'],
  permLevel: 0
};

exports.help = {
  name: 'dm-at',
  description: 'Özel komut.',
  usage: ''
};