const dallEController = require('../controllers/dallEController');

module.exports = {
    name: 'dall-e',
    description: 'Generate an image with Dall-E',
    options: [
        {
            name: 'prompt',
            description: 'Your prompt',
            required: true,
            type: 3
        }
    ],
    run: async (client, message, args) => {
        message.channel.sendTyping();
        message.channel.send(await dallEController.runPromptWithArgs(args));
    },
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ephemeral: false}); 
        const args = interaction.options.getString('prompt');
        try {
            await interaction.editReply(await dallEController.runPrompt(args));
        } catch(error) {
            await interaction.followUp('An error occurred while processing your request.');
        }
    }
};