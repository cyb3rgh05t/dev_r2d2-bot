module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Starting Bot ....`);
		console.log(`Ready! Bot is online!`);
		console.log(`Logged in as "${client.user.tag}"`);
	},
};
