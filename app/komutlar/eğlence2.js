

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🔴Eğlence  Komutları 2🔴 **")
    .setColor("RANDOM")
        .addField("🏅**`-1vs1`**",
"**Istediginiz kisileri savastirirsiniz**")
    .addField("🏅**`-tavsiye`**",
"**Bota tavsiye Edersiniz**")
    .addField("🏅**`-kartopu`**",
"**Kartopu Atarsiniz**")
    .addField("🏅**`-gif`**",
"**Rastgele Gif Atar**")
    .addField("🏅**`-bravery`**",
"**Avatariniza Bravery effekti ekler**")
    .addField("🏅**`-öneri`**",
"**Oneri Yaparsiniz**")
    .addField("🏅**`-afk/geldim`**",
"**afk Olursunuz**")
    .addField("🏅**`-kedi`**",
"**Kedi gifi atar**")
    .addField("🏅**`-tokat`**",
"**Tokat Atarsiniz**")
    .addField("🏅**`-mcbaşarım`**",
"**Love Minecraft**")
    .addField("🏅**`-reklamlar`**",
"**Reklam Gifi Atar**")
    .addField("🏅**`-ascii`**",
"**Ascii Yaparsiniz**")
    .addField("🏅**`-aşkölçer`**",
"**Askinizi Olcersiniz**")
       .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/DBRe5tr)`, false);
    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e2' , 'eğlence2' , 'eğ2'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence2',
  description: 'Bütün Eğlence2   komutlarını verir.',
  usage: 'eğlence2'
};