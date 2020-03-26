const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🔴Eğlence  Komutları 3🔴 **")
    .setColor("RANDOM")
        .addField("🏅**`-çekiliş`**",
"**Cekilis yaparsiniz**")
    .addField("🏅**`-kralol`**",
"**Kral olursunuz**")
    .addField("🏅**`-korkut`**",
"**Istediginiz Kisiyi Korkutursunuz**")
    .addField("🏅**`-wasted`**",
"**Avatariniza wasted Effekti Verir**")
    .addField("🏅**`-çayiç`**", "**Çay Icersiniz  **")
    .addField("🏅**`-cowsay`**",
"**Inek Sekli Gonderir**")
    .addField("🏅**`-yumruh-at`**", "**Yumruk Atarsiniz **")
    .addField("🏅**`-kullanıcıbilgim`**", "**Kendiniz Hakkında Ogrenirsiniz**")
    .addField("🏅**`-sunucubilgi`**", "**Sunucu Hakkında Ogrenirsiniz **")
       .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/DBRe5tr)`, false);
    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e3' , 'eğlence3' , 'eğ3'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence3',
  description: 'Bütün Eğlence2   komutlarını verir.',
  usage: 'eğlence3'
};