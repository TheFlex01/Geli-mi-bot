const Discord = require('discord.js');

exports.run = (client, message, args) => {

  let pages = [
              '**⚡Bot Hakkında Kısa Bilgı⚡**\n\n\n **🏆-yardım** \n **🏆-davet** \n **🏆-ailemiz** \n **🏆-tavsiye** \n **🏆-bilgi** \n **🏆-sunucutanıt**',
              '**♻️Kullanıcı Ve Eğlence♻️**\n\n\n  **⚠️-8ball** \n **⚠️-aşkölçer** \n **⚠️-çekiç** \n  **⚠️-çayiç **\n **⚠️-döviz** \n **⚠️-wwegif** \n **⚠️-çekiliş** \n **⚠️-mcödül ** \n **⚠️-dcnitro** \n **⚠️-stresçarkı ** \n **⚠️-invert** \n **⚠️-wasted** \n **⚠️-top10** \n **⚠️-yaz** \n **⚠️-sor** \n **⚠️-kullanıcıbilgim** \n **⚠️-emojiyazı**',
              '**❄Yetkili Komutlar🌀**\n\n\n **mod-log Kanalı Olmadan Çalısmaz** \n\n**⚡-uyar** \n **⚡-sustur** \n **⚡-ban** \n **⚡-unban** \n **⚡-mute** \n **⚡-temizle** \n **⚡-kick** \n **⚡-kilit** \n **⚡-çekiliş** \n **⚡-yavaşmod** \n **⚡-rol-ver** \n **⚡-sunucubilgi** \n **⚡-mesajat**',
              '**🌀Bot Bilgi🌀**\n\n\n **📥-davet.** \n **📥-ping** \n **📥-istatistik.** \n **📥-bilgi**',
              '**🎶Muzik Komutlari🎵**\n\n\n **🎄-çal** \n **🎄-dur** \n **🎄-devam** \n **🎄-çalan** \n **🎄-çalan ** \n **🎄-geç** \n **🎄-sıra**',
              ];
  let page = 1;

  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail('https://cdn.discordapom/attachments/487719679868272689/488329963926192158/image0.png')
    .setFooter(`Sayfa ${page} / ${pages.length}`)
    .setDescription(pages[page-1])
  message.channel.send(embed).then(msg => {

  msg.react('⏪')
  .then(r => {
    msg.react('⏩')

      //Filter
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });

      forwards.on('collect', r => {
        if(page === pages.length) return;
        page++;
        embed.setDescription(pages[page-1]);
        embed.setColor('RANDOM')
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })
      backwards.on('collect', r => {
        if(page === 1) return;
        page--;
        embed.setColor('RANDOM')
        embed.setDescription(pages[page-1]);
        embed.setFooter(`Sayfa ${page} / ${pages.length}`)
        msg.edit(embed)
      })

    })
  })
};


exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["sayfa", "sy", "sayfalıyardım"],
permLevel: 0
};

exports.help = {
name: 'sayfalıyardım',
description: 'Yardım Listesini Gösterir',
usage: 'sayfalıyardım'
};