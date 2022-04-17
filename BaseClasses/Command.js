module.exports = class Command {
    /**
     * Creates a new command to be used with the Command Handler.
     *
     * @param {string} name The command's name.
     * @param {[string]} aliases Other names for the command.
     * @param {number} cooldown The cooldown to use this command.
     * @param {string} description Describes what the command does.
     * @param {function} callback The callback the command performs.
     *
     * */
    constructor(name, aliases, cooldown, description, callback) {
        this.name = name;
        this.aliases = aliases;
        this.cooldown = cooldown;
        this.description = description;
        this.Callback = callback;
    }
}