require("dotenv").config();

const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ] });

const { EventValidator, GetEvents } = require('./handlers');

client.once("ready", () => {
    console.log(`Login as '${client.user.tag}' successful.`);
    client.user.setPresence({
        status: "online"
    });
    client.user.setActivity(`${process.env.PREFIX}help`, { type: 'WATCHING' });
});

client.on("messageCreate", message => {
    const { event, valid } = EventValidator("messageCreate", GetEvents());
    if (valid) event.Callback(message);
});

client.on("guildCreate", async guild => {
    let { event, valid } = EventValidator("guildCreate", GetEvents());
    if (valid) event.Callback(guild);
})

client.login(process.env.TOKEN);