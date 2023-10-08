const dallEController = require('../controllers/dallEController');

module.exports = {
    name: 'dall-e',
    run: async (client, message, args) => {
        try {
            message.channel.send(await dallEController.runPromptWithArgs(args));
        } catch(error) {
            console.error(error);
        }
    }
};