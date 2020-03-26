const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
    .setDescription("**:chicken: Sahip komutları  **")
    .setColor("RANDOM")
    .addField("**🔥`-eval`**", "**Kod dener<a:Yes:525350412782403594> **")
    .addField("**🔥`-load`**", "**Yeni bir komut yükler<a:Yes:525350412782403594> **")
    .addField("**🔥`-reboot`**", "**Botu yeniden başlatır<a:Yes:525350412782403594> **")
    .addField("**🔥`-reload`**", "**Bir komutu yeniden başlatır**<a:Yes:525350412782403594> ")
    .addField("**🔥`-unload`**", "**Bir komutu devre dışı bırakır<a:Yes:525350412782403594> **")

    message.channel.send(serverembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sahipler'],
  permLevel: 0
};

exports.help = {
  name: 'sahip',
  description: 'Bütün sahip komutlarını verir.',
  usage: 'sahip'
};