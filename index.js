// dev-r2d2 bot for own purposes
// cyb3rgh05t
// StreamNet Club


const { Client, Intents, Collection } = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
//const { ReactionRole } = require("discordjs-reaction-role");
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({path: path.relative(process.cwd(), path.join(__dirname, 'config','.env'))});

// Make sure that all the three environment variables are declared.
["TOKEN", 
 "GUILD_ID", 
 "CLIENT_ID", 
 "OWNER_ID", 
 "PREFIX", 
 "RULE_ROLE_ID", 
 "HAVE_ROLE_ID", 
 "REMOVE_ROLE_ID", 
 "RULE_MESSAGE_ID", 
 "NEW_MEMBER_CHANNEL_ID", 
 "WELCOME_CHANNEL_ID", 
 "LEAVE_CHANNEL_ID", 
 "RULE_CHANNEL_ID"].forEach((env) => {
  
  if (!process.env[env]) {
    console.error(`Missing environment variable: ${env}`);
    process.exit(1);
  }
});

const botToken = process.env.TOKEN;
const appClient = process.env.CLIENT_ID;
const botPrefix = process.env.PREFIX;

console.log(`Getting Bot token....`);
console.log(`Bot Token = "${botToken}"`);
console.log(`Getting Client App ID....`);
console.log(`Client App ID = "${appClient}"`);
console.log(`Getting Bot Prefix....`);
console.log(`Bot Prefix = "${botPrefix}"`);

// Create a client with the intents and partials required.
const client  = new Client({
  partials: ["MESSAGE", "REACTION"],
  intents:
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS |
    Intents.FLAGS.GUILD_MESSAGES |
    Intents.FLAGS.GUILD_MEMBERS |
    Intents.FLAGS.GUILDS,
});

// Reading commands.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Reading events.
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Bot command prefix.
const prefix = process.env.PREFIX;

// Test bot commands with prefix.
client.on("messageCreate", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send("pong!");
  } else

  if (message.content.startsWith(`${prefix}foo`)) {
    message.channel.send("bar!");
  }
});

// Button Handler
client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        const buttonID = interaction.customId;
        if (buttonID === 'primary') { // get button by customId set below
            const member = interaction.member; // get member from the interaction - person who clicked the button

            if (member.roles.cache.has(process.env.RULE_ROLE_ID)) { // if they already have the role
                member.roles.remove(process.env.RULE_ROLE_ID); // remove it
                return interaction.reply({
                    content: 'Rolle wurde entfernt!',
                    ephemeral: true
                });
            } else { // if they don't have the role
			    const { guild } = interaction.message //store the guild of the reaction in variable
				const member = interaction.member;
                const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
			    const welcomeMessage =`Hey ${member}, willkommen in der Community 😀\nSchau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`;
                welcomeChannel.send(welcomeMessage);
			    console.log(`Welcome message for "${member.user.username}" was send to the #general channel!`);
                member.roles.add(process.env.RULE_ROLE_ID); // add it
                return interaction.reply({
                    content: 'Rolle wurde hintugefügt!',
                    ephemeral: true
                })
            }
        }
    }
});

client.on("messageCreate", async message => {
   if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(`${prefix}addreactionrole`)) {
      
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('primary')
		        .setLabel('Bestätige die Regeln mit einem Klick')
		        .setStyle('SUCCESS'),
            );
        message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_DISCORD.png.png?raw=true"], content: `**Bitte akzeptiert die Regeln für VERIFIED-MEMBER Rolle:**\n\n**\`\`\`diff\n- Regel #1:  Streng verboten\`\`\`**\n• Es ist strengstens verboten für StreamNet.Club zu **werben**.\n• Es ist strengstens verboten StreamNet einem nicht vorhandenen Mitglied zu **demonstrieren**.\n• Es ist strengstens verboten über StreamNet.Club  mit einem nicht vorhandenen Mitglied zu **diskutieren**.\n• Du darfst dein StreamNet Konto **nicht** mit anderen Personen **teilen**.\n\n**\`\`\`diff\n- Regel #2:  Sei kein Ars##\`\`\`**\n• Sei allen auf dem Server gegenüber respektvoll.\n\n**\`\`\`diff\n- Regel #3:  Verwende die entsprechenden Kanäle\`\`\`**\n• Bitte verwende den richtigen Kanal für deine Frage und bleib innerhalb des Kanals beim Thema.\n\n**\`\`\`diff\n- Regel #4:  Sei geduldig\`\`\`**\n• Nicht jeder ist jederzeit verfügbar. Jemand wird dir antworten, wenn er kann.\n==============================\n `, components: [row] })
    }
});

