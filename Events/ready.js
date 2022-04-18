const ClientEvent = require('../BaseClasses/Event');

module.exports = new ClientEvent('ready', async client => {
    console.log(`Login as '${client.user.tag}' successful.`);
    client.user.setPresence({
        status: "online"
    });
    client.user.setActivity(`${process.env.PREFIX}help`, { type: 'WATCHING' });
});