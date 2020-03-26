const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Gerekli Yetkin Yok");
  
  
  let rol = message.mentions.roles.first() ||  message.guild.roles.get(args.join(" "))
  let yeniRol;
  let twoRole;
  
  if (!rol) return message.channel.send("Otorol Rol Ayarlaman İçin Rol Etiketlemen Lazım Örnek : g-otorol-ayarla @Rol #kanal")
  else yeniRol = message.mentions.roles.first().id
  let isim = message.mentions.roles.first().name
  
  let otorolkanal = message.mentions.channels.first();
  if (!otorolkanal) return message.channel.send("Kanalı Etiketlemedin Örnek : g-otorol-ayarla @Rol #kanal ")
  
  db.set(`otorolisim_${message.guild.id}`, isim)
  
  let d = await db.set(`otorolkanal_${message.guild.id}`, message.mentions.channels.first().id)
  let otorol = await db.set(`autoRol_${message.guild.id}`, yeniRol)
  
  if (!message.guild.roles.get(yeniRol)) return message.channel.send("Gerekli Rölü Bulamadın Rölü Etiketle")
  
  message.channel.send(`Otorol Başarıyla Ayarlandı Otorol Kanalı <#${d}> Olarak Ayarlandı Rol İse <@&${yeniRol}> Olarak Ayarlandı`)
  
}
exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'otorol-ayarla',
description: 'otorol',
usage: 'otorol-ayarla @rol #kanal'
};