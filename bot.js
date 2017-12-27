const Discord = require('discord.js');
const fs = require('fs');
const config = require("./config.json");
const help = require('./helptext');

let channelSettings = [];

// ES6 using destructuring
const Capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, efiles) => {
  if (err) return console.error(err);
  efiles.forEach(efile => {
    let eventFunction = require(`./events/${efile}`);
    let eventName = efile.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `bot` var.
    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
  });
});

bot.on("message", async message => {
  // So the bot doesn't reply to iteself
  if (message.author.bot) return;

  // Don't process non-prefixed messages
  if (message.content.indexOf(config.prefix) !== 0) return;

  var command = "";

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/\s+/g);
  command = args.shift().toLowerCase();
  command = command.substring(0,command.length);

  // Ensure the command exists; else respond with message
  if (validCommand.indexOf(command) < 0) {
    message.reply("The command \'" + command + "\' does not exist. Moving on...");
    return;
  }

  // Ensure certain commands are limited to the admin-stuff channel
  // So, if command is stop or restart, channel must be admin-stuff.
  //   Delete message in all others, and take no action.
  if (command === 'stop' || command === 'restart' || command === 'reload') {
    // Checks if the message is in the correct channel - in this case 'admin-stuff'
    if (message.channel.name != 'admin-stuff') {
      // Delete the message - no need to have it lingering...
      message.delete();
      // Post message to channel
      message.reply(`The command '${command}' is not available in the ***'${message.channel.name}'*** channel. Ignored.`);
      // Private message to author
      message.author.send(`The command '${command}' is not available in the ***'${message.channel.name}'*** channel. Ignored.`);
      return;
    }
  }

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require("./commands/" + command + ".js");
    commandFile.run(bot, message, args);
  } catch (err) {
    console.error(err);
  }
});

// bot.login(config.token, loginoutput); // changed from this per video!
bot.login(process.env.BOT_TOKEN, loginoutput);

function loginoutput(error, token) {
  if (error) {
    console.log(`There was an error logging in: ${error}`);
    return;
  }
  else {
    console.log(`Logged in. Token ${config.token}`);
  }
}
