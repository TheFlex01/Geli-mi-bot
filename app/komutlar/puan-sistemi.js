const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
if (args[0] === 'ekle') {
  let kisi = message.mentions.users.first()
  if (!kisi) return message.channel.send('Lütfen bir **kişi** giriniz.')
 let miktar = args[1]
 if (!miktar) return message.channel.send('Lütfen bir **miktar** giriniz.')
  db.add(`puan_flaiscode.${kisi.id + message.guild.id}`, miktar)
  message.channel.send(`**${kisi.username}** adlı kullanıcıya **${miktar}** adet puan eklendi.`)
}
if (args[0] === 'sil') {
  let kisi = message.mentions.users.first()
  if (!kisi) return message.channel.send('Lütfen bir **kişi** giriniz.')
 let miktar = args[1]
 if (!miktar) return message.channel.send('Lütfen bir **miktar** giriniz.')
  db.set(`puan_flaiscode.${kisi.id + message.guild.id}`, -miktar)
  message.channel.send(`**${kisi.username}** adlı kullanıcıya **${miktar}** adet puan alındı.`)
}
if (args[0] === 'sıfırla') {
  let kisi = message.mentions.users.first()
  if (!kisi) return message.channel.send('Lütfen bir **kişi** giriniz.')
  db.delete(`puan_flaiscode.${kisi.id + message.guild.id}`)
  message.channel.send(`**${kisi.username}** adlı kullanıcının **puanı** sıfırlandı!`)
}
  };

   exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'puan',
 description: 'Puan sistemi - 02.06.2019 | flaiscode',
 usage: 'Puan sistemi.'
};