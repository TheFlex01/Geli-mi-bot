const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')


exports.run = async (client, message, args) => {
  
  let prefix = ayarlar.prefix
  
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(` Bu komutu kullanabilmek için **Sunucuyu Yönet** yetkisine sahip olmalısın.`);
  
  let rol = message.mentions.roles.first()
  if (!rol) return message.channel.send(` Bot otorol olarak ayarlamak istediğin rolü etiketlemelisin. **${prefix}bototorol @Bot**`)

  db.set(`bototorol_${message.guild.id}`, rol.id)
  message.channel.send(` Bot otorol **${rol.name}** olarak ayarlandı.`)

};
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'bot-otorol',
    description: 'Sunucuya giren bota seçtiğiniz rolü otomatik verir.',
    usage: 'bototorol <@rol>'
}