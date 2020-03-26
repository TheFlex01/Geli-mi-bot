
const express = require('express');
const http = require('http');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);





///////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
let kanal = JSON.parse(fs.readFileSync("././sunucuyaözelayarlar/log.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./sunucuyaözelayarlar/prefix.json", "utf8"));
let küfürEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
const db = require('quick.db');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on('messageReactionAdd', (reaction, user) => {
if (reaction.emoji.name == "emoji isim : olmuyacak") {
client.guilds.get("525059870815158272").members.get(user.id).addRole("@&521226844121333762")
}
});




client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});




client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


  


client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});

client.on("message", msg => {
  if (!msg.guild) return;
  if (!küfürEngel[msg.guild.id]) return;
  if (küfürEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (küfürEngel[msg.guild.id].küfürEngel=== 'acik') {
      const kufur = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
  if (kufur.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply(" **Küfür etmene izin vermeyeceğim!**<a:Yes:525352017032511499> ").then(message => message.delete(3000));
    }
}
    }
});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
 

client.on('guildMemberAdd', async member => {
  let tags = await db.fetch(`ototags_${member.guild.id}`)
let tag;
  if (tags = null) tag = `${member.user.username}`
  else tag = `${tags} ${member.user.username}`
  
  member.setNickname(`${tag}`)
}
          );

client.on("message", async msg => {
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puan_${msg.author.id + msg.guild.id}`, 3)
};

  if (db.fetch(`puan_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    
    db.delete(`puan_${msg.author.id + msg.guild.id}`)
    
  };
  
});

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on("message", async message => {
    let afk_kullanici = message.mentions.users.first() || message.author;
    if(message.content.startsWith("-afk")) return; //! yazan yeri kendi botunuzun prefixi ile değiştirin.
  if (message.author.bot === true) return;
    if(message.content.includes(`<@${afk_kullanici.id}>`))
        if(await db.fetch(`afks_${afk_kullanici.id}`)) {
                message.channel.send(`**${client.users.get(afk_kullanici.id).tag}** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${await db.fetch(`afks_${afk_kullanici.id}`)}`)
        }
  
});


client.on('guildMemberAdd', member => {
  let guild = member.guild;

  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('Bir Kisi Sunucumuza Katildi 📥 ')
  .setTimestamp()
  channel.sendEmbed(embed); 
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'giriş-çıkış');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('Sunucumuzdan Bir Kisi Ayrildi📤')
  .setTimestamp()
  channel.sendEmbed(embed); 
});




client.on('guildMemberAdd', async member => {
  //
  let rol = await db.fetch(`otorol_${member.guild.id}`)
  //
  db.fetch(`otorolkanal_${member.guild.id}`).then(async i => {
  const channel = member.guild.channels.get(i)//log ismini ayarlıyacaksınız log adında kanal açın
  if (!i) return;
  //
  let guild = member.guild;
  let otorol = guild.roles.find('name', `${rol || 'Burası böyle kalsın değiştirme!'}`); 
  member.addRole(otorol); 
    channel.send(`**${member}** adlı kullanıcıya \`${rol}\` adlı rol verildi!`)
  }
                                                  )
 
});


client.on('guildMemberAdd', async member => {
    const fs = require('fs');
    let log1 = JSON.parse(fs.readFileSync("././sunucuyaözelayarlar/log.json", "utf8"));
    const logözelkanal = member.guild.channels.get(log1[member.guild.id].mod-log)
    if (!logözelkanal) return;
    const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 |Bir Kişide Sunucuya Katıldı +😁 !')
  .setTimestamp()
  logözelkanal.send(embed)
})

client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});

client.on("guildMemberRemove", async member => {
 
  let gck = await db.fetch(`gckanal_${member.guild.id}`);
  if (!gck) return;
  const gck31 = member.guild.channels.find('name', gck)
  let username = member.user.username;          
  const bg = await Jimp.read("RESİM LİNKİ");
  const userimg = await Jimp.read(member.user.avatarURL);
  var font;
  if (member.user.tag.length < 5) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
  else if (member.user.tag.length > 5) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  await bg.print(font, 240, 235, username);
  await userimg.resize(200, 200);
  await bg.composite(userimg, 257, 20).write("./giris-cikis/gorusuruz.png");
  setTimeout(function () {
    gck31.send(`:outbox_tray:${member.user.tag} adlı kullanıcı sunucudan ayrıldı.`)
    gck31.send(new Discord.Attachment("./giris-cikis/gorusuruz.png"));
  }, 1000);
  setTimeout(function () {
    fs.unlink("./giris-cikis/gorusuruz.png");
  }, 10000);
})


