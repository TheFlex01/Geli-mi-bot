const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');

var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`BOT: ${client.user.username} adı ile giriş yaptı!`);
});

client.on('message', msg => {
  console.log(`LOG: S: ${msg.guild.name} M: ${msg.content} Y: ${msg.author.tag}`);
  if (msg.author.id === ayarlar.id) return;
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) {
	  return;
  }
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.reply('Pong! **' + client.ping + '** ms');
  }
  if (msg.content.toLowerCase() === prefix + 'sa') {
    msg.reply('Aleyküm selam!');
  }
  if (msg.content.toLowerCase() === prefix + 'yaz') {
    msg.delete();
    msg.channel.sendMessage(msg.content);
  }
  if (msg.content.toLowerCase() === prefix + 'temizle') {
    msg.channel.bulkDelete(100);
    msg.channel.sendMessage("100 adet mesaj silindi!");
  }
  if (msg.content.toLowerCase() === prefix + 'reboot') {
    if (msg.author.id !== ayarlar.sahip) {
      msg.reply('Benim yapımcım değilsin!');
    } else {
      msg.channel.sendMessage(`Bot yeniden başlatılıyor...`).then(msg => {
      console.log(`BOT: Bot yeniden başlatılıyor...`);
      process.exit(0);
    })
   }
  }
});
/////////////////////////////////////////////
const db = require ("quick.db");
client.on("guildMemberAdd", async member => {
  let rolk = await db.fetch(`rolK_${member.guild.id}`);
  let rolk2 = member.guild.channels.find('id', rolk)
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let rol2 = member.guild.roles.find('id', rol);
  let botrol = await db.fetch(`bototorol_${member.guild.id}`);
  let botrol2 = member.guild.roles.find('id', botrol);
  if (!rolk) return;
  if (!rolk2) return;
  if (!rol) return;
  if (!rol2) return;
  

    if (!botrol) {
      member.addRole(rol2)
      rolk2.send(`\`${member.user.tag}\` adlı kullanıcıya \`${rol2.name}\` rolü verildi.`)
    }
    if (botrol) {
      if (member.user.bot) {
        member.addRole(botrol2)
        member.removeRole(rol2)
        rolk2.send(`:BEEevet: \`${member.user.tag}\` adlı bota \`${botrol2.name}\` rolü verildi.`)
      }
      if (!member.user.bot) {
        member.addRole(rol2)
        rolk2.send(`\`${member.user.tag}\` adlı kullanıcıya \`${rol2.name}\` rolü verildi.`)
      }
    }
});
////////////////////////////////////
client.login(ayarlar.token);
