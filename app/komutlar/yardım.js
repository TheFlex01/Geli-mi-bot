const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
    const embedyardim = new Discord.RichEmbed()
        .setTitle(`${client.user.username} | YARDIM MENÜSÜ `)
        .setColor("#d49818")
        .setDescription(`Ping: ${Date.now() - message.createdTimestamp} ms \n` +
        ` \n` +
        + `  \n`
        + `🕵**${prefix}yetkili** >> Yetkili Komutlarını gösterir. (Yetkili harici erişemez)! \n`
        + `😴**${prefix}afk** >> Afk olursunuz birisi sizi etiketlediğinde afk sebebinizi belirtir. \n`
        + `🔔**${prefix}hatırlat** >> Girdiğiniz mesajı belirttiğiniz dakikada size bildirir.Alarm görevi görür \n`
				+ `😄**${prefix}eğlence** >> Eğlence komutlarını gösterir.!\n`
				+ `🙋**${prefix}anakomutlar** >> Ana komutları gösterir.!\n`
        + `⭐**${prefix}sayfalıyardım** >> komutların gösterir.!\n`
        + `💎**${prefix}Kullanıcı** >> komutlarını gösterir.!\n`                
        + `🌐**${prefix}spam-filtresi** >> komutlarını gösterir.!\n`
        + `🎶**${prefix}müzik** **[BETA]** >> Youtube üzerinden müzik dinlersiniz.!\n`
        + `📨**${prefix}tavsiye** >> Bot yapımcısına tavsiye gönderirsiniz.!\n`
        + `👑**${prefix}yapımcım** >> Bot yapımcısını gösterir.!\n`
        + `🎟**${prefix}canlıdestek** >> Botun sahibi ile canlı sohbet edersiniz.!\n`
        + `📈**${prefix}istatistik** >> Botun istatistiğini gösterir.!\n`
        + `💎**${prefix}botdavet** >> Botu sunucunuza ekleyebilirsiniz.!\n`
        + `👻**${prefix}botsunucu** >> Botun sunucusuna gidersiniz..!\n`
        + `:zap:**${prefix}seviye-yardım** >> komutlarını gösterir.!\n`   
        + `💊**${prefix}ping** >> Botun ping değerini gösterir.!\n`)
        
        

                .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL )

        
        message.channel.send(embedyardim);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['y', 'gyardım'],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
    description: 'Tüm komutları gösterir.',
    usage: 'yardım [komut]'
};