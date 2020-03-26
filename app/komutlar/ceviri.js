const Discord = require('discord.js');
const prefix = ("-");
const translate = require('google-translate-api');
const Langs = ['afrikaans','albanian','amharic','arabic','armenian','azerbaijani','bangla','basque','belarusian','bengali','bosnian','bulgarian','burmese','catalan','cebuano','chichewa','chinese simplified','chinese traditional','corsican','croatian','czech','danish','dutch','english','esperanto','estonian','filipino','finnish','french','frisian','galician','georgian','german','greek','gujarati','haitian creole','hausa','hawaiian','hebrew','hindi','hmong','hungarian','icelandic','igbo','indonesian','irish','italian','japanese','javanese','kannada','kazakh','khmer','korean','kurdish (kurmanji)','kyrgyz','lao','latin','latvian','lithuanian','luxembourgish','macedonian','malagasy','malay','malayalam','maltese','maori','marathi','mongolian','myanmar (burmese)','nepali','norwegian','nyanja','pashto','persian','polish','portugese','punjabi','romanian','russian','samoan','scottish gaelic','serbian','sesotho','shona','sindhi','sinhala','slovak','slovenian','somali','spanish','sundanese','swahili','swedish','tajik','tamil','telugu','thai','turkish','ukrainian','urdu','uzbek','vietnamese','welsh','xhosa','yiddish','yoruba','zulu'];

module.exports.run = async (bot, message, args) => {

  if (args[0] === undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("FFFFFF")
    .setTitle("YANLIŞ KULLANIM :x: \nDoğru Kullanım: -çeviri <Dil> <Çevirilecek Cümle/Kelime")
    .setColor("RED")

    return message.channel.send(embed);

  } else {

    if (args[1] === undefined) {

      return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bana çevirebileceğim bir şey ver. -çeviri <dil> <çevirilecek şey>').setColor('RANDOM'));

    } else {

      let transArg = args[0].toLowerCase();

      args = args.join(' ').slice(prefix.length);
      let translation;

      if (!Langs.includes(transArg)) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Böyle bir dil yok. Dilleri Türkçe değil de İngilizce yaz. \nÖrnek\n :x: zçeviri ingilizce selam\n:white_check_mark: zçeviri english selam\n\nUygun diller: ${Langs}`).setColor('RANDOM'));
      args = args.slice(transArg.length);

      translate(args, {to: transArg}).then(res => {

        const embed = new Discord.RichEmbed()
        .setTitle('Awea\'s Çeviri', 'https://images-ext-2.discordapp.net/external/yBekOtLPO_4ukiht-bKCXh8pe4XH-n9ZjzM4PvBByNY/https/images.techhive.com/images/article/2017/05/pcw-translate-primary-100723319-orig.jpg')
        .addField(`${transArg} diline çevrildi.`, res.text)
        .setColor(`RANDOM`);
        return message.channel.send(embed);

      });

    }

  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'çeviri',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'çeviri'
};