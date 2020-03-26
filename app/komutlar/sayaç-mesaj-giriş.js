const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
  let mesaj = args.join(' ');
  if (mesaj.length < 1) return message.channel.send("⛔ Sayaç mesajlarını ayarlamak için birşeyler belirtiniz! `:inbox_tray: Hoşgeldin kardeşim, sunucu {sayac} olmaya {toplam-kullanıcı} kişi kaldı!`"); 
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let memberSayacGiris = await db.fetch(`memberSayacGiriş_${message.guild.id}`);
  if (memberSayacGiris == null) memberSayacGiris = `{member} sunucuya hoşgeldin.`
    if (args.length < 1) return message.channel.send("⛔ Sayaç mesajlarını ayarlamak için birşeyler belirtiniz! `:inbox_tray: Hoşgeldin kardeşim, sunucu {sayac} olmaya {toplam-kullanıcı} kişi kaldı!`");
    let newMessage;
    if (args.join(" ").toLowerCase() === `none`) newMessage = '';
    else newMessage = args.join(" ").trim();
    db.set(`memberSayacGiris_${message.guild.id}`, newMessage).then(i => {
        return message.channel.send(`Mükemmel, sayaç mesajı ayarladığınız artık sayaç mesajları ayarladığınız gibi!`)
    })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sayaç-mesaj-giriş'],
  permLevel: 0
};

exports.help = {
  name: 'sayac-mesaj-giriş',
  description: 'neblm',
  usage: 'sayaç-mesaj-giriş'
};
