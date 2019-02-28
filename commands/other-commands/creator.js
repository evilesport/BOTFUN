const Discord = module.require("discord.js");

let ccreator = ("Ich#3236");

let ccommunity = ("The entire beautiful community!");

let chosting = ("TownHosting by Ich.");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
	let embed = new Discord.RichEmbed()
        .setColor("#9B59B6")
        .setThumbnail(bicon)
        .addField("Maker:", ccreator)
        .addField("Idea's:", ccommunity)
        .addField("Server Hosting", chosting)


        message.member.send({embed: embed});
}

module.exports.help = {
	name: "credits"
}