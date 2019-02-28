module.exports.run = async (bot, message, args) => {
 let msg = await message.channel.send("Generating icon....")

 if(!message.guild.iconURL) return msg.edit("No icon found, you sure he is there? :face_palm:")

 await message.channel.send({files: [
  {
   attachment: message.guild.iconURL,
   name: "servericon.png"
  }
  ]})


 msg.delete();
}

module.exports.help = {
 name: "icon"
}