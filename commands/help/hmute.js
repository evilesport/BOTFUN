const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  await message.delete().catch(O_o => {});
  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
  let ich = ("Ich#3236"); 
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(` Server created date • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .setTitle('Mute help')
   .addField('How work this command?', 'This command was create to mute user for a limited time duration.')
   .addField(`How can i mute somebody?`, `Just type !mute <@User> <Time duration> and the Bot will give that specific user a role, after the user have this role that user can't write or do other chat things!`)
   .addField('How can i unmute somebody?', `If you make a mistake with the mute you can write !unmute <@User> <reason for the unmute> and the bot unmute that user!`)
   .addField(`Info`, `If you need help with one of these commands please write **${ich}**`)
   message.member.send(serverembed);
   
   let channelembed = new Discord.RichEmbed()
   .setColor('BLUE')
   .setDescription(`**Please check your DM's ${message.author}**`) 

   message.channel.send(channelembed).then(msg => {msg.delete(5000)});

   let errorembed = new Discord.RichEmbed()
   .setColor('RED')
   .setDescription(`If you didn't got an DM please write **${ich}** a message! `)
   message.channel.send(errorembed).then(msg => {msg.delete(10000)});
   }