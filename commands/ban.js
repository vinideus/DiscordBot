const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Impossible.");
  if (bUser.hasPermission("MANAGE_ROLES")) return message.channel.send("That person can't be banned!")


  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#bc0000")
  .addField("Banned user", `${bUser} with ID ${bUser.id}`)
  .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason",bReason);

  let incidentChannel = message.guild.channels.find(`name`,"log");
  if (!incidentChannel) return message.channel.send("Can't find log channel.");

  message.guild.member(bUser).ban(bReason);
  incidentChannel.send(banEmbed);

}

module.exports.help = {
  name: "ban"
}
