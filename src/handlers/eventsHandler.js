const {promisify} = require('util');
const {glob} = require('glob');
const pGlob = promisify(glob);
const path = require('path');

// !WARNING! Handlers work only if glob is version 7.2.0

async function loadEvents(client, dir) {
    const files = await pGlob(path.join(dir, '*.js'));

    for (const eventFile of files) {
        const event = require(eventFile);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        console.log(`Event loaded: ${event.name}`)
    }

    const subdirs = await pGlob(path.join(dir, '*/'));

    for (const subdir of subdirs) {
        await loadEvents(client, subdir);
    }
}

module.exports = async (client) => {
    await loadEvents(client, path.join(process.cwd(), 'src/events'));
};