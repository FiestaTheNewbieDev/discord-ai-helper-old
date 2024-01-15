const {promisify} = require('util');
const {glob} = require('glob');
const path = require('path');

const pGlob = promisify(glob);

// !WARNING! Handlers work only if glob is version 7.2.0

async function loadCommands(client, dir) {
    const files = await pGlob(path.join(dir, '*.js'));

    files.forEach(commandFile => {
        const command = require(commandFile);

        if (!command.name) throw new Error(`No command name in ${commandFile}`);
        if (!command.description)
            throw new Error(`No command description in ${commandFile}`);

        client.commands.set(command.name, command);

        console.log(`Command loaded: ${command.name}`);
    });

    const subdirs = await pGlob(path.join(dir, '*/'));

    subdirs.forEach(async subdir => {
        await loadCommands(client, subdir);
    });
}

module.exports = async client => {
    await loadCommands(client, path.join(process.cwd(), 'src/commands'));
};
