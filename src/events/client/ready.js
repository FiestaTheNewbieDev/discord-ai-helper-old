const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(
            '\x1b[32m',
            `\n${client.user.username} ready\n`,
            '\x1b[37m'
        );

        const devGuild = await client.guilds.cache.get(
            process.env.DEV_GUILD_ID
        );
        devGuild.commands.set(client.commands.map(command => command));
    }
};
