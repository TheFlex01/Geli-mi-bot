const Discord = require('discord.js');
module.exports.run = async (client, msg, args) => {

    let kayit = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
    if (!kayit) return msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: (" <a:531853419187798026:536338475369365524> **Yanliş Kullanım <a:531853419187798026:536338475369365524>. Doğru Kullanım `-kaydol @Kendini Etiketle`**")
        }
    })

    let role = msg.guild.roles.find(r => r.name === "『💲』Memember『💲』");
    if (!role) {
        try {
            role = await msg.guild.Role({
            });

            msg.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    
                });
            });
        } catch (e) {
            console.log(e.stack);
        }

    }

    if (kayit.roles.has(role.id)) return msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: ("**Onceden Kayit Olmusşun <a:531853419187798026:536338475369365524> **")
        }
    });

    await kayit.addRole(role);
    msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0xFFFFFF + 1)),
            description: ("**<a:531853512435302410:536334688776880128> Tebrikler. Kayit Oldunuz<a:531853512435302410:536334688776880128>  **!")
        }
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kaydol'],
    permLevel: 0
};

exports.help = {
    name: 'kaydol',
    description: 'Sunucuya kayÄ±t olursunuz!',
    usage: 'kaydol'
};
    