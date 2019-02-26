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
   .setFooter(`Timestamp`)
   .setTimestamp()
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .setTitle('Log help')
   .addField('How work this command?', 'This command was created to log a channel. When you log a channel nobody can write an message in that channel.')
   .addField('How can i log a channel?', 'When you write !log <time duration> the channel will log for the specific time duration and unlog after your Time duration.')
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