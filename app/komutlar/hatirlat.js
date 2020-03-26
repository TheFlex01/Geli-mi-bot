const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`)
      const embed = new Discord.RichEmbed()
      .setTitle('Kullanım:')
      .setDescription(`g-hatırlat <süre> <yazı>`)
      .addField('Not:','1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün')
      .setColor('RANDOM')
      
  let newMessage;
  if (args.slice(1).join(" ").toLowerCase() === `none`) newMessage = '';
  else newMessage = args.slice(1).join(" ").trim();    
 
  let sure = args[0];
  if(!sure) return message.channel.send(embed);
      
  if (!args[1]) return message.channel.send(embed)
  db.set(`hatırlat_${message.author.id}`, newMessage)

  message.channel.send(`<@${message.author.id}> notun kaydedildi! ${ms(ms(sure))} süre sonra sana **hatırlatıcam!**`);
 let nots = await db.fetch(`hatırlat_${message.author.id}`);
  setTimeout(function(){
    message.author.send(`**Notunuz:** ${nots || 'Notun yok!'}`);
  }, ms(sure));



}
   
                                                         


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hatırlat',
  description: 'Aldığınız notu hatırlatır.',
  usage: 'hatırlat'
};