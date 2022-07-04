const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../../src/config/.env`)});

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {MessageCreate} message
     */
     async execute(message) {
        const prefix = process.env.PREFIX;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
         
         if (message.content.startsWith(`${prefix}donatemessage`)) {
            message.channel.send({ content: `🚨 **HELP2STAYONLINE** 🚨\n\n**StreamNet** is mein **Hobby**, doch habe ich und werde noch viel **Arbeit** reinstecken, deshalb bitte ich euch User mir manschmal zu helfen in dem ihr spendet damit die **Server** und **Premium Accounts** der Indexer bezahlt werden koennen, um euch das **beste Erlebnis** zu präsentieren <:streamnet:855771751820296232>\n\n➡️  Die Server Wartungen und Accounts kommen auf ungefähr 120-130 € im Monat, diese möchte ich gerne so gut wie möglich durch Spenden abgedeckt haben.\n\n➡️  Um eine Spende zu betätigen bitte ich euch über folgende Optionen zu spenden:\n\n**Skrill** : \`adresse per DM anfrage\`\n\n**PaySafeCard** : \`Deutschland oder Luxemburg\`\n\n**BitCoin** : \`adresse per DM anfrage\`\n\n➡️  nach Betätigung der Spende bitte **<@408885990971670531>** anschreiben und posten.\n\n➡️  Ist es die erste Spende für die Server Einladung <#825352124547989544> wird euch die **StreamNet..er** Rolle vergeben.\n\n➡️  Nach einer weiteren Spende werde ich euch eine **Supporter** Rolle vergeben. *(kann bis zu 24h dauern)*\n\nDurch diese Rolle sehe ich dass euch StreamNet gefällt und richtig bei Gelegenheit unterstützt.\n\n**Ich bedanke mich herzlich für den Support.** <:streamnet:855771751820296232>`});
          } 
          else if (message.content.startsWith(`${prefix}invitemessage`)) {
            message.channel.send({ content: `**SPENDEN** sind das A und O damit dieses **Projekt** am Leben bleibt.\n\nDeshalb frage ich für jede **Server Einladung** eine kleinde **Spende** um die Server und alles was ansteht zu bezahlen...\n\n➡️  Betätige eine **Spende** indem du den Anweisungen in <#912755161078849598> folgst.\n\n➡️  Nach einer **Spende** wird der  <@825635238188285952>  dir per** PM **schreiben. Folge den **ANWEISUNGEN** des **BOTS**.***(dies kann bis zu 24h dauern)***\n\n➡️  **NACHDEM** du hinzugefügt worden bist, kanst du die **EINLADUNG** in deiner **MAILBOX** *(Mailbox der Email welsche du dem Bot angegeben hast)* akzeptieren.\n***(sollte der Link in der email nicht klappen, dann kanst du die Einladung auch manuel akzeptieren. Mehr dazu im  <#864928903000227850>***)`});
          } 
          else if (message.content.startsWith(`${prefix}welcomemessage`)) {
            message.channel.send({ content: `=======================================\n\n**Willkommen bei <:streamnet:855771751820296232> StreamNet's Discord Server - EIn täglich upgedateter Deutsch/Englisch Plex Media Server.**\n\n=======================================\n\n➡️  Wie bekomme ich Zutritt zum **StreamNet** Server ?\n\n**1. **Bestätige die** REGELN **in <#694495838013095967> !\n\n**2. **Befolge die Anweisungen für eine **EINLADUNG** in <#825352124547989544> !\n\n**3. **Folge den Anweisungen vom **<@825635238188285952>** !\n\n**4. **Akzeptiere die **PLEX-EINLADUNG** für StreamNet in deiner **PLEX EMAIL BOX**! (für manuelle Aktivierung <#864928903000227850> )\n\nViel Spass beim streamen.. <:streamnet:855771751820296232>`});
           }
     }
}