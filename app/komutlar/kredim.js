const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms')



exports.run = async (client, message, args) => {
 let user = message.author
  var toplam = await db.fetch(`kredi-sistemi.coderskod_${user.id}`)
   let m = message
  const al = new Discord.RichEmbed()
  .setColor("RANDOM")
 .setDescription(`${message.author.tag}'un Toplam ${toplam || 0} Kredisi Var!`)
 
  m.channel.send(al)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kredim',
  açıklama: 'izinsiz paylaşmayın piçler hehe xd',
  çalcanmı: 'çalarsan öperim seni! 👑CoderS Code Sharing👑'
};