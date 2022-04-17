module.exports = {
    SplitMessage(messageContent) {
        const splitMessage = messageContent.slice(2).split(/ +/);
        const commandName = splitMessage[0];
        const args = splitMessage.slice(1, splitMessage.length);

        return { commandName, args };
    },
}