module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Bot is online! Logged in as ${client.user.tag}`);
	},
};
