const Discord = require('discord.js');
exports.run = function(client, message, args) {

  if (!message.guild) {
    return message.author.send('`temizle` **komutu sadece sunucularda kullanılabilir.<a:party_parrot:519604387275079681> **');
  }
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 100) return message.channel.send('**<a:531853419187798026:536338475369365524> Kaç mesaj silmem gerektiğini belirtmedin.**')
  if (mesajsayisi > 100) return message.channel.send('**<a:531853419187798026:536338475369365524> __100__** **adetden fazla mesaj silemem!<a:531853419187798026:536338475369365524> **');
  message.channel.bulkDelete(mesajsayisi + 100);
  message.channel.send('**__' + mesajsayisi + '__** **adet mesaj sildim!<a:531853512435302410:536334688776880128>  ** ')
  message.delete(30)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
