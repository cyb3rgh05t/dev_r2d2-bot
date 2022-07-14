const client = require("../../src/index");
const { GuildMember } = require("discord.js");
const { Captcha } = require("discord.js-captcha");
const { verifiedId, verifiedChannelId, guildId, newMemberChannelId } = require("../../src/config/config.json");


module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
    execute(member) {
        const captcha = new Captcha(client, {
            guildID: guildId,
            roleID: verifiedId, //optional
            channelID: verifiedChannelId, //optional
            sendToTextChannel: false, //optional, defaults to false
            addRoleOnSuccess: true, //optional, defaults to true. whether you want the bot to add the role to the user if the captcha is solved
            kickOnFailure: true, //optional, defaults to true. whether you want the bot to kick the user if the captcha is failed
            caseSensitive: true, //optional, defaults to true. whether you want the captcha responses to be case-sensitive
            attempts: 3, //optional, defaults to 1. number of attempts before captcha is considered to be failed
            timeout: 60000, //optional, defaults to 60000. time the user has to solve the captcha on each attempt in milliseconds
            showAttemptCount: true, //optional, defaults to true. whether to show the number of attempts left in embed footer
            //customPromptEmbed: new MessageEmbed(), //customise the embed that will be sent to the user when the captcha is requested
            //customSuccessEmbed: new MessageEmbed(), //customise the embed that will be sent to the user when the captcha is solved
            //customFailureEmbed: new MessageEmbed(), //customise the embed that will be sent to the user when they fail to solve the captcha
        });

        captcha.present(member);

        if (captcha.on("success", data => {
            const { user, guild } = member   
            const newMemberChannel = member.guild.channels.cache.get(newMemberChannelId)
            console.log(`A Member has Solved a CAPTCHA!`);
            console.log(data);
	        console.log(`[INFO]`.yellow.bold,`New User "${member.user.username}" has joined "${member.guild.name}"` );
            const newMemberMessage = `**${member.user.username}** joined the Server, we now have ${member.guild.memberCount} members!`;
            // sends a message to the channel
            newMemberChannel.send(newMemberMessage)
        }));
    }
}