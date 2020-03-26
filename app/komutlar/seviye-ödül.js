const db = require('quick.db');

exports.run = async (client, message, args, func) => {
  var seçenek = args[0];
  if(!seçenek) return message.channel.send("Bir seçenek belirtin (aç - kapat)");
  
  if(seçenek === "aç") {
    var seç = await db.fetch(`seviyeSistemi_${message.guild.id}`)
    if(seç) {
      message.channel.send("Seviye sistemi zaten açık")
    } else {
    
    db.set(`seviyeSistemi_${message.guild.id}`, 1)
    message.channel.send("Seviye sistemi açıldı")
  }
  } else if(seçenek === "kapat") {
    var seç = await db.fetch(`seviyeSistemi_${message.guild.id}`)
    if(seç) {
      db.delete(`seviyeSistemi_${message.guild.id}`)
      message.channel.send("Seviye sistemi kapatıldı");
    } else {
      message.channel.send("Seviye sistemi zaten kapalı")
    }
  }
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2,
    kategori: "Ayarlanabilir Özellik Komutları"
};
  
  exports.help = {
    name: 'seviye-sistemi',
    description: 'Sunucunuz için seviye sistemini açıp kapatmanızı sağlar.',
    usage: 'seviye-sistemi <aç | kapat>'
};