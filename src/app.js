const dotenv = require('dotenv');
const chalk = require('chalk');
const {Client, IntentsBitField, Collection} = require('discord.js');

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.commands = new Collection();

require('./handlers/eventsHandler')(client);
require('./handlers/commandsHandler')(client);

process.on('exit', code => {
    console.error(chalk.red(`Process terminated. Error code: ${code}`));
});
process.on('uncaughtException', error => {
    console.error(
        chalk.red(
            `Uncaught Exception: An unexpected error occurred.\n${error.stack}`
        )
    );
});
process.on('unhandledRejection', error => {
    console.error(
        chalk.red(
            `Unhandled Exception: An unexpected error occurred.\n${error.stack}`
        )
    );
});
process.on('warning', (...args) => console.warn(chalk.yellow(args)));

client.login(process.env.DISCORD_TOKEN);
