const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args, level) => {

let Timer = args[0];

if(!args[0]){
  return message.channel.send("Please enter a period of time, with either `s,m or h` at the end!");
}

if(args[0] <= 0){
  return message.channel.send("Please enter a period of time, with either `s,m or h` at the end!");
}

message.channel.send(":white_check_mark: Timer has been set for: " + `${ms(ms(Timer), {long: true})}`)

setTimeout(function(){
  message.channel.send(`Timer has ended, it lasted: ${ms(ms(Timer), {long: true})}` + message.author.toString())

}, ms(Timer));
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "timer",
  category: "Miscelaneous",
  description: "Sets a timer",
  usage: "timer"
};