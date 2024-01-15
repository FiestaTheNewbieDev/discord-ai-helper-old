module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interraction) {
        if (interraction.isCommand()) {
            const command = client.commands.get(interraction.command.name);
            if (!command) return interraction.reply('Unknow command');
            command.runSlash(client, interraction);
        }
    }
};
