const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  await message.delete().catch(O_o => {});
  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
  let ich = ("Ich#3236");
  let Example = (" Example picture **1/2**")
  let pic2 = (" Example picture **2/2**")  
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(` Server created date • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setTitle('Report help')
   .addField('How can I report someone?', 'Just type !report <@User> <Reason> and you report someone.')
   .addField(`Info`, `If you need help with one of these commands please write **${ich}**`)
   message.member.send(serverembed)

   let example = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setColor("#7289DA")
   .setImage('https://cdn.discordapp.com/attachments/545621788093054986/547768371765313548/Screenshot_1.png')
   .setDescription(`${Example}`)
   message.member.send(example)

   let example2 = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setColor("#7289DA")
   .setImage('https://cdn.discordapp.com/attachments/545621788093054986/547768376211144704/Screenshot_2.png')
   .setDescription(`${pic2}`)
   message.member.send(example2)

   let channelembed = new Discord.RichEmbed()
   .setColor('BLUE')
   .setDescription(`**Please check your DM's ${message.author}**`) 

   message.channel.send(channelembed).then(msg => {msg.delete(5000)});

   let errorembed = new Discord.RichEmbed()
   .setColor('RED')
   .setDescription(`If you didn't got an DM please write **${ich}** a message! `)
   message.channel.send(errorembed).then(msg => {msg.delete(10000)});
   }