client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "botpaneltemizle") {
 if (!message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Panel ayarlanmamış.")
   if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
    const a = message.guild.channels.find(channel => channel.name === "Bot Kullanımı").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Bellek Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`).delete()
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Kullanıcılar: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`).delete()
      if(!c) return console.log("guildStatsBot")
      const d = message.guild.channels.find(channel => channel.name === `Toplam Kanal: ${client.channels.size.toLocaleString()}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
         const e = message.guild.channels.find(channel => channel.name === `Ping: ${client.ping}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!e) return console.log("guildStatsChannel")
            const f = message.guild.channels.find(channel => channel.name === `Yapımcım: Emirhan Saraç`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!f) return console.log("guildStatsChannel")
               const g = message.guild.channels.find(channel => channel.name === `Kütüphanesi: Discord.js`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!g) return console.log("guildStatsChannel")
      message.channel.send(" Kanallar temizlendi.")
    }
  if (command === "botpanel") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Bot Kullanımı', 'category', [{
  id: message.guild.id,
  deny: ['SPEAK'],
  deny: ['CONNECT']  
}]);
        
 message.guild.createChannel(`Bellek Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Kullanıcılar: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, 'voice')
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Sunucular: ${client.guilds.size.toLocaleString()}  `, 'voice')
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Toplam Kanal: ${client.channels.size.toLocaleString()}`, 'voice')
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Ping: ${client.ping}`, 'voice')
.then(channel =>
                   channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Yapımcım: Rzayev Kenan`, 'voice')
.then(channel =>
                   channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
message.guild.createChannel(`Kütüphanesi: Discord.js`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
  message.channel.send("Bot Bilgi Paneli Ayarlandı!")

        })    
    
}
});


client.on('guildMemberRemove', async member => {
    const fs = require('fs');
    let log1 = JSON.parse(fs.readFileSync("././sunucuyaözelayarlar/log.json", "utf8"));
    const logözelkanal = member.guild.channels.get(log1[member.guild.id].mod-log)
    if (logözelkanal) return;
    const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 |Bir Kişi Sunucudan Ayrıldı +😩')
  .setTimestamp()
  logözelkanal.send(embed)
})

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})



client.on('guildMemberAdd', async (member, guild) => {
  let msj = await db.fetch(`memberSayacGiris_${member.guild.id}`)
  db.fetch(`sayacKanal_${member.guild.id}`).then(kanal => {
  db.fetch(`sayacSayi_${member.guild.id}`).then(i => {
  
    if (!i) return
    if (!kanal) return
    
    if (msj == null) msj = `:inbox_tray: Yeni bir kişi katıldı! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`    
    member.guild.channels.get(kanal).send(msj.replace('{sayac}', `\`${i}\``).replace('{toplamkullanıcı}', `\`${i - member.guild.memberCount}\``))  
})
   }
  )
   }
  
)
   
client.on('guildMemberRemove', async member => { 
  let msj = await db.fetch(`memberSayacCikis_${member.guild.id}`)
  db.fetch(`sayacKanal_${member.guild.id}`).then(kanal => {
  db.fetch(`sayacSayi_${member.guild.id}`).then(i => {
  
    if (!i) return
    if (!kanal) return
    
    if (msj == null) msj = ` Bir kişi kaybettik :frowning: \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`    
    member.guild.channels.get(kanal).send(msj.replace('{sayac}', `\`${i}\``).replace('{toplamkullanıcı}', `\`${i - member.guild.memberCount}\``))  
})
   }
  )
   }
  
)



