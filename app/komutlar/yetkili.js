const Discord = require('discord.js');
const loglar = require('../loglar.json')

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

	const yardım = new  Discord.RichEmbed()
	.setColor()
	.setAuthor(`GökTürk`, client.user.avatarURL)
	.addField(`Yetkili Komutlar`, `**:small_orange_diamond:   | g-bot-otorol**: Sunucu ya eklediniz bota ayarladınız rolu verir\n **:small_orange_diamond: | g-susturrol**: Sustur Rolu Ayarlarsınız\n **:small_orange_diamond:  | g-log-ayarla**: Log Kanalı Belirlersiniz\n **:small_orange_diamond:   | g-ototag**: Sunucuda Tag Ayarlarsiniz\n **:small_orange_diamond:   | g-sayaç**: Sayaç Ayarlarsiniz\n **:small_orange_diamond:  | g-hg-bb-ayarla**: Hosgeldin Kanali Ayarlarsiniz\n **:small_orange_diamond:  | g-sunucutanıt**: Sunucunuz Destek Sunucusunda Tanitilir\n **:small_orange_diamond:  | g-sunucukurucu**: 1dk Hazir Sunucu\n **:small_orange_diamond:  | g-otorol-ayarla**: Otorol Ayarlarasiniz\n **:small_orange_diamond:  | g-rolver**: Rol Verirsiniz\n **:small_orange_diamond:  | g-mesajküçült**: Mesaji Kucultur\n **:small_orange_diamond:  | g-ban**: Etiketlediginiz Kisiyi Ban Edersiniz\n **:small_orange_diamond:  | g-yavaşmod**: Slowmode Açarsiniz\n **:small_orange_diamond: | g-kick**: Kick Yaparsiniz\n **:small_orange_diamond:  | g-unban**: Bani Kaldirirsiniz`)
    .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)

    return message.channel.sendEmbed(yardım);

};



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yetkili'],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'yetkili'
};