/*
// ReactionRoles
// Create a new manager and use it.
const configuration = [
  {
    messageId: process.env.RULE_MESSAGE_ID,
    reaction: "✅", // :white_check_mark:
    roleId: process.env.RULE_ROLE_ID,
  },
];
const manager = new ReactionRole(client, configuration);
*/


// Add role on message react.
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) { //this whole section just checks if the reaction is partial
        try {
            await reaction.fetch(); //fetches reaction because not every reaction is stored in the cache
        } catch (error) {
            console.error('Fetching message failed: ', error);
            return;
        }
    }
    if (!user.bot) {
        if (reaction.emoji.name == "✅") { //if the user reacted with the right emoji
            const ruleRole = reaction.message.guild.roles.cache.find(r => r.id === process.env.RULE_ROLE_ID); //finds role you want to assign (you could also user .name instead of .id)
            const { guild } = reaction.message //store the guild of the reaction in variable
            const member = guild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)
            member.roles.add(ruleRole);	//assign selected role to member
			console.log(`"${member.user.username}" got the MEMBER role! RULES ACCEPTED! Jippijayeahhh`);
			// sends a message to the channel
            const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
			const welcomeMessage =`Hey ${user}, willkommen in der Community 😀\n Schau dir den <#825364230827409479> Channel an und befolge die Schritte wenn du Zutritt zum Server willst!`;
            welcomeChannel.send(welcomeMessage);
			console.log(`Welcome message for "${member.user.username}" was send to the #general channel!`);
        }
    }
});

// Remove role on message re-react.
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) { //this whole section just checks if the reaction is partial
        try {
            await reaction.fetch(); //fetches reaction because not every reaction is stored in the cache
        } catch (error) {
            console.error('Fetching message failed: ', error);
            return;
        }
    }
    if (!user.bot) {
        if (reaction.emoji.name == "✅") { //if the user reacted with the right emoji
            const ruleRole = reaction.message.guild.roles.cache.find(r => r.id === process.env.RULE_ROLE_ID); //finds role you want to assign (you could also user .name instead of .id)
            const { guild } = reaction.message //store the guild of the reaction in variable
            const member = guild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)
            member.roles.remove(ruleRole);	//assign selected role to member
			console.log(`"${member.user.username}" removed the MEMBER role! Maybe by accident?!`);
        }
    }
});

// Send new member message.
client.on('guildMemberAdd', (member) => {
    const newMemberChannel = member.guild.channels.cache.get(process.env.NEW_MEMBER_CHANNEL_ID)
	console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    const newMemberMessage = `**${member.user.username}** joined the Server, we now have ${member.guild.memberCount} members!`;
    // sends a message to the channel
    newMemberChannel.send(newMemberMessage)
});


// Send leave member message.
client.on('guildMemberRemove', (member) => {
    const leaveChannel = member.guild.channels.cache.get(process.env.LEAVE_CHANNEL_ID)
	console.log(`User "${member.user.username}" has left "${member.guild.name}"` );
    const leaveMessage = `**${member.displayName}** has left the server, we now have ${member.guild.memberCount} members!`;
    // sends a message to the channel
    leaveChannel.send(leaveMessage)
});


// Remove role after new role added.
client.on("guildMemberUpdate", (oldMember, newMember) => {
    if (newMember.roles.cache.some(role => role.id === process.env.HAVE_ROLE_ID)) {
        newMember.roles.remove(process.env.REMOVE_ROLE_ID);
	    console.log(`"${newMember.user.username}" got a Plex-Invite!`);
    }
});


// Start the bot.
client.login(process.env.TOKEN).then(() => {
    client.user.setPresence({ activities: [{ name: 'StreamNet', type: 'WATCHING' }], status: 'online' });
});

// Stop the bot when the process is closed (via Ctrl-C).
const destroy = () => {
  manager.teardown();
  client.destroy();
};
process.on("SIGINT", destroy);
process.on("SIGTERM", destroy);