const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', async member => {
  let davetChannel = await db.fetch(`davetChannel_${member.guild.id}`)
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    
    if (!member.guild.channels.get(davetChannel)) return console.log(`memberLogChannel`)
    else member.guild.channels.get(davetChannel).send(`:inbox_tray: \`${member.user.tag}\` adlı kullanıcı sunucuya katıldı! <@${inviter.id}> tarafından sunucuya davet edildi! [**${invite.uses}** davete sahip!]`)
  });
});





client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :outbox_tray: \`${member.user.tag}\` Kullanıcısı Sunucudan Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :inbox_tray: \`${member.user.tag}\` Kullanıcısı Sunucuya Katıldı! \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz!` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }

});


client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "paneltemizle") {
  if (!message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")) return message.channel.send(" İstatistik ayarlanmamış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      const a = message.guild.channels.find(channel => channel.name === "Sunucu Istatistik").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Üye sayısı: ${message.guild.memberCount}`).delete()
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`).delete()
      if(!c) return console.log("guildStatsBot")
      const d = message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
      message.channel.send(" Kanallar temizlendi.")
    }
  if (command === "panelayarla") {
  if (message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")) return message.channel.send(" Zaten istatistik ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
  message.channel.send(`Kategori ve kanal kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Sunucu İstatistik', 'category', [{
  id: message.guild.id,
  deny: ['CONNECT'],
  deny: ['VIEW_CHANNEL']
}]);

 message.guild.createChannel(`Üye sayısı: ${message.guild.memberCount}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu Istatistik")));
 message.guild.createChannel(`Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")));
message.guild.createChannel(`Kanal sayısı: ${message.guild.channels.size}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Sunucu İstatistik")));
  message.channel.send(" Sunucu paneli ayarlandı!")
        })
}
});

///////////////////////

client.on("guildMemberAdd", member => {

	var channel = member.guild.channels.find("name", "giriş-çıkış");
	if (!channel) return;

	var role = member.guild.roles.find("name", "Üye");
	if (!role) return;

	member.addRole(role); 

	channel.send(member + " artık " + role + " rolü ile aramızda");

	member.send("Aramıza hoş geldin! Artık @Üye rolüne sahipsin!")

});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
 
// Sunucuya birisi girdiği zaman mesajı yolluyalım
 
 
 
 
// Sunucuya birisi girdiği zaman mesajı yolluyalım
 
 
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RANDOM")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. \`${sayac[member.guild.id].sayi}\` Kişi Olmamıza \`${sayac[member.guild.id].sayi - member.guild.memberCount}\` Kişi Kaldı \`${member.guild.memberCount}\` Kişiyiz! :x: **${member.user.tag}**`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: :inbox_tray: Kullanıcı Katıldı! **${sayac[member.guild.id].sayi}** Kişi Olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz! ${process.env.basarili} Hoşgeldin! **${member.user.tag}**` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
///////////////////

client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("532675168233979914", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'test') {
    msg.channel.send('**<:test:621475241155362816>**');
  }
});



