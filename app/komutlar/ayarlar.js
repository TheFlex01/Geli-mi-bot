const Discord = require('discord.js');
var ayarlar = require('../ayarlar.json');
const fs = require('fs');
  let prefixes = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/prefix.json", "utf8"));
let küfürEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8")); //Bu dosyaları oluşturun

exports.run = (client, message) => {
  
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`» ${message.guild.name} Sunucu Ayarları «`, `https://images-ext-2.discordapp.net/external/ujBwHK3NkvSNyffbh50uDXaOIG6M3ED77fYEsn33Sl4/http/cdn.onlinewebfonts.com/svg/download_136247.png`)
  .addField("Küfür Engelleme Sistemi", küfürEngel[message.guild.id] ? "Açık<587974157833207848>" : "<a:531853419187798026:536338475369365524> Kapalı <a:kapali:587973756249440306> " ,true)
  message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `Yönetici izni gerekiyor.`
  };
  
  exports.help = {
    name: 'ayarlar',
    category: 'ayarlar',
    description: 'Sunucu ayarlarını gösterir.',
    usage: 'g!ayarlar'
  };