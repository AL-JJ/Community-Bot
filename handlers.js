const fs = require('fs');
module.exports = {

    GetEvents(){
        const events = [];
        fs.readdirSync('./Events').filter(file => file.endsWith('js')).forEach(file => {
            events.push(file.slice(0, -3));
        });

        return events;
    },

    EventValidator(eventName, events) {
        let valid = false;
        let event = {};

        events.forEach(element => {
           if (element !== eventName) return;
           event = require(`./Events/${eventName}`);
           valid = true;
        });

        return { event, valid };
    },

    GetCommands(){
        const commands = [];
        fs.readdirSync('./Commands').filter(file => file.endsWith('js')).forEach(file => {
            commands.push(file.slice(0, -3));
        });

        return commands;
    },

    CommandValidator(commandName, commands) {
        let valid = false;
        let command = {};

        commands.forEach(element => {
            if (element !== commandName) return;
            command = require(`./Commands/${commandName}`);
            valid = true;
        });

        return { command, valid };
    }
}