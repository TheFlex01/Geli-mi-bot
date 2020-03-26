const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.')
  
 let mesaj = args.slice(0).join(' ');
  if (!mesaj) return message.channel.send('Bir yazı girmelisin ki bende onu tag olarak ayarlayayım.')
  
  db.set(`ototags_${message.guild.id}`, mesaj)
  
  message.channel.send('Ototag başarıyla **'+ mesaj +'** olarak ayarlandı!')
  message.channel.send('')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tag-ayarla","tag"],
  permLevel: 0
}

exports.help = {
  name: 'ototag',
  description: 'Sunucunuzda ototag ayarlar.',
  usage: '!ototag xD'
}