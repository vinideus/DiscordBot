const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!role @andrew role
  if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can't do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Couldn't find that user!");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply ("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (!rMember.roles.has(gRole.id)) return message.reply("They don't have that role");
  await(rMember.removeRole(gRole.id));

  try {
    await rMember.send(`RIP, you lost the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`RIP to <@${rMember.id}>,we removed the role ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
}

module.exports.help = {
  name: "removerole"
}
