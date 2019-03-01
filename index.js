const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err,files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.lenght <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f,i) => {
    let props = require(`./commands/${f}`);
    console.log (`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })

})

bot.on("ready",async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`)
  bot.user.setActivity("Pokecord", {type: "WATCHING"});
})

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let pokeRole = message.guild.roles.find(role => role.name === `Pokecord`)

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot,message,args);

  if (message.channel.id === `550873514110877732`) {
    if (!message.member.roles.has(pokeRole)) {
      return message.delete();
    }
  }

})

bot.login(process.env.BOT_TOKEN);
