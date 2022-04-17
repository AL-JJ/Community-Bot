module.exports = class Event {
    /**
     *
     * Creates a new event to be used with the Command Handler.
     *
     * @param {string} name The name of the event.
     * @param {function} callback The callback the event will use.
     * */
    constructor(name, callback) {
        this.name = name;
        this.Callback = callback;
    }
}