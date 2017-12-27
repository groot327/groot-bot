exports.run = async (bot, message, args) => {
	message.channel.purge(-1, msg => {
		return !msg.pinned
	});
};
