const Discord = require('discord.js');

exports.run = async(client, message, args, ops) => {

 await message.delete().catch(O_o => {});

    const color = args[0]
const text = args.slice(1).join(" ");
const error = new Discord.RichEmbed()
.setColor("RED")
.setDescription("**Please write more than 10 words to make a real Changelog**")
.setTimestamp()
if (text.length < 10) return message.channel.send(error).then(msg => {msg.delete(10000)});;
//const colour = args.slice(2).join("");
const embed = new Discord.RichEmbed()
.setColor("GREEN")
.setTitle("Changelog:")
.setDescription(text);
message.channel.send("@everyone")
message.channel.send({embed})
}