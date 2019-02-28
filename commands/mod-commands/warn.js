const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const settings = require('../../config.js');
exports.run = async (client, message, args) => {

 await message.delete().catch(O_o => {});

  const user = message.mentions.users.first();
  const modlog = client.channels.find('name', 'logs');
  const caseNum = await caseNumber(client, modlog);
  if (!modlog) return message.reply('I cannot find a logs channel');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;

  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn [mention] [reason]'
};