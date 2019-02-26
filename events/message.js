const Discord = require('discord.js')
const { prefix } = require('../config');
const fs = require('fs');
const client = new Discord.Client();
const db = require("quick.db");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 5;

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

   cmd.run(client, message, args);

   let coins = require("../coins");
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

let xp = require("../xp.json");
let xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}


let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 300;
xp[message.author.id].xp =  curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;
  let lvlup = new Discord.RichEmbed()
  .setTitle("Level Up!")
  .setColor('PURPLE')
  .addField("New Level", curlvl + 1);

  message.channel.send(lvlup).then(msg => {msg.delete(5000)});
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if(err) console.log(err)
});

bot.on("channelCreate", async channel => {
  var logs = channel.guild.channels.find(c => c.name === 'logs');
  if (!logs) return console.log("Can't find logs channel.");
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Created")
      .setColor("YELLOW")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
      .setTimestamp(new Date());
  logs.send(cembed)
})

bot.on("channelDelete", async channel => {
  var logs = channel.guild.channels.find(c => c.name === 'logs');
  if (!logs) return console.log("Can't find logs channel.");
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Deleted")
      .setColor("YELLOW")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
      .setTimestamp(new Date())
  logs.send(cembed)
})

const serverStats = {
  guildID: '541573048751489044',
  ticketCategoryID: '544617780767358996'
 
 }
 
 
 //It's not a command, just send a DM for bot and... 
 
 client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type !== 'text') {
      let active = await db.fetch(`support_${message.author.id}`);
      let guild = client.guilds.get(serverStats.guildID);
      let channel, found = true;
      try {
          if (active) client.channels.get(active.channelID)
              .guild;
      } catch (e) {
          found = false;
      }
      if (!active || !found) {
          active = {};
          channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`)
          channel.setParent(serverStats.ticketCategoryID)
          channel.setTopic(`/complete to close the ticket | Support for ${message.author.tag} | ID: ${message.author.id}`)
 
          channel.overwritePermissions("542378006241607680", { //Role id (when someone join my server get this role with id <<, i dont know how to change it for @everyone. This will prevent users to see the channel, only admins will see!
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
          });
 
 
 
          let author = message.author;
          const newChannel = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setAuthor(author.tag, author.avatarURL)
              .setFooter('Support Ticket Created!')
              .addField('User', author)
              .addField('ID', author.id)
          await channel.send(newChannel);
          const newTicket = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setAuthor(`Hello, ${author.username}`, author.avatarURL)
              .setFooter('Support Ticket Created!')
          await author.send(newTicket);
          active.channelID = channel.id;
          active.targetID = author.id;
      }
      channel = client.channels.get(active.channelID);
      const dm = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(`Thank you, ${message.author.username}`, message.author.avatarURL)
          .setFooter(`Your message has been sent - A staff member will be in contact soon.`)
      await message.author.send(dm);
      if (message.content.startsWith(prefix + 'complete')) return;
      const embed5 = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(message.content)
          .setFooter(`Message Received - ${message.author.tag}`)
      await channel.send(embed5);
      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
  }
  let support = await db.fetch(`supportChannel_${message.channel.id}`);
  if (support) {
      support = await db.fetch(`support_${support}`);
      let supportUser = client.users.get(support.targetID);
      if (!supportUser) return message.channel.delete();
      if (message.content.toLowerCase() === '/complete') {
          const complete = new Discord.RichEmbed()
              .setColor('RANDOM')
              .setAuthor(`Hey, ${supportUser.tag}`, supportUser.avatarURL)
              .setFooter('Ticket Closed -- Nebulous')
              .setDescription('*Your ticket has been marked as complete. If you wish to reopen it, or create a new one, please send a message to the bot.*')
          supportUser.send(complete);
          message.channel.delete();
          db.delete(`support_${support.targetID}`);
          let inEmbed = new Discord.RichEmbed()
              .setTitle('Ticket Closed!')
              .addField('Support User', `${supportUser.tag}`)
              .addField('Closer', message.author.tag)
              .setColor('RANDOM')
          const staffChannel = client.channels.get('544618059630116874'); //Create a log channel and put id here
          staffChannel.send(inEmbed);
      }
      const embed4 = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setFooter(`Message Received - Nebulous`)
          .setDescription(message.content)
      client.users.get(support.targetID)
          .send(embed4);
      message.delete({
          timeout: 10000
      });
      embed4.setFooter(`Message Sent -- ${supportUser.tag}`)
          .setDescription(message.content);
      return message.channel.send(embed4);
  }
 })

 bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
}

client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  console.log(`Joined a new guild named: ${guild.name} with invite: https://discord.gg/${invite.code}`)
});

client.on("guildCreate", guild =>{
  console.log(`Evil is now part of the  ${guild.name}, ${guild.id} and count on ${guild.memberCount} new members.`);
  if (!fs.existsSync(`${guild.id}`)){
    fs.mkdirSync(`${guild.id}`);
 }
});


client.on('guildMemberAdd', member => {
  let logschannel = member.guild.channels.find(`name`, "logs");
  console.log(`${member.user.username} is now part of guid and had his account created.`);
  var filepath = `${member.guild.id}/${member.user.id}.json`;
  if (fs.existsSync(filepath)) {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.username} is a former member and is back to (o) ${member.guild}.`,`${member.user.avatarURL}`)
    .setColor(`RANDOM`)
    logschannel.send(embed);
  }
  else{
  var fileContent = `{`+`\n"nome":"${member.user.username}",\n"id":"${member.user.id}",\n"avatar":"${member.user.avatarURL}",\n"descricao":"descricao padrao",\n"avisos":"0",\n"contribuicao":"0"\n\n`+`}`;
  var filepath = `${member.guild.id}/${member.user.id}.json`;
  fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
  });
  const embed = new Discord.RichEmbed()
  .setAuthor(`${member.user.username} is a new member of the ${member.guild}.`,`${member.user.avatarURL}`)
  .setColor(`RANDOM`)
  logschannel.send(embed);
  }
});

 })};