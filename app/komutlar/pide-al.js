const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author;
  let para = await db.fetch(`kredi-sistemi.coderskod_${user.id}`);
  let cisim = args.slice(0).join(' ');
  let eksilcek = -100

  let pideMiktar = 1
  let pidepara = 100
 
    if (para < pidepara) {
      message.channel.send('Pide alabilmek için yeterli paran görünmüyor.')
  } else if (para > pidepara) {
    
  
    db.add(`kredi-sistemi.coderskod_${message.member.id}`, eksilcek)
    db.add(`kredi-sistemi.coderskod-satınalınan_${message.member.id}`, pideMiktar)
  
    return message.channel.send(`Başarıyla marketten pide aldınız.`)
  
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'pide-al',
  açıklama: 'izinsiz paylaşmayın piçler hehe xd',
  çalcanmı: 'çalarsan öperim seni! 👑CoderS Code Sharing👑'
};