const Discord = require('discord.js');

exports.run = (client, message, args) => {
 message.delete();
  message.reply("Talebin açıldı! Yukarıdaki açılan sohbet kanalından kontrol edebilirsin!")
    message.guild.createChannel(`talep-${message.author.id}`, 'text').then(ch => {
        ch.overwritePermissions(message.member.roles.first(),{
            VIEW_CHANNEL: false,
        }).catch()
        message.guild.roles.forEach((role) => {
            if (!role.hasPermission("MANAGE_MESSAGES")) {
                ch.overwritePermissions(role,{
                    VIEW_CHANNEL: false,
                }).catch()
                ch.overwritePermissions(message.author.id,{
                    VIEW_CHANNEL: true,
                }).catch()
            }
        })

        const embed = new Discord.RichEmbed()
        .setAuthor("» Star Acedemy\'s | Canlı Destek")
        .setDescription("**Merhaba! Müsait bir yetkilimiz sizinle ilgilenecektir.\nEğer ilgilenen olmazsa birisiyle özel mesaja geçebilirsiniz. Eğer mesaj gelmesse -kapat yazarak talebi kapatabilirsiniz!**")
        .setFooter('» Star Acedemy\'s | Canlı Destek', client.user.avatarURL)
        .setTimestamp()
        ch.send(embed).catch()
        ch.awaitMessages((msg)=> {
            if (msg.content === "-kapat") {
                ch.send("`Talebiniz iptal ediliyor!`").then(()=>{
                    setTimeout(()=> {
                        ch.delete().catch()
                    },1000)
                });
            }
        },{time:86400000})
    })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['destek'],
    permLevel: `Yönetici izni gerekiyor.`
  };
module.exports.help = {
  name: 'talep',
};