

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🎶Muzik Komutlari🎶 **")
    .setColor("RANDOM")
    .addField("🎵**`-çal`**", "**mùzik Calar**")
    .addField("🎵**`-geç`**", "**Muzigi Gecersiniz**")
    .addField("🎵**`-sıra`**", "**Muzik sirasini gosterir**")
    .addField("🎵**`-dur`**", "**Muzigi Dirdurursunuz**")
    .addField("🎵**`-devam`**", "**Muziginiz Devam Eder**")
    .addField("🎵**`-ses`**",
"**muzigin sesini Kontrol Edersiniz**")
    .addField("🎵**`-çalan`**",
"**Bot Simdi Caldigi Sarkiyi Soyler**")
      .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=502783683707666433&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/7CaA6TH)`, false);

    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['müzik' , 'm' , 'mü'],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'Bütün  komutlarını verir.',
  usage: 'müzik'
};