exports.run = (bot) => {
  console.log(`Reconnected at ${new Date()}.\nLogged In.\nReady to Serve:\n User:     ${bot.user.tag}\n ID:       ${bot.user.id}`);
  console.log(` Channels: ${bot.channels.size}\n Servers:  ${bot.guilds.size}\n Users:    ${bot.users.size}`);
}
