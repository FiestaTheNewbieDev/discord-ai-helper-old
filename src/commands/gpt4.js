const gpt4Controller = require('../controllers/gpt4Controller');

module.exports = {
    name: 'gpt-4',
    description: 'Send raw prompt to GPT-4',
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
        message.channel.send(await gpt4Controller.runPromptWithArgs(args));
    },
    runSlash: async (client, interaction) => {
        await interaction.deferReply({ephemeral: false}); 
        const args = interaction.options.getString('prompt');
        try {
            await interaction.editReply(await gpt4Controller.runPrompt(args));
        } catch(error) {
            await interaction.followUp('An error occurred while processing your request.');
        }
    }
};