client.on('message', msg => {
  if (msg.content.toLowerCase() === 'göktürk') {
    msg.channel.send('**Ne Var Arkadasim ?**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-yardim') {
    msg.react('🌐');
  msg.channel.sendMessage('**`yardim` adında Komut Yok Malesef❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-js') {
        msg.member.addRole("⚔User's")
    msg.reply('Js Rolünü Başarıyla Aldın.');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-ekstra') {
    msg.channel.sendMessage('**`ekstra` adında komut Yok Malesef❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'g-destek') {
    msg.react('✅');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'g-temizle') {
    msg.react('✅');
  }
});



client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selam') {
    msg.react('❤');
    msg.channel.sendMessage('**Aleykum Selam , Kardesim Hos Geldin💙💕**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-müzik') {
    msg.react('✅');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '<@312307937949384715>') {
    msg.reply('**Soyle Bana , Ben ona Iletirim ❣❤**');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === '-yardım') {
    msg.react('⏪');
    msg.react('⏩');
    msg.channel.sendMessage('');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'prefix') {
    msg.channel.sendMessage('**✅Prefixim = (g-)✅**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-çal') {
    msg.react('✅');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-fast') {
    msg.reply('**⚠️HATA Siz Eger Fast Rainbow Istiyorsanizsa Bunun Icin Awea Premium Lazim❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
    msg.delete(30)
    msg.channel.sendMessage('**Kufur Engellenmisdir ❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'oç') {
    msg.delete(30)
    msg.channel.sendMessage('**Kufur Engellenmißdir ❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'mk') {
    msg.delete(30)
    msg.channel.sendMessage('**Kufur Engellenmisdir ❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === "oc") {
    msg.delete(30)
    msg.channel.sendMessage('**Kufur Engellenmißdir❌**');
    msg.delete()
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'mal') {
    msg.delete(30)
    msg.channel.sendMessage('**Küfür Engellenmißdir❌**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-desteksunucu') {
    msg.channel.sendMessage('https://discord.gg/2PZNCEa');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-sayfalıyardım') {
    msg.react('✅');
  }
});





client.on('message', msg => {
  if (msg.content.toLowerCase() === '@everyone') {
    msg.channel.sendMessage('*Neden Çagirdin Bizi ?*');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'g-') {
    msg.channel.sendMessage('**O Benim Prefixim !**');
    
  }
});



client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ok') {
    msg.channel.sendMessage('**Ne oku  Sora Bilirmiyim😊**');
  }
});







client.on('message', message => {
if (message.content === '<@5027836837076664>') {
  const embed = new Discord.RichEmbed()
  .setTitle('Awea:')
  .setDescription('Prefixim: `g-`')
  .setFooter('Awea')
  .setColor('RANDOM')
 message.reply(embed)
}
});



client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("532675168233979914", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});


client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react("<:as:503505311248941086>");
    msg.react("<:HG:503505409999372288>");
  }
  });

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    if (command === "espri") {
    
    var request = require('request');
    request('https://api.eggsybot.xyz/espri', function (error, response, body) {
    if (error) return console.log('Hata:', error); // Hata olursa, konsola göndersin,
    else if (!error) { // Eğer hata yoksa;
        var info = JSON.parse(body); // info değişkeninin içerisine JSON'ı ayrıştırsın,
        message.channel.send('**Espri**: ' + info.soz); // ve konsola çıktıyı versin.
    }
});    
}
}); 

client.on("message", message => {

    if (message.content === prefix + "bilgi") {
        const embed = new Discord.RichEmbed()

            .addField("Bot Sahibi", `<@459621456612032513> <@478960334200111105>`, true)

            .addField("Version", "1.0.6", true)
            .addField("Botun Yapılma Tarihi", "2018.09.21")
            .addField("Botun Davet Linki" , "[Beni Davet Et](https://discordapp.com/oauth2/authorize?client_id=502783683707666433&scope=bot&permissions=805314622)")
            .addField("Destek Sunucusu" , "[Destek Sunucusu](https://discord.gg/2PZNCEa)")

            .addField("Toplam Sunucu Sayısı", client.guilds.size, true)

            .addField("Toplam Kullanıcı Sayısı", client.users.size, true)
            
            .addField("Toplam Kanal Sayısı", client.channels.size, true)
         
            .addField("⏲ Gecikme", "185ms")

            .addField("Kitaplık Türü", "discord.js")

            .setColor('RANDOM')
        
        return message.channel.sendEmbed(embed)
    }

    if (message.content === prefix + "kurabiye") {
        message.channel.sendMessage(`Canım gel buraya sana kurabiye vereceğim! <@${message.author.id}>`)
        message.react("🍪")
    }

});



client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "sniper") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. Biraz zaman Alabilir⏲").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2FPNGPIX-COM-Crosshair-PNG-Transparent-Image.png?1529363625811", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});



client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "kralol") {
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        message.channel.send(":loudspeaker: | **Kralol** Çerçevesi Uygulanıyor!").then(m => m.delete(1000));
        await message.channel.send(`**${message.author.tag}** artık kral oldun!`)
        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(310, 325)
            Jimp.read("https://cdn.discordapp.com/attachments/501247440054124550/508237135178891264/kral.png", (err, avatar) => {
                avatar.resize(310, 325)
                image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                }, 1000);
            });

        });
    }
});

var request = require('request');







