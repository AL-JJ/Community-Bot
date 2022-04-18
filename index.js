require("dotenv").config();

// MongoDB
const mongoose = require('./Database/mongoose');

// Discord API
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS ] });
const { EventValidator, GetEvents } = require('./handlers');

client.once("ready", client => {
    const { event, valid } = EventValidator("ready", GetEvents());
    if (valid) event.Callback(client);
});

client.on("messageCreate", message => {
    const { event, valid } = EventValidator("messageCreate", GetEvents());
    if (valid) event.Callback(message);
});

client.on("guildMemberAdd", member => {
    const { event, valid } = EventValidator("guildMemberAdd", GetEvents());
    if (valid) event.Callback(member);
})

mongoose.init();
client.login(process.env.TOKEN);