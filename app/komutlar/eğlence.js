const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🔴Eğlence  Komutları 🔴 **")
    .setColor("RANDOM")
           .addField("🏅**`-eğlence1`**",
"**Eğlence 1 komutlarını GoreBılırsınız**")
    .addField("🏅**`-eğlence2`**",
"**Eğlence 2 komutlarını GoreBılırsınız**")
    .addField("🏅**`-eğlence3`**",
"**Eğlence 3 komutlarını GoreBılırsınız**")
    .addField("🏅**`-eğlence4`**",
"**Eğlence 4 komutlarını GoreBılırsınız**")
       .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/DBRe5tr)`, false);
    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e' , 'eğlence' , 'eğ'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Bütün Eğlence2   komutlarını verir.',
  usage: 'eğlence'
};