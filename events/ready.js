const Discord = require("discord.js")


module.exports = bot => {
    bot.user.setStatus('dnd')
     console.log(`${bot.user.username} is online`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

    let statuses = [
        `${bot.guilds.size} server!`,
        `!!help`,
        `your commands`,
 //     `made by ICH#3236`
 //     `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "LISTENING"});

    }, 2500)
    }