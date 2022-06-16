module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Starting Bot ....`);
		console.log(`Ready! Bot is online!`);
		console.log(`Logged in as "${client.user.tag}"`);
	},
};
client.login(process.env.TOKEN).then(() => {
    client.user.setPresence({ activities: [{ name: 'StreamNet', type: 'WATCHING' }], status: 'online' });
});
