const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {



    let youtube = args.slice(0).join('+');

        let link = `https://www.youtube.com/results?search_query=` + youtube;
        if(!youtube)return message.reply(`**Lutfen Youtubda Aradigim Linki Yaz**`)
        if(!link)return message.reply("Console error")
        let embed = new Discord.RichEmbed()
 
         
     .setColor("RED")
         
          .setTimestamp()
        
          .addField('<:2297_spin_gear:533996381401251840> Aktivasyon:', 'Youtubede Aranıyor')

          .addField("<:2297_spin_gear:533996381401251840> Aranan:", `${args.slice(0).join(' ')}`)

          .addField('<:2297_spin_gear:533996381401251840> Link:', `${link}`)
         
          .setFooter("Avatarın", message.author.avatarURL);
          
              message.channel.send(embed);
              message.author.send(`Aradığın link bulundu ${link} Sunucu: ${ message.guild.name}`);

        
    
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'youtube',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'youtube'
};