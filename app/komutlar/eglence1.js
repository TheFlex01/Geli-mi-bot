

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**🔴Eğlence  Komutları 1🔴 **")
    .setColor("RANDOM")
    .addField("🏅**`-hayvan`**", "**Rastgele Hayvan Gifi Gonderir**")
    .addField("**🏅`-su`**",
"**Etiketlediginiz Kisiyi su icer**")
    .addField("🏅**`-stresçarkı`**", "**Stress Atarsınız **")
    .addField("🏅**`-tkm`**", "**Taş Kâğıt makas Oynarsınız **")
    .addField("🏅**`-starwars`**", "**Star wars Oynarsınız **")
    .addField("🏅**`-kahkaha`**", "**Kahkaha Atarsınız **")
    .addField("🏅**`-sigara`**",
"**Sigara Icersiniz**")
    .addField("🏅**`-urfagönder`**",
"**Urfa Gönderir!**")
    .addField("🏅**`-sins-aga`**", "**Ağa Olursunuz (Eğlence) **")
    .addField("🏅**`-arkadaşın`**", "**Botun Arkadaşının ismini Soyler **")
    .addField("🏅**`-söv`**", "**Etiketlediginiz Kişiyi Sover **")
    .addField("🏅**`-emojiyazı`**", "**Emoji Şeklinde Yazarsınız **")
    .addField("🏅**`-8ball`**", "**Özel 8 ball Soruları sorarsiniz **")
    .addField("🏅**`-avatarım`**", "**Etiketlediginiz Kişinin avatarını Gosterir**")
    .addField("🏅**`-banned`**", "**Banned Gifi Atar**")
    .addField("🏅**`-koş`**", "**Koşarsınız (eglenceli) **")
    .addField("🏅**`-balıktut`**",
"**Balık Tutarsiniz**")
    .addField("🏅**`-nahçek`**",
"**El Haraketi Gosterir**")
       .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/DBRe5tr)`, false);

    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e1' , 'eğlence1' , 'eğ1'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence1',
  description: 'Bütün Eğlence2   komutlarını verir.',
  usage: 'eğlence1'
};