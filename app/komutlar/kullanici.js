

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**✅Kullanici Komutlari✅ **")
    .setColor("RANDOM")
    .addField("♾**`-rastgelerenk`**",
"**Rastgele Renk Soyler**")
    .addField("♾**`-kod`**",
"**Kod Seklinde Yazarsiniz**")
    .addField("♾**`-gifara`**",
"**Googlede Yazilan Gifi Arar**")
    .addField("♾**`-hesapla`**",
"**Islemi Hesaplar**")
    .addField("♾**`-reklamlar`**", "**Reklâm Gif Atar**")
    .addField("♾**`-google`**",
"**Googlede Ararsiniz **")
    .addField("**♾`-bayrak`**",
"**RastGele Bayrak Gifi Gonderir**")
    .addField("♾**`-destek`**",
"**Yetkililere Soru Sorarsiniz**")
    .addField("♾**`-atatürk-çerçeve`**", "**Avatara Atatürk Effekti ekler**")
    .addField("♾**`-saat`**",
"**Saati Ogrenirsiniz**")
    .addField("**♾`-winner`**",
"**Avatariniza Winner Effekti Verir**")
    .addField("**♾`-sunucudavet`**",
"**Sunucunuza Davet Linki Olusturur**")
      .addField("**♾`-aweasu`**",
"**AweaYa Su Verirsiniz **")
      .addField("**♾`-top10`**",
"**Bot 10 Sunucuda Oldugunu Gosterir**")
      .addField("**♾`-troll`**",
"**Troll Yapar **")
      .addField("**♾`-radyo`**",
"**Radyo Dinlersiniz**")
      .addField("**♾`-slot`**",
"**Slot Donderirsiniz**")
      .addField("➡️» Linkler", `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=502783683707666433&scope=bot&permissions=805314622)` + "** | **" + `[Destek Sunucusu](https://discord.gg/7CaA6TH)`, false);

    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanici' , 'k' , 'kullanıcı'],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcı',
  description: 'Bütün kullanici komutlarını verir.',
  usage: 'kullanıcı'
};