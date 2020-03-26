const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = (client, msg, args) => {


let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
    
    //yönetici
    if (msg.member.hasPermission("ADMINISTRATOR")) x = ":white_medium_small_square: "
    if (!msg.member.hasPermission("ADMINISTRATOR")) x = ":white_medium_small_square:  "
    
    //Denetim kaydı
    if (msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("VIEW_AUDIT_LOG")) x2 = ":white_medium_small_square:  "
    
    //Sunucuyu yönet
    if (msg.member.hasPermission("MANAGE_GUILD")) x3 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("MANAGE_GUILD")) x3 = ":white_medium_small_square:  "
    
    //Rolleri yönet
    if (msg.member.hasPermission("MANAGE_ROLES")) x4 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("MANAGE_ROLES")) x4 = ":white_medium_small_square:  "
    
    //Kanalları yönet
    if (msg.member.hasPermission("MANAGE_CHANNELS")) x5 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("MANAGE_CHANNELS")) x5 = ":white_medium_small_square:  "
    
    //üyeleri at
    if (msg.member.hasPermission("KICK_MEMBERS")) x6 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("KICK_MEMBERS")) x6 = ":white_medium_small_square:  "
    
    //üyeleri yasakla
    if (msg.member.hasPermission("BAN_MEMBERS")) x7 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("BAN_MEMBERS")) x7 = ":white_medium_small_square:  "
    
    //mesajları yönet
    if (msg.member.hasPermission("MANAGE_MESSAGES")) x8 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) x8 = ":white_medium_small_square:  "
    
    //kullanıcı adlarını yönet
    if (msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = ":white_medium_small_square: "
    if (!msg.member.hasPermission("MANAGE_NICKNAMES")) x9 = ":white_medium_small_square:  "
    
    //emojileri yönet
    if (msg.member.hasPermission("MANAGE_EMOJIS")) x10 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("MANAGE_EMOJIS")) x10 = ":white_medium_small_square:  "
    
    //webhookları yönet
    if (msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = ":white_medium_small_square:  "
    if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) x11 = ":white_medium_small_square:  "
    
    msg.channel.send(stripIndents`
   **${x}Yönetici
${x2} Denetim Kaydını Görüntüle
${x3} Sunucuyu Yönet
${x4} Rolleri Yönet
${x5} Kanalları Yönet
${x6} Üyeleri At
${x7} Üyeleri Yasakla
${x8} Mesajları Yönet
${x9} Kullanıcı Adlarını Yönet
${x10} Emojileri Yönet
${x11} Webhook'ları Yönet**

   `)
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['izinlerim'],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'yetkilerim',
  description: 'Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.',
  usage: 'yetkilerim'
};