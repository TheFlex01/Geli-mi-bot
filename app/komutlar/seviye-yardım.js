const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter('AlphaTurk')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(':black_square_button: seviye | Seviyenizi gösterir veya bi sonraki seviyeye atlama seviyesini gösterir \n :black_square_button: seviye-sistemi  | Seviye siviye sistemini açık veya kapatmanızı sağlar \n :black_square_button: seviye-ödül  | bi üyenin seviye altladıktan sonra hangi role geçmesini ayarlarsınız');
  
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım'],
  permLevel: 0
};

exports.help = {
  name: 'seviye-yardım',
  description: 'Yapimcimi Gosterir.',
  usage: 'yapimcim'
};
