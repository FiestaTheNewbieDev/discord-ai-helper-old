const gpt4Controller = require('./gpt4Controller');

module.exports = {
    async execute(client, message, prompt) {
        const userPrompt = prompt;

        message.channel.send(await gpt4Controller.runPrompt(`${message.author.username} send you this message: ${userPrompt}, respond to it following these instructions:\n- you are ${client.user.username}\n- you are an interractive discord bot based on GPT-4 and DALL-E\n- ALWAYS speak with user's request language\n- ALWAYS replace user name with ${message.author}`));
    }
}   