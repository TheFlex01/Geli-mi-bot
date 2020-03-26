const Discord = require('discord.js');
const fs = require('fs');
let spamEngel = JSON.parse(fs.readFileSync("./ayarlar/anti-spam.json", "utf8"));

var ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu komutu kullanmak için \`Kanalları Yönet\` permine sahip olmalısın!`);

    let args = message.content.split(' ').slice(1);
        let prefix = ayarlar.prefix
    const secenekler = args.slice(0).join(' ');

    var errembed = new Discord.RichEmbed()
    .setColor("BLUE")
  .setFooter(`AlphaTurk Spam Komutu`, client.user.avatarURL)
  
    .setAuthor(`AlphaTurk Anti Spam Komutu`, client.user.avatarURL)
    .addField("\`AlphaTurk Anti Spam Komutu\`","Sunucudaki kullanıcılar spam yapar ise susturulur.")
  .addField("Spam Filtresi","Sunucular için filtreli yapışmıştır. \`g-anti-spam aç\` Kapatmak Istoyosanızsa \`anti-spam kapat\` yazmaniz Yeterlidir.")
    if(secenekler.length < 1) return message.channel.send(errembed);
      if(secenekler.length < 1) return message.reply("Spam filtre Sistemini Açmak Icin  \`*anti-spam aç\`` Kapatmak Için `\`anti-spam kapat\` Yazmalısn").then(m => m.delete(10000));

    message.delete();

            if (secenekler === "aç") {
        message.channel.send(`Anti Spam koruma sistemi bu sunucuda açıldı.`).then(m => m.delete(5000));
        spamEngel[message.guild.id] = {
            spamEngel: "acik"
          };

          fs.writeFile("././ayarlar/anti-spam.json", JSON.stringify(spamEngel), (err) => {
            if (err) console.log(err)
          });
    };

    if (secenekler === "kapat") {
        message.channel.send(`Anti Spam Koruma sistemi bu sunucuda devre dışı bırakıldı. `).then(m => m.delete(5000));
        spamEngel[message.guild.id] = {
            spamEngel: "kapali"
          };

        fs.writeFile("././ayarlar/anti-spam.json", JSON.stringify(spamEngel), (err) => {
            if (err) console.log(err)
          });
    };
}

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: []
      };

      exports.help = {
        name: 'spam-filtresi',
        description: 'Reklam engelleme sistemini açarsınız/kapatırsınız | Real Code | 23.08.2019 | .',
        usage: 'reklam-engelle <aç> veya <kapat>'
      };
   