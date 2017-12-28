const Discord = require('discord.js');

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log("I am ready!");
});

bot.on("message", async message => {
  // So the bot doesn't reply to iteself
  if (message.content === "ping")
    message.reply("pong");
});

bot.login(process.env.BOT_TOKEN);
