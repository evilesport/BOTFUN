const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  await message.delete().catch(O_o => {});
  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
  let ich = ("Ich#3236");
   let sicon = message.guild.iconURL;
  
   let channel2embed = new Discord.RichEmbed()
   .setColor('BLUE')
   .setDescription(`**Please check your DM's ${message.author}**`) 

   message.channel.send(channel2embed).then(msg => {msg.delete(5000)});

   let error2embed = new Discord.RichEmbed()
   .setColor('RED')
   .setDescription(`If you didn't got an DM please write **${ich}** a message! `)
   message.channel.send(error2embed).then(msg => {msg.delete(10000)});

   let userembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(` Server created date • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .setTitle('All our server commands')
   .addField('Commands', 'Use this !h<command name> with your Command tag you see under me')
   .addField('My Commands', '!invite, !serverinfo, !report, !support,!welcomeroles, !doggo, !meow')
   .addField('Info', 'If you need help with one of these commands please write **Ich#3226**')
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.member.send(userembed)


   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(` Server created date • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .setTitle('All our server commands')
   .addField('Commands', 'Use this !h<command name> with your Command tag you see under me')
   .addField('My Commands', '!ban, !kick, !tmute, !mute, !invite, !log, !poll, !invite, !serverinfo, !report, !support, !verify, !welcomeroles, !unmute, !purge')
   .addField('Info', 'If you need help with one of these commands please write **Ich#3226**')
   message.member.send(serverembed);



}