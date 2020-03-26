

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🔸️Ana Komutlar🔸️ **")
    .setColor("#15f153")
    .addField("🔧**`-tr`**",
"**Avatariniza Turkiye Baytagini ekler**")
    .addField("🔧**`-desteksunucu`**",
"**Awea Destek Sunucusunun Linkini Atar**")
    .addField("🔧**`-reklamtaraması`**", "**Sunucuda Reklam Yapanlari Bulur**")
    .addField("**🔧`-siteler`**",
"**Bot'ün Sitelerine Ulasirsiniz**")
    .addField("**🔧`-nsfw`**",
"**NSFW Resmi Gönderir 18+**")
    .addField("🔧**`-yardım`**", "**Bütün komutları Soyler**")
    .addField("🔧**`-bilgi`**", "**Bot Kendi Hakkında Bilgi Verir**")
    .addField("🔧**`-ping`**", "**Botun Pingini olçer**")
    .addField("🔧**`-istatistik`**",
"**Istatistik**")
      .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/DBRe5tr)`, false);

    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['a' , 'anakomutlar' , 'ana'],
  permLevel: 0
};

exports.help = {
  name: 'anakomutlar',
  description: 'Bütün anakomutlar   komutlarını verir.',
  usage: 'anakomutlar'
};