client.on("channelCreate", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'mod-log');
	if (!logs) return console.log("#mod-log Kanalı Bulunamadı!");
	const cembed = new Discord.RichEmbed()
		.setTitle("Kanal Oluşturuldu! ⚠")
		.setColor("RANDOM")
		.setDescription(`**${channel.name}** Kanalı Oluşturuldu! ✅`)
		.setTimestamp(new Date());
	logs.send(cembed)
});

client.on("channelDelete", async channel => {
	var logs = channel.guild.channels.find(c => c.name === 'mod-log');
	if (!logs) return console.log("#mod-log Kanalı Bulunamadı!");
	const cembed = new Discord.RichEmbed()
		.setTitle("Kanal Silindi! ⚠")
		.setColor("RANDOM")
		.setDescription(`**${channel.name}** Kanalı Silindi ✖`)
		.setTimestamp(new Date())
	logs.send(cembed)
});




client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "wasted") {
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${client.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./img/wasted/${client.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    }
});




//////////////////////////becerdim

client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + "futboloyna") {
msg.channel.send(':soccer :soccer: :goal: :soccer')
.then (nmsg => nmsg.edit(':soccer: :goal: :soccer:'))
.then(nmsg => nmsg.edit(':soccer: :goal: :goal:'))
.then(nmsg => nmsg.edit(':soccer: :goal: :soccer:'))
.then(nmsg => nmsg.edit(':soccer: :goal:'))
.then(nmsg => nmsg.edit('**Güzel Maçtı Bro Bidaha Oynayalım :)**'));
}
});


client.on('message', message => {
if (message.content.toLowerCase() === prefix + "özlüsöz") {
    var sans = ["Affetmek geçmişi değiştirmez ama geIeceğin önünü açar","İnsanIar seninIe konuşmayı bıraktığında, arkandan konuşmaya başIarIar","Hayattan korkmayın çocuklar;iyi ve doğru bir şeyler yaptığınız zaman hayat öyle güzel ki","Mutluluğu tatmanın tek çaresi, onu paylaşmaktır.","Küçük şeylere gereğinden çok önem verenler, elinden büyük iş gelmeyenlerdir.","Bize yeni düşmanlar lazım. Eskileri hayranımız oldular.","Asla vazgeçmeyin, kaybedenler yalnızca vazgeçenlerdir.","10 kilitli kapıdan daha güvenlidir babanın evde oluşu.","Sevmek için “yürek” sürdürmek için “emek” gerek.","Bir insanın, bir insana verebileceği en güzel hediye; ona ayırabileceği zamandır."," Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.","Kendini Ne Kadar Büyük Görürsen Gör. Bende Sadece Gözümün Gördüğü Kadarsın. Ötesi yok.","Mutlu olmayı yarına bırakmak, karşıya geçmek için nehrin durmasını beklemeye benzer ve bilirsin, o nehir asla durmaz.– Grange"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
      .addField(`¡ ¡ ¡ ¡ ¡ `, `${sonuc}`)
      .setColor("RANDOM");
    return message.channel.sendEmbed(embed);
}
});

/////////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async member => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
  
  const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
   
            const bg = await Jimp.read("https://i.postimg.cc/LXrHDVJC/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        let hgm = JSON.parse(fs.readFileSync("./jsonlar/hgm.json", "utf8"));
    const hgmK = member.guild.channels.get(hgm[member.guild.id].gkanal)
    var kullanici = member.tag
    var sunucu = member.guild.name
    hgmK.send(`${gc[member.guild.id].mesaj}`)
    })
