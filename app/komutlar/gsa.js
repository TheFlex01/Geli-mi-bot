const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
 let ok = await db.fetch(`giriscikis_${message.guild.id}`);
  let ozelkomut;
  if (ok == null) ozelkomut = 'Ayarlanmamış!'
  else ozelkomut = `${ok}`
   message.channel.send(ok)
    }

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'girişçıkışkontrol',
description: 'neblm',
usage: 'yardım'
};