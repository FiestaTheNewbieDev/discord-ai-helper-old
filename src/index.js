const dotenv = require('dotenv');
const {Client, IntentsBitField, Collection} = require('discord.js');

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.commands = new Collection();

require('./handlers/eventsHandler')(client);
require('./handlers/commandsHandler')(client);

client.login(process.env.DISCORD_TOKEN);