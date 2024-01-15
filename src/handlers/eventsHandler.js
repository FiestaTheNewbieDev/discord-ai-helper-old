const {promisify} = require('util');
const {glob} = require('glob');
const path = require('path');
const eventsList = require('../utils/eventsList');

const pGlob = promisify(glob);

// !WARNING! Handlers work only if glob is version 7.2.0

async function loadEvents(client, dir) {
    const files = await pGlob(path.join(dir, '*.js'));

    files.forEach(eventFile => {
        const event = require(eventFile);

        if (!event.name || !eventsList.includes(event.name))
            throw new Error(`Unknown event -> ${eventFile}`);

        if (event.once)
            client.once(event.name, (...args) =>
                event.execute(client, ...args)
            );
        else client.on(event.name, (...args) => event.execute(client, ...args));

        console.log(`Event loaded: ${event.name}`);
    });

    const subdirs = await pGlob(path.join(dir, '*/'));

    subdirs.forEach(async subdir => {
        await loadEvents(client, subdir);
    });
}

module.exports = async client => {
    await loadEvents(client, path.join(process.cwd(), 'src/events'));
};
