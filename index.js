// dev-r2d2 bot for own purposes
// cyb3rgh05t
// StreamNet Club


const { Client, Intents, Collection } = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
require('dotenv').config({path: path.relative(process.cwd(), path.join(__dirname, 'config','.env'))});
const config = require('dotenv').config({path: path.relative(process.cwd(), path.join(__dirname, 'config','.env'))});
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

/*
// Reading slashcommands.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands/slashcommands');
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
*/

client.config = config;
client.commands = new Collection();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}

// Bot command prefix.
const prefix = process.env.PREFIX;

client.on("messageCreate", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix}donatemessage`)) {
    message.channel.send({ content: `🚨 **HELP2STAYONLINE** 🚨\n
**StreamNet** is mein **Hobby**, doch habe ich und werde noch viel **Arbeit** reinstecken, deshalb bitte ich euch User mir manschmal zu helfen in dem ihr spendet damit die **Server** und **Premium Accounts** der Indexer bezahlt werden koennen, um euch das **beste Erlebnis** zu präsentieren <:streamnet:855771751820296232>\n
➡️  Die Server Wartungen und Accounts kommen auf ungefähr 120-130 € im Monat, diese möchte ich gerne so gut wie möglich durch Spenden abgedeckt haben.\n
➡️  Um eine Spende zu betätigen bitte ich euch über folgende Optionen zu spenden:\n
**Skrill** : \`adresse per DM anfrage\`\n
**PaySafeCard** : \`Deutschland oder Luxemburg\`\n
**BitCoin** : \`adresse per DM anfrage\`\n
➡️  nach Betätigung der Spende bitte **<@408885990971670531>** anschreiben und posten.\n
➡️  Ist es die erste Spende für die Server Einladung <#825352124547989544> wird euch die **StreamNet..er** Rolle vergeben.\n
➡️  Nach einer weiteren Spende werde ich euch eine **Supporter** Rolle vergeben. *(kann bis zu 24h dauern)*\n
Durch diese Rolle sehe ich dass euch StreamNet gefällt und richtig bei Gelegenheit unterstützt.\n
**Ich bedanke mich herzlich für den Support.** <:streamnet:855771751820296232>`});
  } 
  else if (message.content.startsWith(`${prefix}invitemessage`)) {
    message.channel.send({ content: `**SPENDEN** sind das A und O damit dieses **Projekt** am Leben bleibt.\n
Deshalb frage ich für jede **Server Einladung** eine kleinde **Spende** um die Server und alles was ansteht zu bezahlen...\n
➡️  Betätige eine **Spende** indem du den Anweisungen in <#912755161078849598> folgst.\n
➡️  Nach einer **Spende** wird der  <@825635238188285952>  dir per** PM **schreiben. Folge den **ANWEISUNGEN** des **BOTS**.***(dies kann bis zu 24h dauern)***\n
➡️  **NACHDEM** du hinzugefügt worden bist, kanst du die **EINLADUNG** in deiner **MAILBOX** *(Mailbox der Email welsche du dem Bot angegeben hast)* akzeptieren.\n***(sollte der Link in der email nicht klappen, dann kanst du die Einladung auch manuel akzeptieren. Mehr dazu im  <#864928903000227850>***)`});
  } 
  else if (message.content.startsWith(`${prefix}welcomemessage`)) {
	message.channel.send({ content: `=======================================\n
**Willkommen bei <:streamnet:855771751820296232> StreamNet's Discord Server - EIn täglich upgedateter Deutsch/Englisch Plex Media Server.**\n
=======================================\n
➡️  Wie bekomme ich Zutritt zum **StreamNet** Server ?\n
**1. **Bestätige die** REGELN **in <#694495838013095967> !\n 
**2. **Befolge die Anweisungen für eine **EINLADUNG** in <#825352124547989544> !\n
**3. **Folge den Anweisungen vom **<@825635238188285952>** !\n
**4. **Akzeptiere die **PLEX-EINLADUNG** für StreamNet in deiner **PLEX EMAIL BOX**! (für manuelle Aktivierung <#864928903000227850> )\n
Viel Spass beim streamen.. <:streamnet:855771751820296232>`});
   }
});

client.on("messageCreate", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(`${prefix}logoimage`)) {
    message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_DISCORD.png.png?raw=true"]});
  }
  else if (message.content.startsWith(`${prefix}donateimage`)) {
    message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_Donate.png?raw=true"]});
  }
  else if (message.content.startsWith(`${prefix}rulesimage`)) {
    message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_RULES.png.png?raw=true"]});
  }
  else if (message.content.startsWith(`${prefix}invitesimage`)) {
    message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_INVITES.png?raw=true"]});
  }
  else if (message.content.startsWith(`${prefix}dashimage`)) {
    message.channel.send({ files: ["https://github.com/cyb3rgh05t/images/blob/master/StreamNet/Different%20App%20Logos/SNC_Dashboard.png?raw=true"]});
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
        message.channel.send({ content: `**Bitte akzeptiert die Regeln für die MEMBER Rolle:**\n\n**\`\`\`diff\n- Regel #1:  Streng verboten\`\`\`**\n• Es ist strengstens verboten für StreamNet.Club zu **werben**.\n• Es ist strengstens verboten StreamNet einem nicht vorhandenen Mitglied zu **demonstrieren**.\n• Es ist strengstens verboten über StreamNet.Club  mit einem nicht vorhandenen Mitglied zu **diskutieren**.\n• Du darfst dein StreamNet Konto **nicht** mit anderen Personen **teilen**.\n\n**\`\`\`diff\n- Regel #2:  Sei kein Ars##\`\`\`**\n• Sei allen auf dem Server gegenüber respektvoll.\n\n**\`\`\`diff\n- Regel #3:  Verwende die entsprechenden Kanäle\`\`\`**\n• Bitte verwende den richtigen Kanal für deine Frage und bleib innerhalb des Kanals beim Thema.\n\n**\`\`\`diff\n- Regel #4:  Sei geduldig\`\`\`**\n• Nicht jeder ist jederzeit verfügbar. Jemand wird dir antworten, wenn er kann.\n==============================\n `, components: [row] })
    }
});


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