client.on("guildMemberRemove", async member => {
const fs = require('fs');
let gc = JSON.parse(fs.readFileSync("./jsonlar/gc.json", "utf8"));
    const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
    if (!hgK) return;
        let username = member.user.username;
         
                        const bg = await Jimp.read("https://i.postimg.cc/zGJqxvfr/guild-Remove.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        
    })
//XiR


////////////////////////


const GIFEncoder = require('gifencoder');
client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
    if (message.content.toLowerCase() === prefix + "trigger") {
        const options = {
            size: 256,
          
            frames: 16
        }

        message.channel.send("İşleniyor.. Lütfen bekleyiniz. ⏲").then(m => m.delete(1000));

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const args = message.content.split(' ').slice(1);
        let member = message.mentions.users.first()
        if (args[0] === undefined) member = message.author;
        let avatarurl = member.avatarURL;
        if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
            avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
        }
        const base = new Jimp(options.size, options.size);
        const avatar = await Jimp.read(avatarurl);
        const text = await Jimp.read('https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410');
        const tint = await Jimp.read('https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373');
        avatar.resize(320, 320);
        tint.scaleToFit(base.bitmap.width, base.bitmap.height);
        tint.opacity(0.2);
        text.scaleToFit(280, 60);
        const frames = [];
        const buffers = [];
        const encoder = new GIFEncoder(options.size, options.size);
        const stream = encoder.createReadStream();
        let temp;
        stream.on('data', async buffer => await buffers.push(buffer));
        stream.on('end', async () => {
            return await message.channel.send({
                files: [{
                    name: 'notechtriggered.gif',
                    attachment: Buffer.concat(buffers)
                }]
            });
        });
        for (let i = 0; i < options.frames; i++) {
            temp = base.clone();
            if (i === 0) {
                temp.composite(avatar, -16, -16);
            } else {
                temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
            }
            temp.composite(tint, 0, 0);
            if (i === 0) temp.composite(text, -10, 200);
            else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));
            frames.push(temp.bitmap.data);
        }
        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        for (const frame of frames) {
            encoder.addFrame(frame);
        }
        encoder.finish();
    }
});



client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  console.log(`${guild.name} with invite: https://discord.gg/7CaA6TH`)
});



////////////////////////
// Müzik Komutu // // API KODU DC DE //

const { GOOGLE_API_KEY } = require('./anahtarlar.json');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require('ytdl-core');

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
    .setDescription('**Müzik Dinlemek Icin Sesli Kanala Baglanin⚠️**.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('**Müzik dinlemek icin Sesli Kanala Baglanin⚠️**.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('**Müzik Dinlemek Icin Mikrofonumu Açin❗**'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.RichEmbed)
      .setTitle(`**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.sendEmbed(new Discord.RichEmbed()                  
         .setTitle('Göktürk | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('🎵| **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.sendEmbed(new Discord.RichEmbed()
          .setColor('0x36393E')
          .setDescription('<🎵 | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<🎵 | **Lütfen öncelikle sesli bir kanala katılınız**.'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<🎵 | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<🎵** | Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<🎵**| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription('<🎵**| Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<🎵 | **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('RANDOM'));                             
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<🎵 | **Çalan Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("Göktürk | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("🎵| **Sırada Müzik Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
     .setTitle('Göktürk Bot | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'dur') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(" ⏸ Müzik Senin İçin Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send('<🎵| Çalan Müzik Bulunmamakta');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("▶️ Müzik Senin İçin Devam Etmekte!")
      .setColor('RANDOM'));
		}
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle("<🎵 ** | Çalan Müzik Bulunmamakta.**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(` **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`**Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(` **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '<⬆️| **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
  .setTitle("**Göktürk | 🎙 Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}

//////////////////



/////////////////////////////////////////////////////////////////////////////////////////
client.tr = require('./tr.js');
client.en = require('./en.js');

client.on("message", async message => {
  
  let client = message.client;
  
  const ayarlar = client.ayarlar
  
  //if (!client.users.get(client.user.id).hasPermission("SEND_MESSAGES")) return message.reply(`Yeterli izinlere sahip değilim! \n**İhtiyacım Olan Yetki:** \n\`Mesaj Gönder\``)

  if (!message.guild) return;

  let prefix;
  

   const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const p = String(message.content.match(prefixMention));
  
  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
   } else
    if (client.english.has(command)) {
    cmd = client.english.get(command);
    }
  
  var dill = 'tr'
    if(db.has(`dil_${message.guild.id}`) === true) {
        var dill = 'en'
    }
    const dil = client[dill]
  
  db.add(`sunucuxp_${message.guild.id}`, 1)
  
  var y = db.fetch(`sunucuxp_${message.guild.id}`);
  
  if (y === 50) {
    db.set(`premium_${message.guild.id}`, "aktif")
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Tebrikler ${message.guild.name}!`)
    .setDescription(`Sunucu Puanı başarıyla **${y}** puana ulaştı! Premium mod aktif edildi!`)
    message.channel.send(e)
    message.guild.owner.send(e)
  }
  
  if (cmd) {
    
    if (db.has(`karalist_${message.author.id}`) === true) {
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sen botun komutlarını kullanamazsın! Çünkü botun kara listesindesin!")
    message.channel.send({embed: embed})
    message.react("😡")
    return
  };
    
    //if (ayarlar.sahip.includes(message.author.id)) return;
    
    if (cmd.conf.enabled === false) {
      if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.official_sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
					.setDescription(`Bu komut şuanda sunucularda kullanıma kapalıdır! (Yapım aşamasındadır)`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
      }
    }
    
    if (cmd.conf.bakim === false) {
      //if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.official_sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
					.setDescription(`Bu komut bakımdadır.`)
					.setColor("RANDOM")
				message.channel.send({embed})
				/*return
      }*/
    }
    
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES") & !ayarlar.official_sahip.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Mesajları Yönet iznine sahip olmalısın!`)
          .setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS") & !ayarlar.official_sahip.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Üyeleri At iznine sahip olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS") & !ayarlar.official_sahip.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Üyeleri Yasakla iznine sahip olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR") & !ayarlar.official_sahip.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Yönetici iznine sahip olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.official_sahip.includes(message.author.id)) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu sadece Bot Sahibi kullanabilir!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
    
    cmd.run(client, message, args, dil, dill);
    
  }
  
});
///////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", msg => {
  
  
  db.fetch(`kufur_${msg.guild.id}`).then(i => {
    if (i == 'acik') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir. Küfür Etmene İzin Veremem !').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {  
    }
    if (!i) return;
  })
    });
