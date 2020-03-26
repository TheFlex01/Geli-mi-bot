const Discord = require('discord.js')
const db = require("quick.db")
exports.run = async (client, message, args) => {
var kim;
if(message.mentions.users.first()) kim = message.mentions.users.first()
else if(isNaN(args[0])) kim = client.users.get(args[0])
var ne = args[1]
if(!ne) return message.channel.send(":x: | `aç` veya `kapat` yaz")
if(ne === "aç") {
db.set(`gold_${kim.id}`, "aktif")
message.channel.send(":white_check_mark: | **" + kim.tag + "** adlı kullanıcı için gold aktif!")
} else if(ne === "kapat") {
db.delete(`gold_${kim.id}`)
message.channel.send(":white_check_mark: | **" + kim.tag + "** adlı kullanıcı için gold kapalı!")
} else return message.channel.send(":x: | `aç` yada `kapat` yaz")
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 4
}
exports.help = {
    name: 'gold',
    description: 'Ritarary Code Sunucusuna Aittir.',
    usage: ""
}