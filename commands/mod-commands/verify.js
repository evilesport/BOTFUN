const { RichEmbed } = require('discord.js');


exports.run = async (client, message, args) => {

    /*
        1) Use the messageReactionAdd and messageReactionRemove events to add/remove users roles
        2) Remove the awaitReactions() function as we won't need that anymore
        3) Customize the message a bit more to fit a general welcome channel
    */

    await message.delete().catch(O_o => {});

    const a = message.guild.roles.get('542378006241607680'); // Verify

    const embed = new RichEmbed()
        .setTitle('Verify Message')
        .setDescription(`
       
        Welcome to **${message.guild.name}**! To get the bb
        ✅ ${a.toString()}
 
       
       `)
        .setColor(0xdd9323)
        .setFooter(`Guild ID: ${message.guild.id}`);

    message.channel.send(embed).then(async msg => {

        await msg.react('✅');
    });
};

exports.help = {
    name: 'welcomeroles'
};