///////////////////////////////////gold,üye
var sak = ["sa","merhaba","ben geldim"]
client.on("message", message => {
  db.fetch(`gold_${message.author.id}`).then(i => {
  if(!i) return;
 if(sak.some(s => message.content.toLowerCase() ===s)) return message.channel.send(`:diamond_shape_with_a_dot_inside: \`${message.author.username}\` Gold Üye Geldi Dağılın! :diamond_shape_with_a_dot_inside: `)
})})
///////////////////////////////////////////

////////////////////////////////////////////////////XİR///////////////////////////////////////////////////////////




////////////////////////////////////////////////////XİR///////////////////////////////////////////////////////////
client.on("message",message => {
  if(!message.author.bot) return;
  db.fetch(`usohbet_${message.channel.id}`).then(usdurum => {
    if(!usdurum || usdurum === 'pasif') return;
    else {
      message.delete(5000)
    }
})})
///////////////////////////otorol/////////////////////////////////////////////

client.on('guildMemberAdd', async (member, guid , message) => {
  
  
  let role = await db.fetch(`otorolisim_${member.guild.id}`)
  let otorol = await db.fetch(`autoRol_${member.guid.id}`)
  let d = await db.fetch(`otorolkanal_${member.guild.id}`)
  if (!otorol || otorol .toLowerCase() === 'yok') return;
  else {
  try {
    
  if (!d) return 
    member.addRole(member.guild.role.get(otorol))
        var embed = new Discord.RichEmbed()
         .setDescription(`Sunucuya Yeni Katılan ${member.user.tag} Kullanıcısına ${role} Rölü Verildi`)
         .setColor('RANDOM')
        .setFooter('GökTürk Bot')
        member.guild.channels.get(d).send(embed) } catch (e) {
          console.log(e)
          
        }
  }


});
//////////////////////////otorol/////////////////////////
client.on("message", async msg => {
  
  
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('Aleyküm Selam, Hoşgeldin')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  
    });
///////////////////////////////////////////////


