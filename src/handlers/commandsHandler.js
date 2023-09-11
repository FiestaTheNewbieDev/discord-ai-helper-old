const {promisify} = require('util');
const {glob} = require('glob');
const pGlob = promisify(glob);
const path = require('path');

async function loadCommands(client, dir) {
    const files = await pGlob(path.join(dir, '*.js'));
    
    for (const commandFile of files) {
        const command = require(commandFile);
        client.commands.set(command.name, command);
        console.log(`Command loaded: ${command.name}`)
    }

    const subdirectories = await pGlob(path.join(dir, '*/'));
    
    for (const subdir of subdirectories) {
        await loadCommands(client, subdir);
    }
}

module.exports = async (client) => {
    await loadCommands(client, path.join(process.cwd(), 'src/commands'));
}