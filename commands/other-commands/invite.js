const Discord = require("discord.js");
const moment = require('moment');

exports.run = async (anko, message, args) => {
  await message.delete().catch(O_o => {});
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let sicon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
    .setColor('BLUE')
    .setThumbnail(sicon)
    .setAuthor(`Invite request from ${message.author.tag}`, message.author.displayAvatarURL)
    .setFooter(`Invite Created at • ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
    .addField(`**Permanent Invite Link**:`, `${invite}`);
    message.member.send(embed);
  
   let replyembed = new Discord.RichEmbed()
   .setColor('ORANGE')
   .setDescription(`Please look in your DM's ${message.author.username}!`)
   message.channel.send(replyembed).then(msg => {msg.delete(10000)});

  });
}

exports.help = {
  name: 'createinvite',
}