client.on("message", async message => {
  if(message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  if(!(await db.fetch(`seviyeSistemi_${message.guild.id}`))) return;
  var id = message.author.id;
  var gid = message.guild.id;
  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if(!lvl) {
    db.set(`xp_${id}_${gid}`, 5);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    var random = Math.random() * (8 - 3) + 3;
    db.add(`xp_${id}_${gid}`, random.toFixed());
    console.log(xp);
    
    if(xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(`xpToLvl_${id}_${gid}`, await db.fetch(`lvl_${id}_${gid}`) * 100);
      var lvl = await db.fetch(`lvl_${id}_${gid}`);
      message.channel.send("Tebrikler, " + message.author + ". Seviye atladın! Yeni seviyen: **" + lvl + "**");
      var role = message.guild.roles.get(await db.fetch(`role_${gid}_${lvl}seviye`));

      if(!role) return;
      else {
        message.member.addRole(role);
        message.channel.send("Tebrikler! **" + lvl + "** seviye olarak @" + role.name + " rolünü kazandınız.");
      }
    } 
  }
});
////////////////////////////////////////////////////////////

const antispam = require("discord-anti-spam-tr");

let spamEngel = JSON.parse(fs.readFileSync("././ayarlar/anti-spam.json", "utf8"));

client.on("message", msg => {
  if (!msg.guild) return;
  if (!spamEngel[msg.guild.id]) return;
  if (spamEngel[msg.guild.id].spamEngel === 'kapali') return;
    if (spamEngel[msg.guild.id].spamEngel=== 'acik') {

//Bot Ana Dosyasına Atınız.

antispam(client, {
  uyarmaSınırı: 20,
  banlamaSınırı: 20, 
  aralık: 300000, 
  maxSpamUyarı: 20,
  maxSpamBan: 20,
  zaman: 7,
  rolİsimi: "anti-spam-susturma"

});
    }
})



const { promisify } = require('util')

client.config = require("./config.js")
client.logger = console
client.wait = promisify(setTimeout)
client.ayar = db

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

const botadibotkoruma = "AlphaTurk"
client.on('guildMemberAdd', (member, msg) => {
  const message = member
  let krma = db.get(`botkoruma_${message.guild.id}`)
  if(!krma) return false;
  if(krma) {
    if(krma === "botkorumaaktifysfdızolarınamk") {
    const guild = member.guild;
  let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`**${botadibotkoruma} Bot Koruma Sistemi**
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone :warning: `)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
      member.ban(member)
    }
    } else return false;
    } else return false;
});

//////////////özeldengöürüşürüz
client.on('guildMemberRemove', async member => {
  let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`)
  if (!ozelgorusuruz) return;
  member.send(ozelgorusuruz ? ozelgorusuruz.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})
//////////////////////////////
///////////özelden hoşgeldin
client.on('guildMemberAdd', async member => {
  let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`)
  if (!ozelhosgeldin) return;
  member.send(ozelhosgeldin ? ozelhosgeldin.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})
/////////////////////////////
///////////////////////////



module.exports = async member => {

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
    rolk2.send(`**${member.user.tag}** adlı kullanıcıya **${rol2.name}** rolü verildi.`)
  }
  
  if (botrol) {
    if (member.user.bot) {
      member.addRole(botrol2)
      member.removeRole(rol2)
      rolk2.send(`**${member.user.tag}** adlı bota **${botrol2.name}** rolü verildi.`)
    }
    if (!member.user.bot) {
      member.addRole(rol2)
      rolk2.send(` **${member.user.tag}** adlı kullanıcıya **${rol2.name}** rolü verildi.`)
    }
  }
};


//////////////////////////////
////////////////////////
client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164413318168606/Adsz.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   


  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'STARKs-güvenlik.png');
    chan.send(attachment)
});
////////////////////
const İnvites = {};
const Wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
client.on('guildMemberAdd', member => {
let davetlog = JSON.parse(fs.readFileSync('ayarlar/davetlog.json', 'utf8'));
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
const embed = new Discord.RichEmbed()
.setDescription(`${member.user.username} Sunucuya katıldı! \n Davet Eden Kişi: \n<@${inviter.id}> \n Toplam:( **${invite.uses}** Davet ) `)
.setColor("1ED760")
.setThumbnail(member.user.avatarURL)

  member.guild.channels.find("id", davetlog[member.guild.id]).send({
    embed
  });
  })
})
client.login(ayarlar.token);
    