

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let serverembed = new Discord.RichEmbed()
.setFooter(' ❣| AlphaTurk Siteleri |💕 ')
    
.setThumbnail("https://78.media.tumblr.com/10b366f294d47b40d857d6e47872d0dc/tumblr_ntubqoYYsF1sqwlqgo3_250.gif")
    .setDescription("**🔥Botun siteleri🔥 **")
    .setColor("RANDOM")
      .addField("➡️» Linkler", `[🔸️Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=546801521799725057&scope=bot&permissions=805314622)` + "**  \n**" + `[🔸️Destek Sunucusu](https://discord.gg/guAKFnS)` + "**  \n**" + `[🔸️Bota Oy Ver](https://discordbots.org/bot/)` + "**\n**" + `[🔸️Botun Sitesine Git]()`, false);

    message.channel.send(serverembed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botsite' , 'oyver' ,],
  permLevel: 0
};

exports.help = {
  name: 'siteler',
  description: 'Bütün  komutlarını verir.',
  usage: 'siteler'
};