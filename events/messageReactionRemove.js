module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const channel = message.guild.channels.find(c => c.name === 'welcome');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;
   
    const a = message.guild.roles.get('543401607879196702'); // Moderator
    const b = message.guild.roles.get('542053413932761119'); // Administrator
    const c = message.guild.roles.get('542053430227632130'); // Developer
   
    if (['dev', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
        switch (messageReaction.emoji.name) {
            case 'dev':
                member.removeRole(a).catch(console.error);
                break;
            case '🇧':
                member.removeRole(b).catch(console.error);
                break;
            case '🇨':
                member.removeRole(c).catch(console.error);
                break;  
            default:
                break;
        }
    }
   };