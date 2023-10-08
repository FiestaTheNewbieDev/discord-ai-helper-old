module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`\n${client.user.username} ready\n`);
    }
};