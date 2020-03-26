

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
.setFooter(' ❣| GökTürk |💕 ')
    
.setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
    .setDescription("**➡️GökTürk Sunucusu Hakkında Kısa Bilgi⬅️ **")
    .setColor("RANDOM")
      .addField("➡️» Link", `[🔸️Sunucum](https://discord.gg/XmBN5Nq)`, false);

    message.channel.send(serverembed);
  message.react('🌈')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r' , 'botsunucu' ,],
  permLevel: 0
};

exports.help = {
  name: 'botsunucu',
  description: 'Bütün  komutlarını verir.',
  usage: 'botsunucu'
};