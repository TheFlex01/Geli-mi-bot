const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms')



exports.run = async (client, message, args) => {
 let user = message.author
  var toplam = await db.fetch(`kredi-sistemi.coderskod_${user.id}`)
  var liste = await db.fetch(`kredi-sistemi.coderskod-satınalınan_${user.id}`)
   let m = message
  const al = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
 .setDescription(`${message.author.tag} Adlı Kişinin Kredi(Banka) Profili \n\n\n Toplam Kredisi: ${toplam}\n\n Satın Aldığı Şeyler (Miktar): ${liste , liste || "Yok"}`)
  m.channel.send(al)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kredi-profil',
  açıklama: 'izinsiz paylaşmayın piçler hehe xd',
  çalcanmı: 'çalarsan öperim seni! 👑CoderS Code Sharing👑'
};