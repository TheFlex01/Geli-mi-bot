const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🔴Eğlence  Komutları 4🔴 **")
    .setColor("RANDOM")
        .addField("🏅**`-afk/geldim`**",
"**afk Olursunuz**")
    .addField("🏅**`-olay`**",
"**olay eglencelı**")
    .addField("🏅**`-slot`**",
"**Slot Oyunu Oynarsiniz**")
    .addField("🏅**`-ara155`**",
"**Polise Ararsiniz (155)**")
    .addField("🏅**`-kaccm`**",
"**Kosarsiniz **")
    .addField("🏅**`-düello`**",
"**Duelloya Cikarsiniz**")
    .addField("🏅**`-youtube`**",
"**Youtubda Bisey ararsiniz**")
    .addField("🏅**`-rastgele-kullanıcı`**",
"**Rastgele Kullanici Soyler**")
       .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/DBRe5tr)`, false);
    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e4' , 'eğlence4' , 'eğ4'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence4',
  description: 'Bütün Eğlence2   komutlarını verir.',
  usage: 'eğlence4'
};